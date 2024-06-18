// models/Matiere.js

const mongoose = require('mongoose');

const matiereSchema = new mongoose.Schema({
    CodeMat: String,
    LibelleMat: String,
    CoefMat: Number
});

module.exports = mongoose.model('Matiere', matiereSchema);
