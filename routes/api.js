//Requiring express and routes from notes

const express = require('express');

const notesRoute = require('./notes');

const app = express();

app.use('./notes', notesRoute);

module.exports = app;