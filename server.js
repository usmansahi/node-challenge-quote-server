// const { response } = require('express');
// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require('express');
const app = express();
const lodash = require('lodash');
//load the quotes JSON
const quotes = require('./quotes.json');
// const cors = require('cors');
// app.use(cors());

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get('/', function (request, response) {
  response.send(quotes);
});

//START OF YOUR CODE...
app.get('/qoutes/', (request, response) => {
  response.send(quotes);
});
app.get('/qoutes/random', function (request, response) {
  response.send(lodash.sample(quotes));
  // response.send(pickFromArray(quotes));
});

app.get('/qoutes/search', (request, response) => {
  let term = request.query.term;
  if (term) {
    term = term.toLowerCase();
  }
  let filterquotes = quotes.filter((element) => {
    return element.quote.includes(term) || element.author.includes(term);
  });
  if (filterquotes.length == 0) {
    response.status(404).send(filterquotes);
  }
  response.send(filterquotes);
});
//...END OF YOUR CODE..

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
// function pickFromArray(arr) {
//   return arr[Math.floor(Math.random() * arr.length)];
// }

//Start our server so that it listens for HTTP requests!
let port = 5000;

app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
