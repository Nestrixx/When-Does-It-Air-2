require('es6-promise').polyfill();
require('isomorphic-fetch');
var data = require('./data.json');

var tolkin;
// this authenticates us and returns us a token
fetch("https://api.thetvdb.com/login", {
    method: 'POST',
    body: JSON.stringify({ "apikey": data.apiKey, "username": data.userName, "userkey": data.userKey }),
    headers: {
        'Content-Type': 'application/json', // content type is for the body if we don't have a body we don't need this. sad bones
        'Accept': 'application/json'
    }
}).then(res => res.json()) // after we have recieved a response it converts it to a json format
    .then(response => tolkin = response.token)  // logging out a response 
    .catch(error => console.error('Caught error:', error)); //catches any errors so if something goes wrong or fails this will run and logs out an error

setTimeout(function () {
    fetch('https://api.thetvdb.com/search/series?name=game%20of%20thrones', {
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + tolkin,
            'Accept': 'application/json'
        }
    }).then(function (response) { // THEN, when you have the data, format it to json
        return response.json();
    }).then(function (myJson) { // THEN log out the results
        console.log(myJson.data[0].overview);
    });
}, 1000);