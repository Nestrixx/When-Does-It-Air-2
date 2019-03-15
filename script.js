/*
    Objective 3/14/2019: Get a authentication token from the tvdb using FETCH
*/

require('es6-promise').polyfill();
require('isomorphic-fetch');
var data = require('./data.json');

var url = 'https://api.thetvdb.com/login';

fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json' // tells api that we are sending JSON data. Sad Bones.
    }
}).then(rawResponse => rawResponse.json())
    .then(response => console.log('Success:', response))