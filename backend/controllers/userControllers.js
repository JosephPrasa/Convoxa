const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ],
        }
        : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
});

//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic, username, bio, interests } = req.body;

    if (!name || !email || !password || !username) {
        res.status(400);
        throw new Error("Please Enter all the Feilds");
    }

    const userExists = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (userExists) {
        res.status(400);
        throw new Error("User with this email or username already exists");
    }

    const user = await User.create({
        name,
        username,
        email,
        password,
        pic,
        bio,
        interests,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            bio: user.bio,
            interests: user.interests,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("User not found");
    }
});

//@description     Auth the user
//@route           POST /api/user/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(`--- Login attempt: ${email} (Code version: AdminBypass_v2) ---`);

    const user = await User.findOne({ email });

    // Custom check for admin quick login (always allow for test credentials)
    if (email?.trim() === "1@1.com" && password?.trim() === "1") {
        return res.json({
            _id: user?._id || "admin_quick_id",
            name: user?.name || "Admin User",
            email: "1@1.com",
            isAdmin: true,
            pic: user?.pic || "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
            token: generateToken(user?._id || "admin_quick_id"),
        });
    }

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
});

//@description     Google login/register
//@route           POST /api/user/google
//@access          Public
const googleAuth = asyncHandler(async (req, res) => {
    const { credential } = req.body;

    const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { name, email, picture } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (user) {
        // Update profile picture if it's changed or is the default
        if (picture && user.pic !== picture) {
            user.pic = picture;
            await user.save();
        }
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        // String password for google users as userModel needs password
        const password = email + process.env.JWT_SECRET;
        const generatedUsername = email.split("@")[0] + Math.floor(Math.random() * 1000);
        user = await User.create({
            name,
            username: generatedUsername,
            email,
            password,
            pic: picture,
            isGoogleUser: true,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
                pic: user.pic,
                token: generateToken(user._id),
            });
        } else {
            res.status(400);
            throw new Error("User not found");
        }
    }
});

//@description     Follow a user or send request
//@route           PUT /api/user/follow/:id
//@access          Protected
const followUser = asyncHandler(async (req, res) => {
    const targetUserId = req.params.id;
    const currentUserId = req.user._id;

    if (targetUserId === currentUserId.toString()) {
        res.status(400);
        throw new Error("You cannot follow yourself");
    }

    const targetUser = await User.findById(targetUserId);
    const currentUser = await User.findById(currentUserId);

    if (!targetUser) {
        res.status(404);
        throw new Error("User not found");
    }

    // Check if already following
    if (currentUser.following.includes(targetUserId)) {
        res.status(400);
        throw new Error("Already following this user");
    }

    if (targetUser.isPublic) {
        // Direct follow
        await User.findByIdAndUpdate(targetUserId, { $push: { followers: currentUserId } });
        await User.findByIdAndUpdate(currentUserId, { $push: { following: targetUserId } });
        res.status(200).json({ message: "Followed successfully", status: "following" });
    } else {
        // Send request
        if (targetUser.followRequests.includes(currentUserId)) {
            res.status(400);
            throw new Error("Follow request already sent");
        }
        await User.findByIdAndUpdate(targetUserId, { $push: { followRequests: currentUserId } });
        res.status(200).json({ message: "Request sent successfully", status: "requested" });
    }
});

//@description     Handle follow request (accept/decline)
//@route           PUT /api/user/request/:id/handle
//@access          Protected
const handleFollowRequest = asyncHandler(async (req, res) => {
    const requesterId = req.params.id;
    const { action } = req.body; // 'accept' or 'decline'
    const userId = req.user._id;

    if (action === "accept") {
        await User.findByIdAndUpdate(userId, {
            $pull: { followRequests: requesterId },
            $push: { followers: requesterId }
        });
        await User.findByIdAndUpdate(requesterId, {
            $push: { following: userId }
        });
        res.status(200).json({ message: "Request accepted" });
    } else {
        await User.findByIdAndUpdate(userId, {
            $pull: { followRequests: requesterId }
        });
        res.status(200).json({ message: "Request declined" });
    }
});

//@description     Toggle account privacy
//@route           PUT /api/user/privacy
//@access          Protected
const togglePrivacy = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    user.isPublic = !user.isPublic;
    await user.save();
    res.status(200).json({ isPublic: user.isPublic });
});

//@description     Unfollow a user
//@route           PUT /api/user/unfollow/:id
//@access          Protected
const unfollowUser = asyncHandler(async (req, res) => {
    const targetUserId = req.params.id;
    const currentUserId = req.user._id;

    await User.findByIdAndUpdate(targetUserId, { $pull: { followers: currentUserId } });
    await User.findByIdAndUpdate(currentUserId, { $pull: { following: targetUserId } });

    res.status(200).json({ message: "Unfollowed successfully" });
});

//@description     Update user profile
//@route           PUT /api/user/profile
//@access          Protected
const updateProfile = asyncHandler(async (req, res) => {
    const { name, bio, status, pic, interests, openDMs } = req.body;
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = name || user.name;
        user.bio = bio || user.bio;
        user.status = status || user.status;
        user.pic = pic || user.pic;
        user.interests = interests || user.interests;
        if (openDMs !== undefined) user.openDMs = openDMs;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            pic: updatedUser.pic,
            bio: updatedUser.bio,
            status: updatedUser.status,
            interests: updatedUser.interests,
            openDMs: updatedUser.openDMs,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

module.exports = { allUsers, registerUser, authUser, googleAuth, followUser, handleFollowRequest, togglePrivacy, unfollowUser, updateProfile };
