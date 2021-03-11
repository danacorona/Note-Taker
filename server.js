// Dependencies
const express = require('express');
const app = express();
const fs = require('fs');
const db = require('./db/db.json');
const path = require('path');
const Store = require('./db/store.js');

// Setting the PORT
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const notes = [];


// API Routes
app.get('/api/notes', (req, res) => {
  Store.getNotes().then((notes) => res.json(notes)).catch((err) => res.status(500).json(err));
});
// for the post
// Store.addNote(req.body)
app.post('/api/notes', (req, res) => {
  console.log(req.body);
  Store.addNote(req.body).then((notes) => res.json(notes)).catch((err) => res.status(500).json(err));
});
// for delete /:id
// Store.removeNote(req.params.body)
// app.delete('/api/notes/:id', (req, res) => {
//   Store.removeNote(req.params.body).then((notes) => res.json(notes)).catch((err) => res.status(500).json(err));
// });

//html routes
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '/public/index.html')));


//Set up the listener
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
  });
  