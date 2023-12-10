const router = require("express").Router()
const { createBlog, getAllBlogs, getBlog, getBlogsCount, deleteBlog, updateBlog, updateBlogImage, toggleLikeBlog } = require("../controllers/blogController")
const photoUpload = require("../middlewares/photoUpload")
const validateID = require("../middlewares/validateID")
const { verifyToken, verifyTokenAndAdmin } = require("../middlewares/verifyToken")

router.route("/")
.post(verifyTokenAndAdmin, photoUpload.single("image"), createBlog)
.get(getAllBlogs)

router.route("/count")
.get(getBlogsCount)

router.route("/:id")
.get(validateID, getBlog)
.put(validateID, verifyTokenAndAdmin, updateBlog)
.delete(validateID, verifyTokenAndAdmin, deleteBlog)

router.route("/blog-image-update/:id")
.put(validateID, verifyTokenAndAdmin,  photoUpload.single("image"), updateBlogImage)

router.route("/like/:id")
.put(validateID, verifyToken, toggleLikeBlog)

module.exports = router
