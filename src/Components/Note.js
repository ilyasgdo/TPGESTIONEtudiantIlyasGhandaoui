import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Note = () => {
  const [notes, setNotes] = useState([]);
  const [nouvelleNote, setNouvelleNote] = useState({
    Date: '',
    Note: '',
    NumEtudiant: '',
    CodeMat: ''
  });
  const [editingId, setEditingId] = useState(null); 

  const fetchNotes = async () => {
    try {
      const response = await axios.get('/api/notes');
      setNotes(response.data);
    } catch (error) {
      console.error('Erreur récup notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const ajouterOuModifierNote = async () => {
    try {
      if (editingId) {
        await axios.put(`/api/notes/${editingId}`, nouvelleNote);
        setEditingId(null); 
      } else {
        const response = await axios.post('/api/notes', nouvelleNote);
        setNotes([...notes, response.data]);
      }
      setNouvelleNote({ Date: '', Note: '', NumEtudiant: '', CodeMat: '' });
      fetchNotes(); 
    } catch (error) {
      console.error('Erreur ajout modification  note:', error);
    }
  };

  const supprimerNote = async (id) => {
    try {
      await axios.delete(`/api/notes/${id}`);
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error('Erreur suppression  note:', error);
    }
  };

  const modifierNote = (note) => {
    setEditingId(note._id);
    setNouvelleNote(note);
  };

  const handleChangement = event => {
    const { name, value } = event.target;
    setNouvelleNote({ ...nouvelleNote, [name]: value });
  };

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">Université IUT AMIENS</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Accueil</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/etudiants">Gestion des étudiants</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/enseignants">Gestion des enseignants</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/matiere">Gestion des matières</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/note">Gestion des notes</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <h2>Liste des notes</h2>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>Date</th>
            <th>Note</th>
            <th>Numéro Etudiant</th>
            <th>Code Matière</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {notes.map(note => (
            <tr key={note._id}>
              <td>{note.Date}</td>
              <td>{note.Note}</td>
              <td>{note.NumEtudiant}</td>
              <td>{note.CodeMat}</td>
              <td>
                <button className="btn btn-danger mr-2" onClick={() => supprimerNote(note._id)}>Supprimer</button>
                <button className="btn btn-primary" onClick={() => modifierNote(note)}>Modifier</button>
              </td>
            </tr>
          ))}
          <tr>
            <td><input type="text" className="form-control" name="Date" value={nouvelleNote.Date} onChange={handleChangement} /></td>
            <td><input type="text" className="form-control" name="Note" value={nouvelleNote.Note} onChange={handleChangement} /></td>
            <td><input type="text" className="form-control" name="NumEtudiant" value={nouvelleNote.NumEtudiant} onChange={handleChangement} /></td>
            <td><input type="text" className="form-control" name="CodeMat" value={nouvelleNote.CodeMat} onChange={handleChangement} /></td>
            <td>
              <button className="btn btn-primary" onClick={ajouterOuModifierNote}>
                {editingId ? 'Modifier' : 'Ajouter'}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Note;
