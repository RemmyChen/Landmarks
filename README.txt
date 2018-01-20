The purpose of this assignment is to learn how to work with MongoDB, Node.js/Express, and Heroku, completing the backend used by assignment 2.

I think the work has been correctly implemented as per the spec, though I suppose I could have better formatted my code to avoid callback hell. I learned that updating the Procfile to add dependencies like mongodb and running 'npm install' was important, writing correct syntax to display objects correctly was important, and much more.

To run this app locally, to start the local server, type:
 	node index.js

and in a different terminal window, type:
	for part1: curl --data "login=pikachu&lat=42.508032&lng=-71.0982818" http://localhost:5000/sendLocation
	for part2: curl http://localhost:5000/checkins.json?login=rchen
	for part3: curl http://localhost:5000/

To perform CRUD manipulations on local Mongo databases and/or collections, need to enter the mongo shell, so type:
	mongo
	use [dbname]
	db.[collectionname].drop() or .find() or .insert() etc.

To deploy this app onto Heroku and MongoDB, type:
	git add .
	git commit -m 'some message'
	git push heroku master

and type:
	for part1: curl --data "login=pikachu&lat=42.508032&lng=-71.0982818" http://lit-brushlands-98638.herokuapp.com/sendLocation
	for part2: curl http://lit-brushlands-98638.herokuapp.com/checkins.json?login=rchen
	for part3: curl http://lit-brushlands-98638.herokuapp.com/

I received help from two TAs and I spent around 8 hours on the project. Thanks to the TAs for helping me get familiar with running the app, with testing, and with debugging, and thanks to Ming's examples files and in-class demonstrations for a lot of the code's implementation.