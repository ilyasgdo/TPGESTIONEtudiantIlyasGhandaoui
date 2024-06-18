const mongoose = require('mongoose');

const enseignantSchema = new mongoose.Schema({
    CodeEns: Number, // Définir le type comme Number pour un entier
    NomEns: String,
    PrenomEns: String,
    GradeEns: String,
    CodeMat: String
});

module.exports = mongoose.model('Enseignants', enseignantSchema);