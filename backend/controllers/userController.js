const asyncHandler = require("express-async-handler");
const { User, validateUpdateUser } = require("../models/User");
const { Comment } = require("../models/Comment");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");
const { cloudinaryRemoveImage, cloudinaryUploadImage, cloudinaryRemoveAllImage } = require("../utils/cloudinary");
const { Blog } = require("../models/Blog");

module.exports.getAllUsers = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin)
    return res.status(403).json({ message: "Not allow only for admin !" });
    const {  search } = req.query;
    let query = {};
    if (search) {
      // Use a regular expression to perform a case-insensitive search on title or description
      query = {
        $or: [
          { lastname: { $regex: new RegExp(search, 'i') } },
          { firstname: { $regex: new RegExp(search, 'i') } },
        ],
      };
    }
    let users
    if(search) {
      users = await User.find(query).select("-password").populate("blogs");
    } else {
      users = await User.find().select("-password").populate("blogs");
    }
   

  res.status(200).json(users);
});

module.exports.getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select("-password")
    .populate("blogs");
  if (!user) return res.status(404).json({ message: "User not found !" });

  res.status(200).json(user);
});

module.exports.getUsersCount = asyncHandler(async (req, res) => {
  const count = await User.countDocuments();
  res.status(200).json(count);
});

module.exports.updateUserProfile = asyncHandler(async (req, res) => {
  const { error } = validateUpdateUser(req.body);
  if (error) return res.status(400).json({ message: error.message });

  if (req.body.password) {
    const salt = await bcrypt.genSalt();
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  const updateUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
      },
    },
    { new: true }
  ).populate("blogs");

  res.status(200).json(updateUser);
});

module.exports.profilePhotoUpload = asyncHandler(async (req, res) => {

  if (!req.file) res.status(400).json({ message: "No file provided" });

  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  const result = await cloudinaryUploadImage(imagePath);

  const user = await User.findById(req.user.id)
  if(user.profilePhoto.publicId) await cloudinaryRemoveImage(user.profilePhoto.publicId)

  user.profilePhoto = {
    url: result.secure_url,
    publicID: result.public_id,
  }
  await user.save()

  res.status(200).json({
    message: "Your profile photo uploaded successfully",
    profilePhoto: {
      url: result.secure_url,
      publicID: result.public_id,
    },
  })

  fs.unlinkSync(imagePath);

});

module.exports.deleteUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ message: "User not found !" });

    const blogs = await Blog.find({user : user._id})
    const publicIds = blogs?.map((blog ) => blog.image.publicId)
    if(publicIds?.length > 0) await cloudinaryRemoveAllImage(publicIds)

    if(user.profilePhoto.publicId !== null) await cloudinaryRemoveImage(user.profilePhoto.publicId)

    await Blog.deleteMany({user : user._id})
    await Comment.deleteMany({ user : user.id})
    
    await User.findByIdAndDelete(req.params.id)

    res.status(200).json({ message : "Account has been deleted !"})

})
