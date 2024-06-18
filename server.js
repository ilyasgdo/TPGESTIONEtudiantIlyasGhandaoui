// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Etudiant = require('./models/Etudiant');
const Enseignant = require('./models/Enseignants');

const Matiere = require('./models/Matiere');
const Note = require('./models/Note');
const path = require('path');


const app = express();

app.use(express.static(path.join(__dirname, 'build')));


app.use(bodyParser.json());
app.use(cors());

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/mon-universiteDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB:'));
db.once('open', () => console.log('Connecté à MongoDB'));

app.use(express.static(path.join(__dirname, 'public')));


// Route pour récupérer et afficher tous les étudiants
app.get('/api/etudiants', async (req, res) => {
    try {
        const etudiants = await Etudiant.find();
        res.json(etudiants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route pour ajouter un nouvel étudiant
app.post('/api/etudiants', async (req, res) => {
    const etudiant = new Etudiant({
        NumEtudiant: req.body.NumEtudiant,
        Nom: req.body.Nom,
        Prenom: req.body.Prenom,
        DatenET: req.body.DatenET
    });

    try {
        const nouveauEtudiant = await etudiant.save();
        res.status(201).json(nouveauEtudiant);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route pour mettre à jour un étudiant existant
app.put('/api/etudiants/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const etudiant = await Etudiant.findByIdAndUpdate(id, req.body, { new: true });
        res.json(etudiant);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route pour supprimer un étudiant existant
app.delete('/api/etudiants/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Etudiant.findByIdAndDelete(id);
        res.json({ message: 'Étudiant supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



/////////////////////////////////////enseignat!!!!!!///////////////////////////////////
// Route pour récupérer et afficher tous les enseignants
app.get('/api/enseignants', async (req, res) => {
    try {
        const enseignants = await Enseignant.find();
        res.json(enseignants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route pour ajouter un nouvel enseignant
app.post('/api/enseignants', async (req, res) => {
    const enseignant = new Enseignant({
        CodeEns: req.body.CodeEns,
        NomEns: req.body.NomEns,
        PrenomEns: req.body.PrenomEns,
        GradeEns: req.body.GradeEns,
        CodeMat: req.body.CodeMat
    });

    try {
        const nouveauEnseignant = await enseignant.save();
        res.status(201).json(nouveauEnseignant);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route pour mettre à jour un enseignant existant
app.put('/api/enseignants/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const enseignant = await Enseignant.findByIdAndUpdate(id, req.body, { new: true });
        res.json(enseignant);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route pour supprimer un enseignant existant
app.delete('/api/enseignants/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Enseignant.findByIdAndDelete(id);
        res.json({ message: 'Enseignant supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/////////////////////////////////////matiere!!!!!!///////////////////////////////////
// Route pour récupérer et afficher toutes les matières
app.get('/api/matieres', async (req, res) => {
    try {
        const matieres = await Matiere.find();
        res.json(matieres);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route pour ajouter une nouvelle matière
app.post('/api/matieres', async (req, res) => {
    const matiere = new Matiere({
        CodeMat: req.body.CodeMat,
        LibelleMat: req.body.LibelleMat,
        CoefMat: req.body.CoefMat
    });

    try {
        const nouvelleMatiere = await matiere.save();
        res.status(201).json(nouvelleMatiere);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route pour mettre à jour une matière existante
app.put('/api/matieres/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const matiere = await Matiere.findByIdAndUpdate(id, req.body, { new: true });
        res.json(matiere);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route pour supprimer une matière existante
app.delete('/api/matieres/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Matiere.findByIdAndDelete(id);
        res.json({ message: 'Matière supprimée avec succès' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/////////////////////////////////////note!!!!!!///////////////////////////////////
// Route pour récupérer et afficher toutes les notes
app.get('/api/notes', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Route pour ajouter une nouvelle note
app.post('/api/notes', async (req, res) => {
    const note = new Note({
        NumEtudiant: req.body.NumEtudiant,
        CodeMat: req.body.CodeMat,
        Note: req.body.Note,
        Date: req.body.Date
    });

    try {
        const nouvelleNote = await note.save();
        res.status(201).json(nouvelleNote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route pour mettre à jour une note existante
app.put('/api/notes/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const note = await Note.findByIdAndUpdate(id, req.body, { new: true });
        res.json(note);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route pour supprimer une note existante
app.delete('/api/notes/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Note.findByIdAndDelete(id);
        res.json({ message: 'Note supprimée avec succès' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route pour récupérer et afficher les noms des collections disponibles dans la base de données
app.get('/api/tables', async (req, res) => {
    try {
        const collections = await mongoose.connection.db.collections();
        const collectionNames = collections.map(collection => collection.collectionName);
        res.json(collectionNames);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
  


// Démarrer le serveur
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
