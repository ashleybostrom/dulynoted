// Dependencies
const express = require("express");
const fs = require("fs");
const path = require('path');
const PORT = process.env.PORT || 3001;

// Express app
const app = express();


// Data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes
require('./routes/api')(app);
require('./routes/notes')(app);



// Listener
app.listen(PORT, function () {
    console.log(`App listening on PORT: ${PORT}`);
});