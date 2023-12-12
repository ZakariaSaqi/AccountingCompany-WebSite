const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");
const {
  validateCreateBlog,
  Blog,
  validateUpdateBlog,
} = require("../models/Blog");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
} = require("../utils/cloudinary");
const { Comment } = require("../models/Comment");

module.exports.createBlog = asyncHandler(async (req, res) => {
  if (!req.file)
    return res.status(400).json({ message: "Aucune image fournie" });

  const { error } = validateCreateBlog(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  const result = await cloudinaryUploadImage(imagePath);

  const blog = new Blog({
    title: req.body.title,
    description: req.body.description,
    user: req.user.id,
    image: {
      url: result.secure_url,
      publicId: result.public_id,
    },
  });
  await blog.save();

  res.status(200).json(blog);
  fs.unlinkSync(imagePath);
});

module.exports.getAllBlogs = asyncHandler(async (req, res) => {
  const PER_PAGE = 6;
  const { pageNumber, search } = req.query;

  let query = {};

  if (search) {
    query = {
      $or: [
        { title: { $regex: new RegExp(search, 'i') } },
        { description: { $regex: new RegExp(search, 'i') } },
      ],
    };
  }

  let blogs;
  if (pageNumber) {
     if (search) {
      blogs = await Blog.find(query)
        .skip((pageNumber - 1) * PER_PAGE)
        .limit(PER_PAGE)
        .sort({ createdAt: -1 })
        .populate("user", ["-password"]);
    } else {
      blogs = await Blog.find()
      .skip((pageNumber - 1) * PER_PAGE)
      .limit(PER_PAGE)
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
    }
    
  } 

  res.status(200).json(blogs);
});

module.exports.getBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("user", [
    "-password",
  ])
  .populate("comments")

  if (!blog) return res.status(404).json({ message: "Post non trouvé" });

  res.status(200).json(blog);
});

module.exports.getBlogsCount = asyncHandler(async (req, res) => {
  const count = await Blog.countDocuments();
  res.status(200).json(count);
});

module.exports.deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) return res.status(404).json({ message: "Post non trouvé" });

  if (req.user.isAdmin || req.user.id === blog.user.toString()) {
    await cloudinaryRemoveImage(blog.image.publicId);
    
    await Blog.findByIdAndDelete(req.params.id);
    await Comment.deleteMany({ blogId : blog._id})

    res.status(200).json({ message: "Votre blog a été supprimé" });
  } else return res.status(403).json({ message: "Accès refusé" });
});

module.exports.updateBlog = asyncHandler(async (req, res) => {
  const { error } = validateUpdateBlog(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: "Post non trouvé" });

  if (req.user.id !== blog.user.toString())
    return res.status(403).json({ message: "Accès refusé, non autorisé" });

  const updateBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
      },
    },
    { new: true }
  ).populate("user", ["-password"]);

  res.status(200).json(updateBlog);
});

module.exports.updateBlogImage = asyncHandler(async (req, res) => {
  if (!req.file)
    return res.status(400).json({ message: "Aucune image fournie" });

  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: "Post non trouvé" });

  if (req.user.id !== blog.user.toString())
    return res.status(403).json({ message: "Accès refusé, non autorisé" });

  await cloudinaryRemoveImage(blog.image.publicId);

  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  const result = await cloudinaryUploadImage(imagePath);

  const updateBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        image: {
          url: result.secure_url,
          publicId: result.public_id,
        },
      },
    },
    { new: true }
  );

  res.status(200).json(updateBlog);
  fs.unlinkSync(imagePath);
});

module.exports.toggleLikeBlog = asyncHandler(async (req, res) => {
    const {id : idPost} = req.params
    const loggedUserId = req.user.id

    let blog = await Blog.findById(idPost)
    if (!blog) return res.status(404).json({ message: "Post non trouvé" });

    const isLiked = blog.likes.find( user => user.toString() === loggedUserId)
    
    if(isLiked){
        blog = await Blog.findByIdAndUpdate(idPost, 
            { $pull : { likes : loggedUserId} },
            { new : true }
            )
    } else {
        blog = await Blog.findByIdAndUpdate(idPost, 
            { $push : { likes : loggedUserId} },
            { new : true }
            )
    }

    res.status(200).json(blog)
})