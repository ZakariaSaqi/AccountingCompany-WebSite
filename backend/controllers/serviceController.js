const asyncHandler = require("express-async-handler");
const { User } = require("../models/User");
const {
  validateAddService,
  Service,
  validateUpdateService,
} = require("../models/Service");

module.exports.addService = asyncHandler(async (req, res) => {
  const { error } = validateAddService(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const service = new Service({
    title: req.body.title,
    description: req.body.description,
    user: req.user.id,
  });
  await service.save();

  res.status(201).json(service);
});

module.exports.getAllTServices = asyncHandler(async (req, res) => {
  const { search } = req.query;

  let query = {};

  if (search) {
    query = {
      $or: [
        { title: { $regex: new RegExp(search, "i") } },
        { description: { $regex: new RegExp(search, "i") } },
      ],
    };
  }
  let services;
  if (search) {
    services = await Service.find(query)
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  } else {
    services = await Service.find()
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  }

  res.status(200).json(services);
});

module.exports.getService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id)

  if (!service) return res.status(404).json({ message: "Service non trouvé" });

  res.status(200).json(service);
});


module.exports.deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) return res.status(404).json({ message: "Service non trouvé" });

  if (req.user.isAdmin) {
    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Votre service a été supprimé" });
  } else res.status(403).json({ message: "Accès refusé" });
});

module.exports.updateService = asyncHandler(async (req, res) => {
  const { error } = validateUpdateService(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const service = await Service.findById(req.params.id);
  if (!service) return res.status(404).json({ message: "Service non trouvé" });

  if (!req.user.isAdmin)
    res.status(403).json({ message: "Accès refusé, non autorisé" });

  const updateService = await Service.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
      },
    },
    { new: true }
  );
  res.status(200).json(updateService);
});

module.exports.getServicesCount = asyncHandler(async (req, res) => {
  const count = await Service.countDocuments();
  res.status(200).json(count);
});
