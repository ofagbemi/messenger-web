require('dotenv').load();
const fs = require('fs');
const http = require('http');
const express = require('express');
const { promisify } = require('util');
const exphbs = require('express-handlebars');


const readFileAsync = promisify(fs.readFile);

const app = express();

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
}));
app.set('view engine', '.hbs');

app.use('/public', express.static('public'));

app.get('*', async (req, res) => {
  const webpackStats = JSON.parse(await readFileAsync('./webpack-stats.json'));
  const values = Object.assign({ API_URL: process.env.API_URL }, webpackStats);
  res.render('index', values);
});

const port = Number(process.env.PORT || 5000);
const server = http.createServer(app).listen(port, () => {
  const addr = server.address();
  console.log(`Listening at port ${addr.port}`);
});
