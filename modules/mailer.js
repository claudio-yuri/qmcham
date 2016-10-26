/*jshint esversion: 6 */

var nodemailer = require('nodemailer');

var exports = module.exports = {};

exports.sendMail = function(recomendation, sender, recipients) {
  dameUnGifAlBoleo((gif) => {
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport('smtps://' + process.env.EMAILSENDER + ':' + process.env.EMAILPASSWORD + '@' + process.env.SMTPHOST);

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '"' + sender.name + ' 👥" <' + sender.email + '>', // sender address
        to: recipients.join(','), // list of receivers
        subject: '✔ ¡Ya sabemos dónde comer!', // Subject line
        //text: 'Hello world 🐴', // plaintext body
        html: 'Hoy se come en: <b>' + recomendation.nombre + '</b>. Tiene un precio promedio de: $' + recomendation.precioPromedio + (typeof gif !== 'undefined'? '<br /><img src="' + gif + '" />' : "") + "<br />Saluda atentamente, el equipo de Roadmap!"  // html body
    };

    // send mail with defined transport object
    console.log("Enviando mensaje...");
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
  });
};

//trae un gif the giphy
function dameUnGifAlBoleo(callback){
  var http = require('http');

  console.log("Buscando un gif...");

  //http.get('http://api.giphy.com/v1/stickers/random?api_key=dc6zaTOxFJmzC&rating=r', (response) => {
  http.get('http://api.giphy.com/v1/stickers/trending?api_key=dc6zaTOxFJmzC&limit=1&rating=r', (response) => {
    // consume response body
    var body = '';
    response.on('data', (d) => {
        body += d;
    });

    //cuando finaliza
    response.on('end', () => {
      var parsed = JSON.parse(body);
      //busco el gif de baja calidad para que no joda en el mail
      //callback(parsed.data.fixed_height_downsampled_url);
      callback(parsed.data[0].images.fixed_height_downsampled.url);
    });
  }).on('error', (e) => {
    console.log(`Got error: ${e.message}`);
    callback();
  });
}
