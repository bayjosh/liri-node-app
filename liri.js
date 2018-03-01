//Package requires and global variables
require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs")
var request = require('request');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var input = process.argv[2];


if (input === "movie-this") {

    var movieWordsArr = process.argv
    var movieTitle = "";

    if (movieWordsArr.length === 3) {
        movieTitle = "Mr. Nobody"
        console.log("\nYou didn't enter a film, silly! Here's one you may like:")
    }

    for (var i = 3; i < movieWordsArr.length; i++) {

        if (i > 3) {
            movieTitle += "+" + movieWordsArr[i];
        } else {
            movieTitle += "" + movieWordsArr[i];
        }
    }

    // console.log(movieTitle);

    var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";

    // console.log(queryUrl);

    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {

            var movieResponse = JSON.parse(body)

            console.log("\nYour Movie Info");
            console.log("------------------------------");
            console.log("Title: " + movieResponse.Title);
            console.log("Released: " + movieResponse.Year);
            console.log("IMDB Rating: " + movieResponse.imdbRating);
            console.log("Tomato-meter: " + movieResponse.Ratings[1].Value);
            console.log("Country: " + movieResponse.Country);
            console.log("Language: " + movieResponse.Language);
            console.log("Plot Summary: " + movieResponse.Plot);
            console.log("Featured Cast: " + movieResponse.Actors + "\n");

        } else if (error) {
            console.log(error);
        }
    })
}

if (input === "spotify-this-song") {

    var songWordsArr = process.argv
    var songTitle = "";

    if (songWordsArr.length === 3) {
        songTitle = "The Sign Ace of Base"
        console.log("\nYou didn't enter a song, silly! Here's one you may like:")
    }

    for (var i = 3; i < songWordsArr.length; i++) {

        if (i > 3) {
            songTitle += "+" + songWordsArr[i];
        } else {
            songTitle += "" + songWordsArr[i];
        }
    }

    spotify.search({ type: 'track', query: "" + songTitle, limit: 1 }, function (err, data) {

        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("\nYour Song Info:");
        console.log("-----------------------");
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song: '" + data.tracks.items[0].name + "'");
        console.log("Preview link: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name + "\n");
    });
}

if (input === "my-tweets") {

    var params = { screen_name: 'joshthecoder123' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {

            console.log("\nLast 20 Tweets");
            console.log("----------------");
            for (var i = 0; i < 20; i++) {
                console.log("Most recent tweet #" + (i + 1) + ": '" + tweets[i].text + "'");

            }
            console.log("\n")
        }
    });
}

if (input === "do-what-it-says") {

    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            console.log(err);
        } else {
            var inputArr = data.split(",");
            input = inputArr[0];
        }
        if (input === "spotify-this-song") {
            var songTitle = inputArr[1];
            // console.log("songTitle: " + songTitle)

            if (songTitle === undefined) {
                songTitle = "The Sign Ace of Base"
                console.log("\nYou didn't enter a song, silly! Here's one you may like:")
            }

            spotify.search({ type: 'track', query: "" + songTitle, limit: 1 }, function (err, data) {

                if (err) {
                    return console.log('Error occurred: ' + err);
                }

                console.log("\nYour Song Info:");
                console.log("-----------------------");
                console.log("Artist: " + data.tracks.items[0].artists[0].name);
                console.log("Song: '" + data.tracks.items[0].name + "'");
                console.log("Preview link: " + data.tracks.items[0].preview_url);
                console.log("Album: " + data.tracks.items[0].album.name + "\n");

            });

        }
    })
}
