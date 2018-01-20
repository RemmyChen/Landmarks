Landmarks

Part1: displays map of historic landmarks and user check ins within 1 radius of user's check in geolocation (GET).
Part2: check in (POST).
Part3: fetches queried check in data (GET).
Part4: displays all check ins (GET).

To run this app locally, to start the local server, type:
 	node index.js

and in a different terminal window, type:
	for part1: curl http://localhost:5000/
	for part2: curl --data "login=pikachu&lat=42.508032&lng=-71.0982818" http://localhost:5000/sendLocation
	for part3: curl http://localhost:5000/checkins.json?login=rchen
	for part4: curl http://localhost:5000/checkins

To perform CRUD manipulations on local Mongo databases and/or collections, need to enter the mongo shell, so type:
	mongo
	use [dbname]
	db.[collectionname].drop() or .find() or .insert() etc.

To deploy this app onto Heroku and MongoDB, type:
	git add .
	git commit -m 'some message'
	git push heroku master

and type:
	for part1: curl http://lit-brushlands-98638.herokuapp.com/
	for part2: curl --data "login=pikachu&lat=42.508032&lng=-71.0982818" http://lit-brushlands-98638.herokuapp.com/sendLocation
	for part3: curl http://lit-brushlands-98638.herokuapp.com/checkins.json?login=rchen
	for part4: curl http://lit-brushlands-98638.herokuapp.com/checkins
