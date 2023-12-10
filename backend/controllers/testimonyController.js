const asyncHandler = require("express-async-handler");
const { User } = require("../models/User");
const {Testimony ,validateCreateTestimony, validateUpdateTestimony } = require("../models/Testimony");

module.exports.createTestimony = asyncHandler(async (req, res) => {

    const { error } = validateCreateTestimony(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const profile = await User.findById(req.user.id)
    const witnessName =  profile?.firstname.charAt(0).toUpperCase() + profile?.firstname.slice(1)+" "+ profile?.lastname
     const testimony = new Testimony({
      text: req.body.text,
      user: req.user.id,
      witnessName : witnessName,
      witnessProfilePhoto: profile.profilePhoto.url
    });
    await testimony.save()

    res.status(201).json(testimony);
});
module.exports.getAllTestimonys = asyncHandler(async (req, res) => {
  const {  search } = req.query;
  let query = {};
  if (search) {
    query = {
      $or: [
        { text: { $regex: new RegExp(search, 'i') } },
        { witnessName: { $regex: new RegExp(search, 'i') } },
      ],
    };
  }
  let testimonys
   if(search){
    testimonys = await Testimony.find(query)
       .sort({ createdAt: -1 })
       .populate("user", ["-password"]);
   } else {
    testimonys = await Testimony.find()
       .sort({ createdAt: -1 })
       .populate("user", ["-password"]);
   }

   res.status(200).json(testimonys);
});
module.exports.getAllTestimonysTrue = asyncHandler(async (req, res) => {

    const testimonys = await Testimony.find({isAccepted : true})
         .sort({ createdAt: -1 })
         .populate("user", ["-password"]);
 
     res.status(200).json(testimonys);
});

module.exports.accepteTestimony = asyncHandler(async (req, res) => {
  const testimony = await Testimony.findById(req.params.id);
  testimony.isAccepted = true;
  await testimony.save();
  res.status(200).json("Testimony has been accepted !");
})
module.exports.deleteTestimony = asyncHandler(async (req, res) => {

    const testimony = await Testimony.findById(req.params.id);
    if (!testimony)  return res.status(404).json({ message: "Testimony not found" });

    if (req.user.isAdmin || req.user.id === testimony.user.toString()) {
      await Testimony.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Your Testimony has been deleted !" });
    } else  res.status(403).json({ message: "Acces denied !" });
    
  });

  module.exports.updateTestimony = asyncHandler(async (req, res) => {

    const { error } = validateUpdateTestimony(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const testimony = await Testimony.findById(req.params.id);
    if (!testimony) return res.status(404).json({ message: "Testimony not found !" });

    if (req.user.id !== testimony.user.toString()) res.status(403).json({ message: "Acces denied, not allowed !" });
    
    const updateTestimony = await Testimony.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          text: req.body.text,
        },
      },
      { new: true }
    )
    res.status(200).json(updateTestimony);
  });
  module.exports.getTestimoniesCount = asyncHandler(async (req, res) => {
    const count = await Testimony.countDocuments();
    res.status(200).json(count);
  });