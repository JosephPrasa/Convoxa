const mongoose = require("mongoose");

const statusSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        type: {
            type: "String",
            enum: ["text", "image"],
            default: "text",
        },
        content: {
            type: "String", // URL for image or text content
            required: true,
        },
        caption: {
            type: "String",
            default: "",
        },
        views: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }],
        expiresAt: {
            type: Date,
            default: () => new Date(+new Date() + 24 * 60 * 60 * 1000), // 24 hours from now
            index: { expires: '24h' } // MongoDB TTL index to auto-delete
        }
    },
    { timestamps: true }
);

const Status = mongoose.model("Status", statusSchema);

module.exports = Status;
