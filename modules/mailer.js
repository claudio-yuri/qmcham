/*jshint esversion: 6 */

var nodemailer = require('nodemailer');

var exports = module.exports = {};

exports.sendMail = function(recomendation, sender, recipients) {
  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport('smtps://' + process.env.EMAILSENDER + ':' + process.env.EMAILPASSWORD + '@smtp.gmail.com');

  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: '"' + sender.name + ' 👥" <' + sender.email + '>', // sender address
      to: recipients.join(','), // list of receivers
      subject: 'Ya sabemos dónde comer ✔', // Subject line
      //text: 'Hello world 🐴', // plaintext body
      html: 'Hoy se come en: <b>' + recomendation.nombre + '</b>. Tiene un precio promedio de: ' + recomendation.precioPromedio // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });
};
