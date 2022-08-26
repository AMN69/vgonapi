'use strict'
var express = require('express');
var router = express.Router();
const Email = require('../utils/email')

router.post('/emailtovgt', async (req, res, next) => {
  var origin = req.get('origin')
  console.log("origin: ", origin)
  if (origin !== 'https://vgonzalez.herokuapp.com') {
    res.send("call not authorized / llamada no autorizada")
    return
  } 
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
