'use strict'
var express = require('express');
var router = express.Router();
const Email = require('../utils/email')

router.post('/emailtovgt', async (req, res, next) => {
  const { name, email, phone, subject, message } = req.body
  console.log("req.body: ", req.body)
  try {
    console.log("sending email...")
    const result = await Email(name, email, phone, subject, message)
    //throw new Error('FORCED...')
    console.log("email send: ", result)
    if (result && (!result.rejected || result.rejected.length > 0)) {
      res.send("error sending the email / error enviando el email")
    }
    res.send("the email has been sent / el email ha sido enviado")
  } catch (error) {
    res.send("error sending the email / error enviando el email")
  }
})

module.exports = router;
