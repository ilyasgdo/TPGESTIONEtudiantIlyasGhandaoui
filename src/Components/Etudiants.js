import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Etudiants = () => {
  const [etudiants, setEtudiants] = useState([]);
  const [nouvelEtudiant, setNouvelEtudiant] = useState({
    NumEtudiant: '',
    Nom: '',
    Prenom: '',
    DatenET: ''
  });
  const [editingId, setEditingId] = useState(null); 

  const fetchEtudiants = async () => {
    try {
      const response = await axios.get('/api/etudiants');
      setEtudiants(response.data);
    } catch (error) {
      console.error('Erreur récupération étudiants', error);
    }
  };

  useEffect(() => {
    fetchEtudiants();
  }, []);

  const ajouterOuModifierEtudiant = async () => {
    try {
      if (editingId) {
        await axios.put(`/api/etudiants/${editingId}`, nouvelEtudiant);
        setEditingId(null); 
      } else {
        const response = await axios.post('/api/etudiants', nouvelEtudiant);
        setEtudiants([...etudiants, response.data]);
      }
      setNouvelEtudiant({ NumEtudiant: '', Nom: '', Prenom: '', DatenET: '' });
      window.location.reload();
    } catch (error) {
      console.error('Erreur lors ajout  modification étudiant:', error);
    }
  };

  const supprimerEtudiant = async (id) => {
    try {
      await axios.delete(`/api/etudiants/${id}`);
      setEtudiants(etudiants.filter(etudiant => etudiant._id !== id));
    } catch (error) {
      console.error('Erreur  suppression étudiant:', error);
    }
  };

  const modifierEtudiant = (etudiant) => {
    setEditingId(etudiant._id);
    setNouvelEtudiant(etudiant);
  };

  const handleChangement = event => {
    const { name, value } = event.target;
    setNouvelEtudiant({ ...nouvelEtudiant, [name]: value });
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
      <h2>Liste des étudiants</h2>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>Numéro Etudiant</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Date de Naissance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {etudiants.map(etudiant => (
            <tr key={etudiant._id}>
              <td>{etudiant.NumEtudiant}</td>
              <td>{etudiant.Nom}</td>
              <td>{etudiant.Prenom}</td>
              <td>{etudiant.DatenET}</td>
              <td>
                <button className="btn btn-danger mr-2" onClick={() => supprimerEtudiant(etudiant._id)}>Supprimer</button>
                <button className="btn btn-primary" onClick={() => modifierEtudiant(etudiant)}>Modifier</button>
              </td>
            </tr>
          ))}
          <tr>
            <td><input type="text" className="form-control" name="NumEtudiant" value={nouvelEtudiant.NumEtudiant} onChange={handleChangement} /></td>
            <td><input type="text" className="form-control" name="Nom" value={nouvelEtudiant.Nom} onChange={handleChangement} /></td>
            <td><input type="text" className="form-control" name="Prenom" value={nouvelEtudiant.Prenom} onChange={handleChangement} /></td>
            <td><input type="text" className="form-control" name="DatenET" value={nouvelEtudiant.DatenET} onChange={handleChangement} /></td>
            <td>
              <button className="btn btn-primary" onClick={ajouterOuModifierEtudiant}>
                {editingId ? 'Modifier' : 'Ajouter'}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Etudiants;
