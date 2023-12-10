const router = require("express").Router()
const { getAllUsers, getUser, getUsersCount, updateUserProfile, profilePhotoUpload, deleteUserProfile } = require("../controllers/userController")
const photoUpload = require("../middlewares/photoUpload")
const validateID = require("../middlewares/validateID")
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndOnlyUser, verifyTokenAndAuthorization } = require("../middlewares/verifyToken")

router.route("/")
.get(verifyTokenAndAdmin, getAllUsers)

router.route("/profile/:id")
.get(validateID, getUser)
.put(validateID, verifyTokenAndOnlyUser, updateUserProfile)
.delete(validateID, verifyTokenAndAuthorization, deleteUserProfile)

router.route("/count")
.get(getUsersCount)

router.route("/profile/profile-photo-upload")
.post(verifyToken, photoUpload.single("image"), profilePhotoUpload)



module.exports = router
