const notes = require('express').Router();
const { readFromFile, readAndAppend, readAndRemove, getUniqueUuid } = require('../assets/js/utils');
const uuid = require('../assets/js/uuid');

const noteFile = './db/db.json';

notes.route('/')
    .get((req, res) => {
        readFromFile(noteFile).then((data) => res.json(JSON.parse(data)));
    })
    .post((req, res) => {
        if (req.body) {
            const { title, text } = req.body;
            const newNote = {
                title,
                text,
                id: getUniqueUuid(noteFile)
            };
            readAndAppend(newNote, noteFile);
            res.json(newNote);
        }
    });

notes.route('/:id')
    .delete((req, res) => {
        readAndRemove(req.params.id, noteFile);
        res.json('deleted');
    })

module.exports = notes;