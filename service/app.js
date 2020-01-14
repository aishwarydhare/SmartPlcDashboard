const express = require('express');
const fs = require('fs');
const moment = require('moment');
const readline = require('readline');
const deepmerge = require('deepmerge');

const FILE_PATH = 'data.json';
const DEFAULT_FILE_PATH = 'default_data.json';

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(function (req, res, next) {
	var data = new Buffer('');
	res.header("Access-Control-Allow-Origin", req.headers.origin); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	req.on('data', function (chunk) {
		data = Buffer.concat([data, chunk]);
	});
	req.on('end', function () {
		req.rawBody = data;
		next();
	});
});

app.get('/api/upload', function (request, response) {
	try {
		fs.writeFile(FILE_PATH, JSON.stringify(request.query), 'binary', function (err) {
			if (err) {
				throw err;
			} else {
				response.statusCode = 200;
				response.json({"status": "ok"}).end();
				return 0;
			}
		});
	} catch (err) {
		console.log(err);
	}
});

app.get('/api/download', function (request, response) {
	try {
		let rlDefault = readline.createInterface({
			input: fs.createReadStream(DEFAULT_FILE_PATH)});
		let resultDefaultString = "";
		rlDefault.on('line', (line) => {
			resultDefaultString += line;
		});
		rlDefault.on('close', async () => {
			resultDefaultString = JSON.parse(resultDefaultString);
			// store the incoming log in a tmp file
			let rl = readline
				.createInterface({input:
						fs.createReadStream(FILE_PATH)});
			let resultString = "";
			rl.on('line', (line) => {
				resultString += line;
			});
			rl.on('close', async () => {
				resultString = JSON.parse(resultString);

				let res = deepmerge(resultDefaultString, resultString);
				response.statusCode = 200;
				response.json(res).end();
				return 0;
			});
		});
	} catch (err) {
		console.log(err);
	}
});


async function init() {
	const host = "127.0.0.1";
	const port = 8002;
	app.listen(port, host, function () {
		console.log("Node-Server Started on:", host + ":" + port);
	});
}

init();
