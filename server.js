var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var promise = require('promise');
var cors = require('cors');

var app = express();
app.use(cors());
app.use(express.static(__dirname + '/image'));
app.use(express.static(__dirname + '/Client'));


var port = Number(process.env.PORT) || 3000

app.listen(port);

app.use(function(req, res, next){
 res.header('Access-Control-Allow-Origin', '*');
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});

app.use(bodyParser.json());

app.post('/jobsearch', function(req, res){
  var obj = req.body;
  var server = "https://data.usajobs.gov/api/jobs?";
  if(obj.location!=undefined){
    location = "&LocationName="+req.body.location
  }else{
    location = ""
  }
  request.get(server+"Title="+req.body.title+location, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      data = data.JobData;
      res.send(data);
    }
  })
})

app.post('/compare', function(req, res){
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
