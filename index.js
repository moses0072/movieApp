//Import express and create the server
const express = require('express'),
	  morgan = require('morgan'),
	  bodyParser = require('body-parser');
	  
const app = express();

app.use(bodyParser.json());

let topMovies = [
	{		
		title: 'Harry Potter',
		genre: {
			name:''
		},
		director: {
			name:''
		}		
	},
	{
		title: 'The Matrix',
		genre: { 
			name: 'Science fiction'
		},
		director: {
			name: 'Lana and Lilly Wachowski, the sisters born on 1965 and 1967, are american film and television directors, writers and producers.'
		}
	},
	{
		title: 'Mission Imposible',
		genre: {
			name:'',
		},
		director: {
			name:'',
		},

	},
	{
		title: 'Heat',
		genre: 'crime',
		director: {
			name: 'Michael Mann was born on 1943 in Chicago. He is an American director, screenwriter and producer of film and television who is best known for his distinctive brand of stylized crime drama' 
		},
	},
	{
		title: 'Bad boys',
		genre: {
			name:''
		},
		director: {
			name:''
		}
	},
	{
		title: 'Avengers',
		genre: {
			name:''
		},
		director: {
			name:''
		}
	},
	{
		title: 'Iron Man',
		genre: {
			name:''
		},
		director: {
			name:''
		}
	},
	{
		title: 'Spiderman',
		genre: {
			name:''
		},
		director: {
			name:''
		}
	},
	{
		title: 'Man of steel',
		genre: {
			name:''
		},
		director: {
			name:''
		}
	},
	{
		title: 'Batman',
		genre: {
			name:''
		},
		director: {
			name:''
		}
	},
	{
		title: 'Lonly Ranger',
		genre: {
			name:''
		},
		director: {
			name:''
		}
	},
	{
		title: 'Night at the museum',
		genre: {
			name:''
		},
		director: {
			name:''
		}
	},
	{
		title: 'Forest Gump',
		genre: {
			name:''
		},
		director: {
			name:''
		}
	}

];

//Get the documentation
app.use(express.static('public'));
app.get('/documentation', (req, res) => {
	        res.sendFile('public/documentation.html', {root: __dirname});
});


//get all the movies 
app.get('/movies', (req, res) => {
	res.json(topMovies);
});


//get a movie title
app.get('movies/:title', (req, res) => {
	res.json(topMovies.find((movie) =>
		{return movie.title === req.params.title}));
});

//Add data for a new film
app.post('/movies', (req, res) => {
	let newMovie = req.body;
	if (!newMovie.title) {
		const message = 'Missing movie title in the request body';
		res.status(400).send(message);
	} else {
		movies.push(newMovie);
		res.status(201).send(newMovie);
	}
});

//Deletes a movie from the List
app.delete('/movies/:title', (req, res) => {
	let movie = topMovies.find((movie) => {return movie.title === req.params.title});
	if (movie) {
		movies = topMovies.filter((obj) => {return obj.title !== req.params.title});
		res.status(201).send('Movie ' + req.params.title + ' was deleted.');
	}
});




//get the starting request
app.get('/', (req, res) => {
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



