const express = require('express');
const app = express();
const path = require('path');
var nforce = require('nforce');

var org = nforce.createConnection({
  clientId: 'SOME_OAUTH_CLIENT_ID',
  clientSecret: 'SOME_OAUTH_CLIENT_SECRET',
  redirectUri: 'http://localhost:3000/oauth/_callback',
  apiVersion: 'v27.0',  // optional, defaults to current salesforce API version
  environment: 'production',  // optional, salesforce 'sandbox' or 'production', production default
  mode: 'multi' // optional, 'single' or 'multi' user mode, multi default
});

app.use('/', express.static(__dirname +  '/'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

const hostname = '187.189.191.102';
const port = 80;

const server = app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);  
});