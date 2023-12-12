const { sendResetPasswordLink, getResetPasswordLink, resetPassword } = require("../controllers/passwordController");

const router = require("express").Router();

router.post("/resetPasswordLink", sendResetPasswordLink);
router
  .route("/resetPassword/:userId/:token")
  .get(getResetPasswordLink)
  .post(resetPassword);
module.exports = router;
