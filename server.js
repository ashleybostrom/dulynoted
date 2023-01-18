// Dependencies
const express = require("express");
const path = require('path');
const api = require('./routes/apiRoutes');
const notes = require('./routes/htmlRoutes');
const PORT = process.env.PORT || 3001;

// Express app
const app = express();


// Data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/api', api);

// Routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});



// Listener
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});