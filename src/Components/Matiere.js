import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table } from 'react-bootstrap';

const Matiere = () => {
  const [matieres, setMatieres] = useState([]);
  const [nouvelleMatiere, setNouvelleMatiere] = useState({
    CodeMat: '',
    LibelleMat: '',
    CoefMat: ''
  });
  const [editingId, setEditingId] = useState(null); 

  const fetchMatieres = async () => {
    try {
      const response = await axios.get('/api/matieres');
      setMatieres(response.data);
    } catch (error) {
      console.error('Erreur récupération  matières:', error);
    }
  };

  useEffect(() => {
    fetchMatieres();
  }, []);

  const ajouterOuModifierMatiere = async () => {
    try {
      if (editingId) {
        await axios.put(`/api/matieres/${editingId}`, nouvelleMatiere);
        setEditingId(null); 
      } else {
        const response = await axios.post('/api/matieres', nouvelleMatiere);
        setMatieres([...matieres, response.data]);
      }
      setNouvelleMatiere({ CodeMat: '', LibelleMat: '', CoefMat: '' });
      fetchMatieres(); 
    } catch (error) {
      console.error('Erreur ajout modifi de la matière:', error);
    }
  };

  const supprimerMatiere = async (id) => {
    try {
      await axios.delete(`/api/matieres/${id}`);
      setMatieres(matieres.filter(matiere => matiere._id !== id));
    } catch (error) {
      console.error('Erreur  suppression  matière:', error);
    }
  };

  const modifierMatiere = (matiere) => {
    setEditingId(matiere._id);
    setNouvelleMatiere(matiere);
  };

  const handleChangement = event => {
    const { name, value } = event.target;
    setNouvelleMatiere({ ...nouvelleMatiere, [name]: value });
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

      <h2>Liste des matières</h2>
      <Table striped bordered hover>
        <thead className="thead-dark">
          <tr>
            <th>Code Matière</th>
            <th>Libellé Matière</th>
            <th>Coeficient</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {matieres.map(matiere => (
            <tr key={matiere._id}>
              <td>{matiere.CodeMat}</td>
              <td>{matiere.LibelleMat}</td>
              <td>{matiere.CoefMat}</td>
              <td>
                <button className="btn btn-danger mr-2" onClick={() => supprimerMatiere(matiere._id)}>Supprimer</button>
                <button className="btn btn-primary" onClick={() => modifierMatiere(matiere)}>Modifier</button>
              </td>
            </tr>
          ))}
          <tr>
            <td><input type="text" className="form-control" name="CodeMat" value={nouvelleMatiere.CodeMat} onChange={handleChangement} /></td>
            <td><input type="text" className="form-control" name="LibelleMat" value={nouvelleMatiere.LibelleMat} onChange={handleChangement} /></td>
            <td><input type="text" className="form-control" name="CoefMat" value={nouvelleMatiere.CoefMat} onChange={handleChangement} /></td>
            <td>
              <button className="btn btn-primary" onClick={ajouterOuModifierMatiere}>
                {editingId ? 'Modifier' : 'Ajouter'}
              </button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Matiere;
