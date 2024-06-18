// models/Etudiant.js

const mongoose = require('mongoose');

const etudiantSchema = new mongoose.Schema({
    NumEtudiant: String,
    Nom: String,
    Prenom: String,
    DatenET: String
});

module.exports = mongoose.model('Etudiant', etudiantSchema);