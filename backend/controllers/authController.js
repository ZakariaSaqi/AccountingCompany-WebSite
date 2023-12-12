const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {
  User,
  validateSignupUser,
  validateLoginUser,
} = require("../models/User");
const crypto = require("crypto");
const VerificationToken = require("../models/verificationToken");
const sendEmail = require("../utils/sendEmail");

module.exports.signUp = asyncHandler(async (req, res) => {
  const { error } = validateSignupUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).json({ message: "Email déjà utilisé." });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  user = new User({
    firstname: req.body.firstname.toLowerCase(),
    lastname: req.body.lastname.toUpperCase(),
    email: req.body.email,
    password: hashedPassword,
  });
  await user.save();

  //sned email //
  // 1-craete ew verfiToken && save to db
  const verificationToken = new VerificationToken({
    userId: user._id,
    token: crypto.randomBytes(32).toString("hex"),
  });
  await verificationToken.save();
  // 2- making link
  const link = `${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${verificationToken.token}`;
  // 3- putting link in html temp
  const htmlTemplate = `
     <div>
     <p>"Cliquez sur le lien ci-dessous pour vérifier votre e-mail.</p>
     <a href="${link}">Vérifier l'e-mail</a>
     </div>`;
  // 4- Sendi mail to user
  await sendEmail(user.email, "Email verification", htmlTemplate);
  // 5- response to the client
  res.status(201).json({
    message: "Nous vous avons envoyé un e-mail. Veuillez vérifier votre boîte de réception",
  });
});

module.exports.logIn = asyncHandler(async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) return res.status(400).json({ message: error.message });

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ message: "L'adresse e-mail n'existe pas " });

  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordMatch)
    return res.status(400).json({ message: "Mot de passe incorrect !" });

  if (!user.isAccountVerified) {
    let verificationToken = await VerificationToken.findOne({
      userId: user._id,
    });
    if (!verificationToken) {
      const verificationToken = new VerificationToken({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      });
      await verificationToken.save();
    }
    const link = `${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${verificationToken.token}`;
    const htmlTemplate = `
    <div>
    <p>"Cliquez sur le lien ci-dessous pour vérifier votre e-mail.</p>
    <a href="${link}">Vérifier l'e-mail</a>
    </div>`;
    await sendEmail(user.email, "Email verification", htmlTemplate);
    res.status(400).json({
      message: "Nous vous avons envoyé un e-mail. Veuillez vérifier votre boîte de réception",
    });
  }

  const token = user.generateAuthToken();
  await user.save();

  res.status(201).json({
    firstname: user.firstname,
    lastname: user.lastname,
    _id: user._id,
    isAdmin: user.isAdmin,
    profilePhoto: user.profilePhoto,
    token,
  });
});

module.exports.verifyUserAccount = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(400).json({ message: "Lien invalide" });
    }
  
    const verificationToken = await VerificationToken.findOne({
      userId: user._id,
      token: req.params.token,
    });
  
    if (!verificationToken) {
      return res.status(400).json({ message: "Lien invalide" });
    }
  
    user.isAccountVerified = true;
    await user.save();
  
    await VerificationToken.deleteOne({
      userId: user._id,
      token: req.params.token,
    });
  
    res.status(200).json({ message: "Votre compte vérifié." });
  });
  
