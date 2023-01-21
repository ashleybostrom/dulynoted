//Import
const fs= require('fs');
const path = require('path');
const uuid = require('uuid');
let noteList = require('../db/db.json');

//Routing
module.exports = (app) => {

    app.post('/api/notes', (req, res) => {
        
        let newNote = req.body;
        console.log(req.body);
        newNote.id = uuid.v4();
        noteList.push(newNote);
        res.json(true);
        updateData();
        console.log("New note added!")
    });

    app.get('/api/notes', function (req, res) {
        console.log("Note list sent!")
        res.json(noteList);
    });

    app.delete('/api/notes/:id', function (req, res) {
        noteList = noteList.filter(({ id }) => id !== req.params.id);
        updateData();
        res.json(noteList);

    });

    function updateData() {
        fs.writeFileSync("./db/db.json", JSON.stringify(noteList), function (err) {
            if (err) throw err;
            });
    }
};