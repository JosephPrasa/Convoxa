const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
    {
        name: { type: "String", required: true },
        username: { type: "String", unique: true, required: true },
        email: { type: "String", unique: true, required: true },
        password: { type: "String", required: true },
        pic: {
            type: "String",
            default:
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        isGoogleUser: {
            type: Boolean,
            default: false,
        },
        isPublic: {
            type: Boolean,
            default: true,
        },
        followers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        following: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        followRequests: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        onlineStatus: {
            type: Boolean,
            default: false,
        },
        bio: {
            type: "String",
            default: "Hey there! I'm using Convoxa.",
        },
        status: {
            type: "String",
            enum: ["Online", "Away", "Busy"],
            default: "Online",
        },
        interests: [{
            type: "String",
        }],
        openDMs: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
    if (!this.isModified) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
