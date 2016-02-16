var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var promise = require('promise');
var cors = require('cors');

var app = express();
app.use(express.static(__dirname + '/client'));
app.use(cors());

var port = Number(process.env.PORT) || 3000




app.listen(port);

var defaultCorsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

app.use(function(req, res, next){
 res.header('Access-Control-Allow-Origin', '*');
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});

app.use(bodyParser.json());

app.get('/', function(req, res){
  
})

app.post('/', function(req, res){
  var obj = req.body;
  var server = "https://data.usajobs.gov/api/jobs";
  request.get("https://data.usajobs.gov/api/jobs?Title="+req.body.title, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      data = data.JobData;
      res.send(data);
    }
  })
  // request({
  //   url: "https://data.usajobs.gov/api/jobs?Title="+req.body.title,
  //   method: 'GET',
  //   contentType: 'application/json'
  // }, function (error, response, body) {
  //   if (!error && response.statusCode == 200) {
      // var data = JSON.parse(body);
    // }
  // });  
})

app.post('/', function(req, res){
  var obj = req.body;
  var server = "https://data.usajobs.gov/api/jobs";
  request.get(server+"?Title="+req.body.title+'&NumberOfJobs=1', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      data = data.JobData;
      res.send(data);
    }
  })
})
