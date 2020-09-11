const path = require('path')
const express = require('express')
const nodemailer = require('nodemailer')

const app = express()

const port = process.env.PORT || 3000
const publicPath = path.join(__dirname, './dist')
const cssPath = path.join(__dirname, './css')

app.use(express.static(publicPath))
app.use(express.static(cssPath))
app.use(express.json())

app.post('/server', (req, res) => {
    const items = req.body.items
    const userName = req.body.user.name
    let userEmail

    if (req.body.user.email) {
        userEmail = req.body.user.email
    }

    let body = ''

    items.forEach((item, index) => {
        body += `${index+1}. ${item.title}${item.year ? ' (' + item.year + ')' : ''} - ${item.type}\n`
    })

    body = `Hi Jon,\n\n${userName} has requested:\n\n${body}`

    console.log(body)

    const transporter = nodemailer.createTransport({
        host: 'smtp.mail.yahoo.com',
        port: 465,
        secure: false,
        service: 'yahoo',
        auth: {
          user: 'plex.requester@yahoo.com',
          pass: 'gnbx fkbc skdm rdpq'
        },
        debug: false,
        logger: true
    })
    const mailOptions = {
        from: 'plex.requester@yahoo.com',
        to: 'stephenagiordano@gmail.com',
        subject: 'Request!',
        text: body
    }

    if (userEmail) {
        mailOptions.cc = userEmail
    }

    transporter.sendMail(mailOptions, function(error, response) {
        if (error) {
            res.send({status: 'error'})
        } else if (response) {
            res.send({status: 'okay'})
        }
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})