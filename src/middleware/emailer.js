const nodemailer = require('nodemailer')
const fs = require('fs')
const smtpTransport = nodemailer.createTransport({
  /*
    anytime you need external connection such as
    databases or smtp servers in AWS Lambda (serverless)
    use pooled connections to avoid creating and destroying
    connections repeatedly. This WILL cause timeouts
    and 502 or 500 errors for your clients
  */
  pool: true,
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
})

exports.transport = smtpTransport

// // This commented code creates a test account in etheral mail
// nodemailer.createTestAccount((err, account) => {
//   if (err) {
//     console.debug('Error when creating email test account', err)
//     throw err
//   }
//   console.log(account.user, account.pass)
// })

exports.send = async (req, res, next) => {
  console.log('Getting ready to send email')
  // read html file to obtain html string
  if (res.locals.emailOptions.htmlFile) {
    fs.readFileSync(res.locals.emailOptions.htmlFile,
      { encoding: 'utf-8' },
      (err, html) => {
        if (err) {
          console.debug(err)
          next(err)
        } else {
          const mailOptions = {
            to: res.locals.emailOptions.to,
            from: res.locals.emailOptions.from,
            subject: res.locals.emailOptions.subject,
            html: html
          }
          smtpTransport.sendMail(mailOptions)
            .then(info => {
              console.log('Email sent successfully')
              next()
            }).catch(err => {
              console.debug('Error when sending email')
              res.status(500)
              next(err)
            })
        }
      })
  // html string or text is already loaded as string
  } else if (res.locals.emailOptions.text || res.locals.emailOptions.html) {
    smtpTransport.sendMail(res.locals.emailOptions)
      .then(info => {
        console.log('Email sent successfully')
        next()
      }).catch(err => {
        console.debug('Error when sending email')
        res.status(500)
        next(err)
      })
  } else {
    res.status(400)
    next(new Error('No email content is given'))
  }
}
