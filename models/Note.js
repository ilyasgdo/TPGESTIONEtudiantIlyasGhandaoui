// models/Note.js

const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    NumEtudiant: String,
    CodeMat: String,
    Note: Number,
    Date: String
});

module.exports = mongoose.model('Notes', noteSchema);
