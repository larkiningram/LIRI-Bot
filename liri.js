require('dotenv').config();

var fs = require("fs");

var request = require("request");

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];

var userInput = process.argv[3];
// console.log(userInput);

function switchCom() {

    switch (command) {
        case "concert-this":
            concert(userInput);
            break;
        case "spotify-this-song":
            spot(userInput);
            break;
        case "movie-this":
            movie(userInput);
            break;
        case "do-what-it-says":
            // do what it says i guess
            break;
    }
};

switchCom();


// concert
function concert() {

    if (process.argv.length === 4) {
        var query = userInput;
    }
    else if (process.argv.length > 4) {
        var artist = [];
        for (var i = 3; i < process.argv.length; i++) {
            artist.push(process.argv[i])
        }
        var query = artist.join("+");
    }

    var queryURL = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp"
    console.log(queryURL);

    // request(queryURL, function (error, response, body) {
        
    //     if (!error && response.statusCode === 200) {

    //         var JS = JSON.parse(body);
    //         for (i = 0; i < JS.length; i++) {
    //             var dateTime = JS[i].datetime;
    //             var month = dateTime.substring(5, 7);
    //             var year = dateTime.substring(0, 4);
    //             var day = dateTime.substring(8, 10);
    //             var dateForm = month + "/" + day + "/" + year;
    //         }
    //     }

    // })
}


// spotify
function spot() {
    var searchTrack;
    if (userInput === undefined) {
        searchTrack = "Ace of Base The Sign"
    }
    else {
        searchTrack = userInput;
    }
    console.log(searchTrack);
    spotify.search({
            type: 'track',
            query: searchTrack
        })
        .then(function (error, data) {
            if (error) {
                console.log("Error: ", error);
                return;
            }
            else {
                console.log(data);
            }
        });
}

// movie
function movie() {

}

// ??
function doIt() {

}


