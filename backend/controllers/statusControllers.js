const asyncHandler = require("express-async-handler");
const Status = require("../models/statusModel");

//@description     Create new status
//@route           POST /api/status
//@access          Protected
const createStatus = asyncHandler(async (req, res) => {
    const { type, content, caption } = req.body;

    if (!content) {
        res.status(400);
        throw new Error("Please provide status content");
    }

    const status = await Status.create({
        user: req.user._id,
        type,
        content,
        caption,
    });

    const fullStatus = await Status.findById(status._id).populate("user", "-password");

    res.status(201).json(fullStatus);
});

//@description     Fetch all relevant statuses (following + own)
//@route           GET /api/status
//@access          Protected
const getStatuses = asyncHandler(async (req, res) => {
    // Get statuses of following users and own
    const userIds = [...req.user.following, req.user._id];

    const statuses = await Status.find({ user: { $in: userIds } })
        .populate("user", "name pic email")
        .sort({ createdAt: -1 });

    res.status(200).json(statuses);
});

//@description     Mark status as viewed
//@route           PUT /api/status/:id/view
//@access          Protected
const viewStatus = asyncHandler(async (req, res) => {
    const status = await Status.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { views: req.user._id } },
        { new: true }
    );

    if (!status) {
        res.status(404);
        throw new Error("Status not found");
    }

    res.status(200).json(status);
});

module.exports = { createStatus, getStatuses, viewStatus };
