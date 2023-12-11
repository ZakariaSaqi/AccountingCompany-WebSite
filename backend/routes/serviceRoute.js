const router = require("express").Router(); 
const {verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const validateID = require("../middlewares/validateID");
const { addService, getAllTServices, deleteService, updateService, getServicesCount, getService } = require("../controllers/serviceController");

router.route("/")
.post(verifyTokenAndAdmin, addService)
.get(getAllTServices)

router.route("/count")
.get(getServicesCount)

router.route("/:id")
.get(validateID, getService)
.delete(validateID, verifyTokenAndAdmin, deleteService )
.put(validateID, verifyTokenAndAdmin, updateService)



module.exports = router;