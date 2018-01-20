var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();
var bodyParser = require('body-parser'); 
var validator = require('validator');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enable cross origin sharing
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.set('port', (process.env.PORT || 8000));

app.use(express.static(__dirname + '/views/pages'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, response) {
    response.render('pages/index');
});

// mongo initialization and connect to database
var mongoUri = process.env.MONGODB_URI || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/assignment3';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
	db = databaseConnection;
	db.collection('landmarks').createIndex({'geometry':"2dsphere"});
});

// first part
app.post('/sendLocation', function(request,response) {
	var login = request.body.login;
	login = ("" + login).replace(/[^\w\s]/gi, '');
	var lat = request.body.lat;
	var lng = request.body.lng;
	var created_at = new Date();

	if (login != undefined && lat != undefined && lng != undefined && validator.isFloat(lat) && validator.isFloat(lng)) {
		lat = parseFloat(lat);
		lng = parseFloat(lng);
		if (lat >= -90.0 && lat <= 90.0 && lng >= -180.0 && lng <= 180.0) {
			var toInsert = {
				"login": login,
				"lat": lat,
				"lng": lng, 
				"created_at": created_at
			};
			db.collection('checkins', function(errorrrrr, coll) {
				coll.insert(toInsert, function(errorrr, saved) {
					if (errorrr) {
						console.log("Error: " + error);
						response.send(500);
					}
					else {
						response.set('Content-Type', 'application/x-www-form-urlencoded');
						var list;
						coll.find().toArray(function(err, results) {
							if (!err) {
								db.collection('landmarks', function(error, collec) {
									collec.find({geometry:{$near:{$geometry:{type:"Point",coordinates:[Number(lng), Number(lat)]},$minDistance: 0,$maxDistance: 1609}}}).toArray(function(error, res) {
										list = {"people": results, "landmarks": res};
										response.send(list);
									});
								});
							}
							else {
								response.send('{"error":"Whoops, something is wrong with your data!"}');
							}
						});
					}
			    });
			});
		}
	}
	else {
		response.send('{"error":"Whoops, something is wrong with your data!"}');	
	}
});


// second part
app.get('/checkins.json', function(request, response) {
	response.set('Content-Type', 'text/html');
	var login = request.query.login;
	login = ("" + login).replace(/[^\w\s]/gi, '');
	var output = {checkins:[]};
	if (login == "") {
		response.send(output);
	}
	else {
		db.collection('checkins', function(err, coll) {
			coll.find().toArray(function(error, results) {
				if (!error) {
					for (var i = 0; i < results.length; i++) {
	          			if (login == results[i].login) {
	            			output.checkins.push(results[i]); 
	          			}
	        		}
					response.send(output);
				}
			});
		});
	}
});


// third part
app.get('/checkins', function(request, response) {
	db.collection('checkins', function(err, coll) {
		response.set('Content-Type', 'text/html');
		var indexPage = '';
		coll.find().toArray(function(error, results) {
			if (!error) {
				indexPage += "<!DOCTYPE HTML><html><head><title>Checkins</title></head><body><h1>Where is everyone checking in from?</h1>";
				for (var count = results.length - 1; count >= 0; count--) {
					indexPage += "<p>" + results[count].login + " checked in on " + 
					results[count].created_at + " at " + results[count].lat + ", " +
					results[count].lng + "</p>";
				}
				indexPage += "</body></html>"
				response.send(indexPage);
			} 
			else{
				console.log(error);
				response.send("<!DOCTYPE HTML><html><head><title>Not Checkins</title></head><body><h1>Not Checkins</h1><p>Whoops, something went wrong!</p></body></html>");
			}
		});
	}); 
}); 


// testing
app.get('/cool', function(request, response) {
  response.send(cool());
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
