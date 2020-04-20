const express = require('express')
const nodemailer = require('nodemailer');
const creds = require('./credentials.json')

const app = express();
const transport = nodemailer.createTransport({      
  host: "smtp.gmail.com",
  auth: {
    type: "OAuth2",
    user: "therandomsamurai@gmail.com",
    clientId: creds.web.client_id,
    clientSecret: creds.web.client_secret,
    refreshToken: creds.web.refresh_token
  }
});

app.use(express.json());
app.use(express.static(__dirname + '/public'))
app.post('/api/email', (req, res) => {
    const {name, email, message} = req.body
    const mailOptions = {
        from: email,
        to: 'tomeschcody@gmail.com',
        subject: 'An inquiry from ' + name,
        text: `Email: ${email}\n${message}`

    }
    transport.sendMail(mailOptions, (error, response) => {
        if(error) {
            console.log(error)
        } else {
            res.sendStatus(200)
        }
    })
})

app.listen(3005, () => console.log('Serve us up some ports', 3005))