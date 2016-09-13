// hacemos referencia a la dependencia
var mongodb = require('mongodb');

//levanto el set de datos
var fs = require('fs');
var contents = fs.readFileSync('lugares.json').toString();
var lugares = JSON.parse(contents);

//importamos los lugares
// obtenemos la base de datos de prueba que creamos
var mongoClient = mongodb.MongoClient.connect('mongodb://127.0.0.1:' + process.env.MONGOPORT + '/recomendaciones', (err, db) => {
  if (err) throw err;
  console.log("Connected to Database");

	//insert records
	db.collection('lugares').insert(lugares, (err, records) => {
		if (err) throw err;
		return;
	});
	
	db.close();
});
