const asyncHandler = require("express-async-handler");
const { User } = require("../models/User");
const {Comment ,validateCreateComment, validateUpdateComment } = require("../models/Comment");

module.exports.createComment = asyncHandler(async (req, res) => {

    const { error } = validateCreateComment(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const profile = await User.findById(req.user.id)
    const commenterName = profile?.firstname.charAt(0).toUpperCase() + profile?.firstname.slice(1)+" "+ profile?.lastname
     const comment = new Comment({
      blogId: req.body.blogId,
      text: req.body.text,
      user: req.user.id,
      commenterName : commenterName,
      commenteProfilePhoto: profile.profilePhoto.url
    });
    await comment.save()

    res.status(201).json(comment);
});

module.exports.getAllComments = asyncHandler(async (req, res) => {
  const {  search } = req.query;
  let query = {};
  if (search) {
    query = {
      $or: [
        { text: { $regex: new RegExp(search, 'i') } },
        { commenterName: { $regex: new RegExp(search, 'i') } },
      ],
    };
  }
  let comments
       if(search){
        comments = await Comment.find(query)
         .sort({ createdAt: -1 })
         .populate("user", ["-password"]);
       } else {
        comments = await Comment.find()
         .sort({ createdAt: -1 })
         .populate("user", ["-password"]);
       }
 
     res.status(200).json(comments);
});

module.exports.deleteComment = asyncHandler(async (req, res) => {

    const comment = await Comment.findById(req.params.id);
    if (!comment)  return res.status(404).json({ message: "Comment not found" });

    if (req.user.isAdmin || req.user.id === comment.user.toString()) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Your comment has been deleted !" });
    } else  res.status(403).json({ message: "Acces denied !" });
    
  });

  module.exports.updateComment = asyncHandler(async (req, res) => {

    const { error } = validateUpdateComment(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found !" });

    if (req.user.id !== comment.user.toString()) res.status(403).json({ message: "Acces denied, not allowed !" });
    
    const updateComment = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          text: req.body.text,
        },
      },
      { new: true }
    )
    res.status(200).json(updateComment);
  });

  module.exports.getCommentsCount = asyncHandler(async (req, res) => {
    const count = await Comment.countDocuments();
    res.status(200).json(count);
  });