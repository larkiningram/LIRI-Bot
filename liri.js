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
            write(log_this);
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

    var query = process.argv.slice(3).join("%20");


    var queryURL = "https://rest.bandsintown.com/artists/"  + query + "/events?app_id=codingbootcamp"
    console.log(queryURL);

    axios.get(queryURL).then(function (response) {

        var venueName = response.data[0].venue.name;
        var venueLocation = (response.data[0].venue.city + ",", response.data[0].venue.country);
        var year = (response.data[0].datetime.slice(0,4));
        var month = (response.data[0].datetime.slice(5,7));
        var day = (response.data[0].datetime.slice(8,10));
        var date = month + "/" + day + "/" + year;

        console.log("Venue Name: ", venueName);
        console.log("Venue Loctation: ", venueLocation);
        console.log("Concert Date: ", date);
    })
};


// spotify -- done
function spot() {
    var searchTrack;
    
    if (process.argv.length === 3) {
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

            log_this.push([command, songName]);
            console.log(log_this);
            return log_this
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
    console.log(log_this)
    fs.writeFile("log.txt", log_this, function (err) {
        if (err) {
            console.log("error: ", err);
        }

        console.log("log.txt was updated!");

    })
};