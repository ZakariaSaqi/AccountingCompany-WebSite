const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, validateNewPassword, validateEamil } = require("../models/User");
const VerificationToken = require("../models/verificationToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

module.exports.sendResetPasswordLink = asyncHandler(async (req, res) => {
  const { error } = validateEamil(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ message: "Email utilisatuer non trouvé" });
  }
  let verificationToken = await VerificationToken.findOne({ userId: user._id });
  if (!verificationToken) {
    verificationToken = new VerificationToken({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    });
    await verificationToken.save()
  }
  const link = `${process.env.CLIENT_DOMAIN}/resetPassword/${user._id}/${verificationToken.token}`;

  const htmlTemplate = `
     <div>
     <p>"Cliquez sur le lien ci-dessous pour vérifier votre e-mail.</p>
     <a href="${link}">Réinitialiser le mot de passe</a>
     </div>`;
  await sendEmail(user.email, "Réinitialiser le mot de passe", htmlTemplate);
  res.status(201).json({
    message: "Nous vous avons envoyé un e-mail. Veuillez vérifier votre boîte de réception",
  });
});

module.exports.getResetPasswordLink = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(404).json({ message: "Lien invalide" });
  }
  const verificationToken = await VerificationToken.findOne({
    userId: user._id,
    token: req.params.token,
  });
  if (!verificationToken) {
    return res.status(404).json({ message: "Lien invalide" });
  }
   
  res.status(200).json({ message: "Valid url !"});
}) ;

module.exports.resetPassword = asyncHandler(async (req, res) => {
    const { error } = validateNewPassword(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(400).json({ message: "Lien invalide" });
  }

  const verificationToken = await VerificationToken.findOne({
    userId: user._id,
    token: req.params.token,
  });
  if (!verificationToken) {
    return res.status(404).json({ message: "Lien invalide" });
  }
  if(!user.isAccountVerified){
    user.isAccountVerified = true
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  user.password = hashedPassword
  await user.save()
  await VerificationToken.deleteOne({ userId: user._id, token: req.params.token });
  res.status(200).json({ message: "Réinitialisation du mot de passe réussie. Veuillez vous connecter." });
  }) ;