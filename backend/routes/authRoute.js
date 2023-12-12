const router = require("express").Router()
const { signUp, logIn, verifyUserAccount } = require("../controllers/authController")
router.post("/signup", signUp)
router.post("/login", logIn)
router.get("/:userId/verify/:token", verifyUserAccount)
module.exports = router
