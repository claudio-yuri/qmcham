var mailer = require("./modules/mailer.js");
var mongodb = require('mongodb');

var mongoClient = mongodb.MongoClient.connect('mongodb://127.0.0.1:' + process.env.MONGOPORT + '/recomendaciones', (err, db) => {
  if (err) throw err;
  console.log("Connected to Database");

	//insert records
	db.collection('lugares').find({esLujo: false}).toArray((err, opcionesDeComida) => {
    console.log(opcionesDeComida);
    db.collection('ultimos').find({}).toArray((err, ultimos) => {
      if (err) console.log(err);
      var result = opcionesDeComida;
      console.log(ultimos);
      if(ultimos && ultimos.length > 0){
        console.log("hay ultimis");
        result = [];
        for(var oc in opcionesDeComida){
          for(var u in ultimos){
            if(!opcionesDeComida[oc]._id.equals(ultimos[u].idLugar)){
              result.push(opcionesDeComida[oc]);
            }
          }
        }
        //result = opcionesDeComida.filter((x) => ultimos.find((u) => u.idLugar != x._id));
      }
      console.log("resultado: ",result);

      var length = result.length;

      result = result[Math.floor(Math.random()*length)];

      console.log("resultado: ",result);

      if(typeof result === 'undefined'){
        console.log("no encontré nada!");
        db.close();
        process.exit(1);
      }

      db.collection('ultimos').insert({idLugar: result._id, nombre: result.nombre, fecha: new Date()}, (err, records) => {
        //mailer.sendMail(result, {name: "Claudio Yuri", email: "process.env.EMAILSENDER"}, ["claudioyuri@hotmail.com"]);
        db.close();
      });
    });
  });
});
