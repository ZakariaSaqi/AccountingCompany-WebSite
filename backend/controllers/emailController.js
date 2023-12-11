const asyncHandler = require("express-async-handler");
const sendEmail = require("../utils/sendEmail");

module.exports.sentEmail = asyncHandler(async (req, res) => {
  const htmlTemplate = `
     <div>
     <p>${req.body.message}</p>
     <br>
     ${req.body.email}
     <br>
     ${req.body.fullname}
     </div>`;
  await sendEmail(process.env.EMAIL, req.body.subject, htmlTemplate);
  res.status(201).json({
    message: "Email send successfully !",
  });
});