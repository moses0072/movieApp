//Import express and create the server
const express = require('express'),
	  morgan = require('morgan'),
	  bodyParser = require('body-parser');
const { parse } = require('uuid');
	  
const app = express();

app.use(bodyParser.json());

let topMovies = [
	{		
		title: 'Harry Potter',
		description:'Harry Potter is a film series based on the eponymous novels by J. K. Rowling. The series is distributed by Warner Bros. and consists of eight fantasy films',
		genre: 'fantasy',
		director: {
			name:'Chris Joseph Columbus',
			bio:' born on 1958. Columbus was born in Spangler, Pennsylvania and raised in Champion, Ohio, the only child born to Mary Irene (née Puskar), a factory worker, and Alex Michael Columbus, an aluminum plant worker and coal miner.[2][3] He is of Italian and Czech descent.[4] As a child, he enjoyed drawing storyboards and began making 8mm films in high school'
		}		
	},
	{
		title: 'The Matrix',
		description:'a 1999 science fiction film about a computer hacker, Neo, played by Keanu Reeves, who discovers that the world he is living in is part of a computer program called The Matrix. He joins a group of people who are trying to fight against those controlling the Matrix. The film uses many new special effects, for which it won four Oscars.',
		genre:'Science fiction',
		director: {
			name: 'Lana and Lilly Wachowski', 
			bio: 'the sisters born on 1965 and 1967, are american film and television directors, writers and producers.'
		}
	},
	{
		title: 'Mission Imposible',
		description:'is a series of American action spy films based on and a follow-on from the television series of the same name created by Bruce Geller. The series is mainly produced by and stars Tom Cruise, whose character is Ethan Hunt, an agent of the Impossible Missions Force',
		genre: 'Action',
		director: {
			name:'Brian De Palma', 
			bio: 'Born 1940. He is an American film director and screenwriter. With a career spanning over 50 years, he is best known for his work in the suspense, crime and psychological thriller genres.'
		},

	},
	{
		title: 'Heat',
		description:'',
		genre: 'crime',
		director: {
			name: 'Michael Mann', 
			bio: 'was born on 1943 in Chicago. He is an American director, screenwriter and producer of film and television who is best known for his distinctive brand of stylized crime drama'
		},
	},
	{
		title: 'Bad boys',
		description:'When the drug investigation turns deadly, the murderers kidnap the only witness - a beautiful police informant (Tea Leoni) and close friend of the Boys - and things get personal! Fast cars, a gorgeous woman and non-stop action make Bad Boys a guaranteed good time!',
		genre:'Action', 
			
		director: {
			name:'Michael Bay',
			bio: ' born in 1965.He is an American film director and producer. He is best known for making big-budget, high-concept action films characterized by fast cutting, stylistic cinematography and visuals, and extensive use of special effects, including frequent depictions of explosions.'
		}
	},
	{
		title: 'Avengers',
		description:'The director of the agency S.H.I.E.L.D., Nick Fury, sets in motion project Avengers, joining Tony Stark a.k.a. the Iron Man; Steve Rogers, a.k.a. Captain America; Bruce Banner, a.k.a. The Hulk; Thor; Natasha Romanoff, a.k.a. Black Widow; and Clint Barton, a.k.a. Hawkeye, to save the world from the powerful Loki and the alien invasion.',
		genre: 'superhero',
			
		director: {
			name:'Joss Whedon',
			bio: 'born in 1964. He is an American film director, producer, writer, and composer. He is the founder of Mutant Enemy Productions, he co-founded Bellwether Pictures, and is best known as the creator of several television series.'
		}
	},
	{
		title: 'Iron Man',
		description:'Iron Man is a 2008 superhero film, based on the Marvel Comics superhero of the same name. It is the first installment in the Marvel Cinematic Universe and the first installment of Phase One.',
		genre: 'Superhero',
			
		director: {
			name:'Jonathan Kolia Favreau',
			bio:'born in 1966. He is an American actor, director, producer, and screenwriter.'
		}
	},
	{
		title: 'Man of steel',
		description:'A Kryptonian sent by his parents to Earth as an infant to escape the destruction of his homeworld, Krypton,',
		genre: 'superhero',
		director: {
			name:'Zachary Edward Snyder',
			bio: 'born in 1966. He is an American film director, producer, and screenwriter. He made his feature film debut in 2004 with a remake of the 1978 horror film Dawn of the Dead. Since then, he has directed or produced a number of comic book and superhero films'
		}
	},
	{
		title: 'Batman',
		description:'Batman is the superhero protector of Gotham City, a tortured, brooding vigilante dressed as a sort of human bat who fights against evil and strikes fear into the hearts of criminals everywhere. In his public identity he is Bruce Wayne, billionaire industrialist and notorious playboy.',
		genre: 'superhero',
		director: {
			name:'Christopher Edward Nolan',
			bio: 'born in 1970. He is a British-American film director, producer, and screenwriter. His directorial efforts have grossed more than US$5 billion worldwide, garnered 36 Oscar nominations and ten wins.'
		}
	},
	
	{
		title: 'Forest Gump',
		description:'The movie Forrest Gump follows the life events of a man who shares the name as the title of the film. Gump faces many tribulations throughout his life, but he never lets any of them interfere with his happiness.',
		genre: 'Drama',
		director: {
			name:'Robert Lee Zemeckis',
			bio: 'born in 1952. He is an American film director, film producer, and screenwriter who is frequently credited as an innovator in visual effects. He first came to public attention in the 1980s as the director of Romancing the Stone (1984) and the science-fiction comedy Back to the Future film trilogy, as well as the live-action/animated comedy Who Framed Roger Rabbit (1988).'
		}
	}

];

//Get the documentation
app.use(express.static('public'));
app.get('/documentation', (req, res) => {
	        res.sendFile('public/documentation.html', {root: __dirname});
});


//Return a list of ALL movies to the user 
app.get('/movies', (req, res) => {
	res.json(topMovies);
});


//Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
app.get('/movies/:title', (req, res) => {
	res.json(topMovies.find((movie) =>
		{return movie.title === req.params.title}));
});

//Return data about a genre (description) by name/title (e.g., “Thriller”)
/*app.get('/movie/:genre/', (req, res) => {
	res.json(topMovie.find((movie) =>
	{return movie.genre === req.params.genre}));
});*/

// EndPoint 3 - Return data about a gender (description) by name/title (e.g., "Thriller")
app.get('/movies/:genre', (req, res) => {
	res.json('Successful GET request returning data on all the genres of the movie');
  });

//Return data about a director (bio, birth year, death year) by name
app.get('/movies/:director/:name', (req, res) => {
	res.send('Successful GET request returning data information about the director');
  });

//Allow users to add a movie to their list of favorites (showing only a text that a movie has been added
app.post('/movies/', (req, res) => {
	let newMovie = req.body;
	if (!newMovie.title) {
		const message = 'Missing movie title in the request body';
		res.status(400).send(message);
	} else {
		topMovies.push(newMovie);
		res.status(201).send(newMovie);
	}
});

//Allow users to remove a movie from their list of favorites (showing only a text that a movie has been removed
app.delete('/movies/:title', (req, res) => {
	let movie = topMovies.find((movie) => {return movie.title === req.params.title});
	if (movie) {
		movies = topMovies.filter((obj) => {return obj.title !== req.params.title});
		res.status(201).send('Movie ' + req.params.title + ' was deleted.');
		
	}
});

// Allow new users to register
app.post('/users', (req, res) => {
	res.send('Successful POST request returning data on new User');
});

//Allow users to update their user info (username)
app.put('/users/:username', (req, res) => {
		res.status(201).send('user has changed his name');	
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



