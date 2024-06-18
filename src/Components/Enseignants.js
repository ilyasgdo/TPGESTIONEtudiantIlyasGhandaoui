import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Enseignants = () => {
  const [enseignants, setEnseignants] = useState([]);
  const [nouvelEnseignant, setNouvelEnseignant] = useState({
    CodeEns: '',
    NomEns: '',
    PrenomEns: '',
    GradeEns: '',
    CodeMat: ''
  });
  const [editingId, setEditingId] = useState(null); 

  const fetchEnseignants = async () => {
    try {
      const response = await axios.get('/api/enseignants');
      setEnseignants(response.data);
    } catch (error) {
      console.error('Erreu récupération enseignants', error);
    }
  };

  useEffect(() => {
    fetchEnseignants();
  }, []);

  const ajouterOuModifierEnseignant = async () => {
    try {
      if (editingId) {
        
        await axios.put(`/api/enseignants/${editingId}`, nouvelEnseignant);
        setEditingId(null); 
      } else {
        
        const response = await axios.post('/api/enseignants', nouvelEnseignant);
        setEnseignants([...enseignants, response.data]);
      }
      setNouvelEnseignant({ CodeEns: '', NomEns: '', PrenomEns: '', GradeEns: '', CodeMat: '' });
      fetchEnseignants(); 
    } catch (error) {
      console.error('Erreu ou modification de lenseignant:', error);
    }
  };

  const supprimerEnseignant = async (id) => {
    try {
      await axios.delete(`/api/enseignants/${id}`);
      setEnseignants(enseignants.filter(enseignant => enseignant._id !== id));
    } catch (error) {
      console.error('Err suppression enseignant:', error);
    }
  };

  const modifierEnseignant = (enseignant) => {
    setEditingId(enseignant._id);
    setNouvelEnseignant(enseignant);
  };

  const handleChangement = event => {
    const { name, value } = event.target;
    setNouvelEnseignant({ ...nouvelEnseignant, [name]: value });
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

      <h2>Liste des enseignants</h2>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>Code Enseignant</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Grade</th>
            <th>Code Matière</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {enseignants.map(enseignant => (
            <tr key={enseignant._id}>
              <td>{enseignant.CodeEns}</td>
              <td>{enseignant.NomEns}</td>
              <td>{enseignant.PrenomEns}</td>
              <td>{enseignant.GradeEns}</td>
              <td>{enseignant.CodeMat}</td>
              <td>
                <button className="btn btn-danger mr-2" onClick={() => supprimerEnseignant(enseignant._id)}>Supprimer</button>
                <button className="btn btn-primary" onClick={() => modifierEnseignant(enseignant)}>Modifier</button>
              </td>
            </tr>
          ))}
          <tr>
            <td><input type="text" className="form-control" name="CodeEns" value={nouvelEnseignant.CodeEns} onChange={handleChangement} /></td>
            <td><input type="text" className="form-control" name="NomEns" value={nouvelEnseignant.NomEns} onChange={handleChangement} /></td>
            <td><input type="text" className="form-control" name="PrenomEns" value={nouvelEnseignant.PrenomEns} onChange={handleChangement} /></td>
            <td><input type="text" className="form-control" name="GradeEns" value={nouvelEnseignant.GradeEns} onChange={handleChangement} /></td>
            <td><input type="text" className="form-control" name="CodeMat" value={nouvelEnseignant.CodeMat} onChange={handleChangement} /></td>
            <td>
              <button className="btn btn-primary" onClick={ajouterOuModifierEnseignant}>
                {editingId ? 'Modifier' : 'Ajouter'}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Enseignants;
