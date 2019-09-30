require('dotenv').config();

var fs = require("fs");
var request = require("request");
var axios = require("axios");
var figlet = require("figlet");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];

var userInput = process.argv.slice(3).join(" ");

var log_this = [];

var com;
var item;

function switchCom() {

    switch (command) {
        case "concert-this":
            concert(userInput);
            // log(log_this);
            break;
        case "spotify-this-song":
            spot(userInput);
            // log(log_this);
            break;
        case "movie-this":
            movie(userInput);
            // log(log_this);            
            break;
        case "do-what-it-says":
            doIt();
            // log(log_this);
            break;
    }
};

switchCom();


// concert
function concert() {

    var query = process.argv.slice(3).join("+");


    var queryURL = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp"
    console.log(queryURL);

    axios.get(queryURL).then(function (response) {
        console.log(response.tracks);
    })

    // request(queryURL, function (error, response, body) {

    //     if (!error && response.statusCode === 200) {

    //         var JS = JSON.parse(body);
    //         for (i = 0; i < JS.length; i++) {

    //         }
    //     }

    // })
};


// spotify
function spot() {
    var searchTrack;
    if (userInput === undefined) {
        searchTrack = "Ace of Base The Sign"
    }
    else {
        searchTrack = userInput;
    }
    spotify.search({
        type: 'track',
        query: searchTrack
    })
        .then(function (data) {
            var artistName = data.tracks.items[0].album.artists[0].name;
            var songName = searchTrack;
            var spotifyLink = data.tracks.items[0].album.artists[0].external_urls.spotify;
            var albumName = data.tracks.items[0].album.name;

            console.log("Song: ", songName);
            console.log("Artist: ", artistName);
            console.log("Album: ", albumName);
            console.log("Spotify Link: ", spotifyLink);

        });
};

// movie
function movie() {

};

// ??
function doIt() {

    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            console.log("Error: ", err);
            return;
        }

        var dataArr = data.split(",");

        com = dataArr[0];
        item = dataArr[1];

        console.log(com, item)

    })
    // console.log(com, item)

};

function write() {
    fs.writeFile("log.txt", log_this, function (err) {
        if (err) {
            console.log("error: ", err);
        }

        console.log("log.txt was updated!");

    })
};

