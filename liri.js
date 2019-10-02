// link to updated portfolio https://larkiningram.github.io/Portfolio/portfolio.html

require('dotenv').config();

var fs = require("fs");
var axios = require("axios");

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var userInput = process.argv.slice(3).join(" ");

var log_this = [];

////////////////////////////////////////////////////////////////////////

//concert vars
var queryConcert = process.argv.slice(3).join(" ");

//movie vars
var movieName = process.argv.slice(3).join("+");

//do it vars 
var com;
var item;

////////////////////////////////////////////////////////////////////////

function switchCom() {

    switch (command) {
        case "concert-this":
            concert(userInput);
            write(log_this);
            break;
        case "spotify-this-song":
            spot(userInput);
            write(log_this);
            break;
        case "movie-this":
            movie(userInput);
            write(log_this);
            break;
        case "do-what-it-says":
            doIt();
            break;
    }
};

switchCom();

////////////////////////////////////////////////////////////////////////

// concert -- done
function concert() {

    var queryURL = "https://rest.bandsintown.com/artists/" + queryConcert + "/events?app_id=codingbootcamp"
    console.log(queryURL);

    axios.get(queryURL).then(function (response) {

        var artist = (response.data[0].lineup[0]);
        var venueName = response.data[0].venue.name;
        var venueLocation = (response.data[0].venue.city + ",", response.data[0].venue.country);
        var year = (response.data[0].datetime.slice(0, 4));
        var month = (response.data[0].datetime.slice(5, 7));
        var day = (response.data[0].datetime.slice(8, 10));
        var date = month + "/" + day + "/" + year;

        console.log(artist, "Concert Information:");
        console.log("Venue Name:", venueName);
        console.log("Venue Loctation:", venueLocation);
        console.log("Concert Date:", date);
    })

    log_this.push([command, queryConcert]);
    return log_this;
};


// spotify -- done
function spot() {

    if ((!userInput) && (process.argv.length === 3)) {
        userInput = "Ace of Base The Sign"
    }

    spotify.search({
        type: 'track',
        query: userInput
    }).then(function (data) {
        var artistArr = data.tracks.items[0].album.artists
        var arr = [];

        for (i in artistArr) {
            arr.push(artistArr[i].name);
            var artistName = arr.join(", ")
        }

        var songName = data.tracks.items[0].name;
        var spotifyLink = data.tracks.items[0].album.artists[0].external_urls.spotify;
        var spotifyLink = data.tracks.items[0].preview_url;
        var albumName = data.tracks.items[0].album.name;

        console.log("Song:", songName);
        console.log("Artist:", artistName);
        console.log("Album:", albumName);
        console.log("Spotify Link:", spotifyLink);
    });

    log_this.push([command, userInput]);
    return log_this;
};

// movie -- done
function movie() {

    if ((!movieName) && (process.argv.length === 3)) {
        movieName = "Mr. Nobody"
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(function (response) {

        var title = response.data.Title;
        var year = response.data.Year;
        var imdbRating = response.data.Ratings[0].Value;
        var tomatoesRating = response.data.Ratings[1].Value;
        var country = response.data.Country;
        var language = response.data.Language;
        var plot = response.data.Plot;
        var actors = response.data.Actors;

        console.log("Title:", title);
        console.log("Released:", year);
        console.log("IMDB Rating:", imdbRating);
        console.log("Rotten Tomatoes Rating:", tomatoesRating);
        console.log("Country:", country);
        console.log("Language:", language);
        console.log("Plot:", plot);
        console.log("Actors:", actors);
    })

    log_this.push([command, movieName]);
    return log_this
};

// ?? -- done
function doIt() {

    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            console.log("Error: ", err);
            return;
        }

        var dataArr = data.split(",");
        var empty = [];
        empty.push(dataArr[0], dataArr[1]);

        com = empty[0];
        item = empty[1];


        if (com === "concert-this") {
            queryConcert = item;
            concert(item);
        }
        else if (com === "spotify-this-song") {
            spot();
        }
        else if (com === "movie-this") {
            movieName = item;
            movie(item);
        }

    })

};

//append function
function write() {
    fs.appendFile("log.txt", "," + log_this, function (err) {
        if (err) {
            console.log("error: ", err);
        }
    });
};