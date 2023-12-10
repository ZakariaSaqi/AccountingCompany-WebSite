const router = require("express").Router(); 
const { verifyToken, verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const validateID = require("../middlewares/validateID");
const { createComment, getAllComments, deleteComment, updateComment, getCommentsCount } = require("../controllers/commentController");

router.route("/")
.post(verifyToken, createComment)
.get(verifyTokenAndAdmin, getAllComments)

router.route("/:id")
.put(validateID, verifyToken, updateComment)
.delete(validateID, verifyToken, deleteComment )

router.route("/count")
.get(getCommentsCount)
module.exports = router;