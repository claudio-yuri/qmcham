var mailer = require("./modules/mailer.js");

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
  },
  {
    nombre: "Mi Matute",
    precioPromedio: 55,
    esLujo: false
  },
  {
    nombre: "Güerrin",
    precioPromedio: 100,
    esLujo: true
  },
  {
    nombre: "El cuartito",
    precioPromedio: 100,
    esLujo: true
  }
];

var ultimosTres = [];
ultimosTres.push(opcionesDeComida[0]);

var result;

result = opcionesDeComida.filter((x) => !x.esLujo && !ultimosTres.includes(x));

var length = result.length;

result = result[Math.floor(Math.random()*length)];

console.log(result);

mailer.sendMail(result, {name: "Claudio Yuri", email: "process.env.EMAILSENDER"}, ["claudioyuri@hotmail.com"]);
