"use strict";
require("dotenv").config();
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
const Email = async (name, email, phone, subject, message) => {
  try {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_NAME, // generated ethereal user
        pass: process.env.GMAIL_PASS, // generated ethereal password
      },
    });

    const theInfo = 
    `Nombre de la persona de contacto: ${name}
    email: ${email}
    teléfono: ${phone ? phone : 'no informado'}
    mensaje: ${message}`

    // send mail with defined transport object
    //throw new Error('FORCED...')
    let info = await transporter.sendMail({
      from: process.env.GMAIL_NAME,
      to: process.env.GMAIL_NAME, // list of receivers
      subject: subject, // Subject line
      text: theInfo, // plain text body
    });
    console.log("now is sent really: ", info)
    return info

    //console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log("Error is: ", error)
    return error
  }
  
}

module.exports = Email;