//Integrating Mongoose with the REST API
const mongoose = require('mongoose'),
	Models = require('./models.js'),
	passport = require('passport');
require('./passport');

const {check, validationResult} = require('express-validator');

//Cors access (allowed domains)
const cors = require('cors');
//List of allowed domains
let allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];

app.use(cors({
	origin: (origin, callback) => {
		if (!origin) return callback(null, true);
		if(allowedOrigins.indexOf(origin) === -1) {
			let message = 'The CORS policy for this application doesn't allow from origin ' + origin;
			return callback(new Error(message), false);
		}
		return callback(null, true);
	}
}));

const Movies = Models.Movie;
const Users = Models.User;


//Import express and create the server
const express = require('express'),
	  morgan = require('morgan'),
	  bodyParser = require('body-parser');
const { parse } = require('uuid');
	  
const app = express();

app.use(bodyParser.json());
let auth = require('./auth')(app);

mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });



//Return the documentation html
app.use(express.static('public'));
app.get('/documentation', (req, res) => {
	        res.sendFile('public/documentation.html', {root: __dirname});
});


//Return a list of ALL movies to the user 
app.get('/movies', passport.authenticate('jwt', { session: false}), (req, res) => {
	Movies.find()
	.then((movies) => {

		res.status(201).json(movies);
	})
	.catch((err) => {
		console.error(err);
		res.status(500).send('error: ' + err);
	});
});


//Return data (description, genre, director, image URL, whether its featured or not) about a single movie by title to the user
app.get('/movies/:title', passport.authenticate('jwt', {session: false}), (req, res) => {
	Movies.findOne({Title: req.params.title})
		.then((movie) => {
		res.json(movie);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Error: ' + err);
		});
});


//Return data about a genre (description) by name/title (e.g., "Action")
app.get('/movies/genre/:Name', passport.authenticate('jwt', { session: false}), (req, res) => {
	Movies.findOne({'Genre.Name': req.params.Name})
	.then((movie) => {
		res.json(movie.Genre);
	})
	.catch((err) => {
		console.error(err);
		res.status(500).send('Error: ' +err);
	});
});

//Return data about a director (bio, birth year, death year) by name
app.get('/movies/director/:Name', passport.authenticate('jwt', { session: false}), (req, res) => {
	Movies.findOne({'Director.Name': req.params.Name})
		.then((movie) => {
			res.json(movie.Director);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Error: ' + err);
		});
});


// Allow new users to register and checking the enterd information 
app.post('/users', [
	check('Username', 'Username is required').isLength({min: 5}),
	check('Username', 'Username contains non alphanumeric characters- not allowed.').isAlphanumeric(),
	check('Password', 'password is required').not().isEmpty(),
	check('Email', 'Email does not appear to be valid').isEmail()
], (req, res) => {

//Check the validation object for errors
	let errors = validationResult(req);
	if(!errors.isEmpty()) {
		return res.status(422).json({errors: errors.array()});
	}

	let hashedPassword = Users.hashPassword(req.body.Password);
	Users.findOne({ Username: req.body.Username })
		.then((user) => {
			if (user) {
				return res.status(400).send(req.body.Username + ' already exists');
			} else {
				Users.create({
					Username:req.body.Username,
					Password: hashedPassword,
					Email: req.body.Email,
					Birthday: req.body.Birthday
				}) 
				.then((user) => {res.status(201).json(user) })
			.catch((error) => {
				console.error(error);
				res.status(500).send('Error: ' + error);
			 })
			}
		  })
		  .catch((error) => {
			  console.error(error);
			  res.status(500).send('Error: ' + error);
		   });  
	
});

//delete a user by Username
app.delete('/users/:Username', passport.authenticate('jwt', { session: false}), (req, res) => {
	Users.findOneAndRemove({ Username: req.params.Username})
	.then((user) => {
		if(!user) {
			res.status(400).send(req.params.Username + ' was not found');
		} else {
			res.status(200).send(req.params.Username + ' was deleted.');
		}
	})
	.catch((err) => {
		console.error(err);
		res.status.status(500).send(' Error: ' + err);
	});
});

//Get all users
app.get('/users', passport.authenticate('jwt', { session: false}), (req, res) => {
	Users.find()
	.then((users) => {
		res.status(201).json(users);
	})
	.catch((error) => {
		console.error(err);
		res.status(500).send('Error: ' + err);
	});
});

//Get a user by username
app.get('/users/:Username', passport.authenticate('jwt', { session: false}), (req, res) => {
	Users.findOne({Username:req.params.Username})
		.then((user) => {
			res.json(user);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send('Error: ' + err);
		});
});

//Allow users to update their user info (username)
app.put('/users/:Username', passport.authenticate('jwt', { session: false}), (req, res) => {
	Users.findOneAndUpdate({ Username: req.params.Username},
		{$set:
			{ Username: req.body.Username,
			  Password: req.body.Password,
			  Email: req.body.Email,
			  Birthday: req.body.Birthday
			}
		},
		{ new: true},
		(err, updatedUser) => {
			if(err) {
				console.error(err);
		                res.status(500).send('Error: ' + err);
			} else {
				res.json(updatedUser);
			}
		});
});

//Add a movie to a user's list of favorites
app.post('/users/:Username/Movies/:MovieID', passport.authenticate('jwt', { session: false}), (req, res) => {
	Users.findOneAndUpdate({Username: req.params.Username},
		{ $addToSet: { FavoriteMovies: req.params.MovieID} },
		{new: true},
		(err, updatedUser) => {
			if (err) {
				console.error(err);
				res.status(500).send('Error: ' + err);
			} else {
				res.json(updatedUser);
			}
		});
});


//Remove a movie from a user's list of favorites
app.delete('/users/:Username/Movies/:MovieID', passport.authenticate('jwt', { session: false}), (req, res) => {
	Users.findOneAndUpdate({Username: req.params.Username},
       		 { $pull: { FavoriteMovies: req.params.MovieID} },
                 {new: true},
                 (err, updatedUser) => {
                        if (err) {
	                        console.error(err);
	                        res.status(500).send('Error: ' + err);
			} else {											                                res.json(updatedUser);
	                }
	        });
});

//get the starting request
app.get('/', passport.authenticate('jwt', { session: false}), (req, res) => {
	res.send('Welcome to myFlex movies!');
});



//logs into the Terminal
app.use(morgan('common'));

//Error-handling middleware
app.use((err, req, res, next) => {
	        console.log(err.stack);
	        res.status(500).send('Somthing broke!');
});

//Listen for requests 
app.listen(8080, () => {
	console.log('Your app is listening on port 8080.');
});
