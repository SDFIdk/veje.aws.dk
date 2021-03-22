"use strict";

var express = require('express')
  , rp= require('request-promise');

var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  console.log('get /');
  res.sendFile(__dirname + "/public/index.html", function (err) {
    if (err) {
      console.log(err);
      res.status(404).end();
    }
    else {
      console.log('Sent: index.html');
    }
  });
});

app.get('/oisbygninger', function (req, res, next) {
  if (!req.query.format ||  !req.query.x || !req.query.y || !req.query.medtagugyldige) {
    res.status(400).send('mangler queryparametre');
    return;
  } 
  var options= {};
  options.url='https://api.dataforsyningen.dk/ois/bygninger';
  options.qs= {};
  options.qs.format= req.query.format;
  options.qs .x= req.query.x;
  options.qs.y= req.query.y;
  options.qs.medtagugyldige= req.query.medtagugyldige;
  //options.resolveWithFullResponse= true; 
  rp(options).then((body) => {    
    console.log('oisbygninger: %s, %d', body, body.length);
    res.writeHead(200, {'content-type': 'application/json; charset=UTF-8'});
    res.end(body);
  })
  .catch((err) => {
    res.status(500).send('fejl i request af OIS bygninger: ' + err);
  });
});

var port = process.argv[4];

if (!port) port= 3000;

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('URL http://%s:%s', host, port);
});