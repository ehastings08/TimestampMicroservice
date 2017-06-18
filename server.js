// init project
var express = require('express');
var moment = require('moment');
var app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.send('<p>Add a date to the URL!</p>')
});

app.get('/:input', function (req, res) {
    var input = req.params.input;
    var valid_date = moment(req.params.input).isValid();
    var unix = 0;
    var moment_date = '';
    var formatted_moment_date = '';
    
    if (valid_date) {
        // Check to see if the input is an integer, and thus a unix timestamp
        if (!(isNaN(input))) {
           unix = input;
           moment_date = moment.unix(unix);
           formatted_moment_date = moment_date.format("MMMM D, YYYY");
        } else {
           moment_date = moment(req.params.input);
           formatted_moment_date = moment_date.format("MMMM D, YYYY");
           unix = moment_date.unix();
        }
        res.send({'unix': unix, 'formatted_moment_date': formatted_moment_date});
    } else {
        moment_date = moment(req.params.input); // Returns null if not valid
        formatted_moment_date = moment_date.format("MMMM D, YYYY");
        res.send({'unix': null, 'formatted_moment_date': null});
    }
});

// listen for requests
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
