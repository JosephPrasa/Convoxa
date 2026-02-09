const express = require("express");
const {
    registerUser,
    authUser,
    allUsers,
    googleAuth,
    followUser,
    handleFollowRequest,
    togglePrivacy,
    unfollowUser,
    updateProfile,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);
router.post("/google", googleAuth);

router.route("/profile").put(protect, updateProfile);
router.route("/follow/:id").put(protect, followUser);
router.route("/unfollow/:id").put(protect, unfollowUser);
router.route("/request/:id/handle").put(protect, handleFollowRequest);
router.route("/privacy").put(protect, togglePrivacy);

module.exports = router;
