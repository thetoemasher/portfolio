require('dotenv').config()
const express = require('express')
    , bodyParser = require('body-parser')
    , nodemailer = require('nodemailer');

    const app = express();

    const { EMAIL, EMAIL_PASSWORD } = process.env

    const transport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: EMAIL,
            pass: EMAIL_PASSWORD
        }
    })


    app.use(bodyParser.json());
    app.use(express.static(__dirname + '/../public'))
    app.post('/api/email', (req, res) => {
        const {name, email, message} = req.body
        const mailOptions = {
            from: email,
            to: 'tomeschcody@gmail.com',
            subject: 'An inquiry from ' + name,
            text: `Email: ${email}
${message}`
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