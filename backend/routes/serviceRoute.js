const router = require("express").Router(); 
const {verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const validateID = require("../middlewares/validateID");
const { addService, getAllTServices, deleteService, updateService, getServicesCount } = require("../controllers/serviceController");

router.route("/")
.post(verifyTokenAndAdmin, addService)
.get(getAllTServices)

router.route("/:id")
.delete(validateID, verifyTokenAndAdmin, deleteService )
.put(validateID, verifyTokenAndAdmin, updateService)
router.route("/count")
.get(getServicesCount)

module.exports = router;