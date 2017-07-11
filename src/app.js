// Electron imports.
import os from 'os';
import { remote } from 'electron';
import jetpack from 'fs-jetpack';
import env from './env';
import request from 'request';
import { capitalize } from './utils/utils.js';


// Electron init.
var app = remote.app;
var appDir = jetpack.cwd(app.getAppPath());

// Start all the custom middleware chunkies,
// we're gonna need to make some GET request.
var request = require('request');

// This will grab the JSON from the remote server,
// options like the user-agent can be set here. It
// is then turned to callback for future use.
function getStatistics(callback) {
  var options = {
    // The person that made steamstat.us is a fucking god.
    // I wish him well and he made this project a piece of cake.
    // url: 'https://api.myjson.com/bins/te1ur',
    url: 'https://crowbar.steamstat.us/Barney',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.85 Safari/537.36'
    }
  };
  // Examine the similarities between the request
  // and callback they will work with the next function;
  // which is displayStatistics.
  request(options,function(error,response,body) {
    callback(error,response,body);
  });
}

// This will grab the JSON data from the last function,
// utilizing callbacks it turns it into a var (data).
// From there we could call specific pieces of the JSON,
// and inject it into the HTML elements.

function displayStatistics() {
  getStatistics(function(error,response,body) {
    var data = JSON.parse(response.body,null,2);
    // Inject data into their proper elements.
    // These will load AFTER the JSON is loaded.

    // Individual steam services.
    document.getElementById('percent-online').innerHTML = data.services.cms.title.toString();
    document.getElementById('player-steam').innerHTML = data.services.online.title.toString();

    if(data.online > 90) {
      document.getElementById('percent-online').style.color = 'GREEN';
    };

    if(data.online < 89 && data.online > 50) {
      document.getElementById('percent-online').style.color = 'YELLOW';
    };

    if(data.online < 49) {
      document.getElementById('percent-online').style.color = 'RED';
      document.getElementById('percent-online').innerHTML = 'WTF GABE';
    };

    // Individual games and their services.
    document.getElementById('status-csgo').innerHTML = capitalize(data.services.csgo.title.toString());
    document.getElementById('status-tf2').innerHTML = capitalize(data.services.tf2.title.toString());
    document.getElementById('status-dota2').innerHTML = capitalize(data.services.dota2.title.toString());

    var timestring = (new Date().getHours() % 12 || 12) + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
    document.getElementById("countdown").innerHTML = "Last: " + timestring;
  });
};

// My simple request loop for displaying the statistics,
// it runs every 30 seconds currently
var interval = 30000;

var requestLoop = setInterval(function(){
  displayStatistics();
}, interval);

// Run the request loop.
requestLoop;

// These will happen on LOAD.
// Return the data that we got from our functions in the view.
document.addEventListener('DOMContentLoaded', function () {
  displayStatistics();
});
