
// Bring in required modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// intitialize body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


