const rp = require('request-promise');

rp('https://api.chucknorris.io/jokes/random')
    .then(function ($) {
       console.log(JSON.parse($).value)
    });