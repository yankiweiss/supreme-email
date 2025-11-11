const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
require('dotenv').config()
const cors = require('cors')

app.use(cors())

const port = 4000

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/email', async (req, res) => {

  const {name, contactInfo, message} = req.body;

  

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});

let mailOptions = {
  from: process.env.EMAIL,
    to: 'yakovw2706@gmail.com',
    subject: `Message from ${name}`,
    text: `Contact info: ${contactInfo}\n\nMessage: ${message}`
};

await transporter.sendMail( mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    res.send(200)
    console.log('Email sent: ' + info.response);
  }
});

})

app.listen(port, ()=> {
    console.log(`Server ruining on ${port}`)
})