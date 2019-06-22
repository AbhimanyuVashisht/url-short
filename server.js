'use strict';

let express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    app = express();

require('./app/config/config');

let shortnerRouter = require('./app/routes/shortner');

// Server Port
const SERVER_PORT = process.env.PORT || 3000;
const SERVER_IP = '0.0.0.0';

// URL Encoded body parser
app.use(bodyParser.urlencoded({
    extended: true
}));
// JSON body parser
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/app/static')));


app.get('/ping', function (req, res) {
   return res.send('pong');
});

app.use('/api', shortnerRouter);

// Global error handler
app.use(function (err, req, res, next) {
    if (err) {
        console.log(new Date().toISOString(), err);
    }

    if (err.error) {
        return res.json(err);
    } else {
        let err = status.getStatus('generic_fail');
        return res.json(err);
    }
});

app.listen(SERVER_PORT, SERVER_IP, function () {
    console.log(`${new Date()}: Server running on port ${SERVER_PORT}...`);
});



