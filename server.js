//Import the Module of url, http, and fs
const url = require('url'),
	http = require('http'),
	fs = require('fs');

//create the Server and parse the url
http.createServer((request, response) => {
	let addr = request.url,
	 q = url.parse(addr, true),
	 filePath = '';

// Check whether the url contain "documentation"
	if (q.pathname.includes('documentation')) {
		filePath =(__dirname + '/documentation.html');
	} else {
		filePath = 'index.html';
	}

//Create a log file
fs.appendFile('log.txt', 'URL: ' + addr + '\n TimeStamp: ' + new Date() + '\n\n', (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log('Added to log');
	}
});
	fs.readFile(filePath, (err, data) => {
		if (err) {
			throw err;
		}
    	
        response.writeHead(200, {'Content-Type': 'text/html'});
	response.write(data);
        response.end();
});
}).listen(8080);

console.log('My first Node test server is running on Port 8080.');
