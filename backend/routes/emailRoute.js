const { sentEmail } = require("../controllers/emailController");

const router = require("express").Router(); 

router.route("/")
.post(sentEmail)

module.exports = router;