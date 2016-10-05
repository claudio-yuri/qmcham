/*jshint esversion: 6 */
var errorMsg = "";

if(!process.env.MONGOCONNECTIONSTRING){
  errorMsg += "Enviroment var MONGOCONNECTIONSTRING not defined\n";
}
if(!process.env.EMAILSENDER){
  errorMsg += "Enviroment var EMAILSENDER not defined\n";
}
if(!process.env.EMAILPASSWORD){
  errorMsg += "Enviroment var EMAILPASSWORD not defined\n";
}
if(errorMsg !== ""){
  console.log(errorMsg);
  process.exit(1);
}

const express = require('express');
const listenPort = 8080;
var app = express();
var path = __dirname + '/views/';

app.get("/", (req, res) => {
  res.sendFile(path + "index.html");
});

app.get("/recomendation", (req, res) => {
  getRecommendation();
  res.status(200).send("listo");
});

app.listen(listenPort, () => {
  console.log("listening on port " + listenPort);
});

function getRecommendation(){
  var mailer = require("./modules/mailer.js");
  var mongodb = require('mongodb');

  var mongoClient = mongodb.MongoClient.connect(process.env.MONGOCONNECTIONSTRING, (err, db) => {
    if (err) throw err;
    console.log("Conectado a la base de conocimientos...");

    console.log("Buscando información...");

    //busco los últimos, ordenado por fecha descendente y me quedo con los últimos 3
    db.collection('ultimos').find({}).sort({fecha: -1}).limit(3).toArray((err, ultimos) => {
      var ultIds = ultimos.map((x) => x.idLugar);
      var ultimoTipoDeComida = typeof ultimos[0] == 'undefined' || ultimos[0].tipoDeComida == 'undefined'? [] : ultimos[0].tipoDeComida;

      //busco todos los lugares disponibles sin contar los últimos seleccionados
      db.collection('lugares').find({_id: {$nin: ultIds}, tipoDeComida: {$nin: ultimoTipoDeComida} , esLujo: false}).toArray((err, opcionesDeComida) => {
        if (err) console.log(err);
        var result = opcionesDeComida;

        console.log("Aplicando algoritmo de desición...");

        var length = result.length;

        result = result[Math.floor(Math.random()*length)];

        if(typeof result === 'undefined'){
          console.log("no encontré nada!");
          db.close();
          process.exit(1);
        }

        db.collection('ultimos').insert({idLugar: result._id, nombre: result.nombre, fecha: new Date(), tipoDeComida: result.tipoDeComida}, (err, records) => {
          if (err) console.log(err);

          db.collection('destinatarios').find().toArray((err, destinatarios) =>{
            if (err) console.log(err);

            mailer.sendMail(result, {name: "Claudio Yuri", email: process.env.EMAILSENDER}, destinatarios.map((x) => x.email));

            //closedb connection
            db.close();
          });
        });
      });
    });
  });
}
