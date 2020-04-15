


//Install express server
const express = require('express');
const path = require('path');
const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/client'));

app.get('/*', function (req, res) {
    const fullPath = path.join(__dirname + '/dist/client/index.html');
    console.log(" Fetching from.." + fullPath);
    res.sendFile(fullPath);
})

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);