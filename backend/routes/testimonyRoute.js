const router = require("express").Router(); 
const { verifyToken, verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const validateID = require("../middlewares/validateID");
const { createTestimony, getAllTestimonys, deleteTestimony, updateTestimony, accepteTestimony, getAllTestimonysTrue, getTestimoniesCount } = require("../controllers/testimonyController");

router.route("/")
.post(verifyToken, createTestimony)
.get(verifyTokenAndAdmin, getAllTestimonys)

router.route("/AcceptedTestimonies")
.get(getAllTestimonysTrue)

router.route("/:id")
.put(validateID, verifyToken, updateTestimony)
.delete(validateID, verifyToken, deleteTestimony )

router.route("/accepteTestimony/:id")
.put(validateID, verifyTokenAndAdmin, accepteTestimony)
router.route("/count")
.get(getTestimoniesCount)
module.exports = router;