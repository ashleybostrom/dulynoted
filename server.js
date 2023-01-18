// Dependencies
const express = require("express");
const fs = require("fs");
const path = require('path');

// Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);



// Listener
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});