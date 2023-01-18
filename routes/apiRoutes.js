//Requiring express and routes from htmlRoutes

const express = require('express');

const notesRoute = require('./htmlRoutes');

const app = express();

app.use('/htmlRoutes', notesRoute);

module.exports = app;