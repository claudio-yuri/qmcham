var nodemailer = require('nodemailer');

// const mongoPort = 27017;
const opcionesDeComida = [
  {
    nombre: "Sandwhich - Paraguay y Ayacucho",
    precioPromedio: 50,
    esLujo: false
  },
  {
    nombre: "Sangucheto",
    precioPromedio: 60,
    esLujo: false
  },
  {
    nombre: "Esclavas",
    precioPromedio: 60,
    esLujo: false
  },
  {
    nombre: "Dellepiane",
    precioPromedio: 120,
    esLujo: true
  },
  {
    nombre: "Al buen tallarín",
    precioPromedio: 90,
    esLujo: true
  },
  {
    nombre: "Chino Limpio",
    precioPromedio: 45,
    esLujo: false
  },
  {
    nombre: "Doddy",
    precioPromedio: 70,
    esLujo: false
  }
];

var ultimosTres = [];
ultimosTres.push(opcionesDeComida[0]);
// console.log(ultimosTres);

var result;

result = opcionesDeComida.filter((x) => !x.esLujo && !ultimosTres.includes(x));

var length = result.length;

result = result[Math.floor(Math.random()*length)];

console.log(result);

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://' + process.env.EMAILSENDER + ':' + process.env.EMAILPASSWORD + '@smtp.gmail.com');

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"Fred Foo 👥" <foo@blurdybloop.com>', // sender address
    to: 'claudioyuri@hotmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world 🐴', // plaintext body
    html: '<b>Hello world 🐴</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});
