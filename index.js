/*jshint esversion: 6 */
var mailer = require("./modules/mailer.js");
var mongodb = require('mongodb');

var mongoClient = mongodb.MongoClient.connect('mongodb://127.0.0.1:' + process.env.MONGOPORT + '/recomendaciones', (err, db) => {
  if (err) throw err;
  console.log("Conectado a la base de conocimientos...");

  console.log("Buscando información...");

  //busco los últimos, ordenado por fecha descendente y me quedo con los últimos 3
  db.collection('ultimos').find({}).sort({fecha: -1}).limit(3).toArray((err, ultimos) => {
    var ultIds = ultimos.map((x) => x.idLugar);
    //busco todos los lugares disponibles sin contar los últimos seleccionados
    db.collection('lugares').find({_id: {$nin: ultIds}, esLujo: false}).toArray((err, opcionesDeComida) => {
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

      db.collection('ultimos').insert({idLugar: result._id, nombre: result.nombre, fecha: new Date()}, (err, records) => {
        if (err) console.log(err);

        mailer.sendMail(result, {name: "Claudio Yuri", email: process.env.EMAILSENDER}, ["claudioyuri@hotmail.com"]);

        //closedb connection
        db.close();
      });
    });
  });
});
