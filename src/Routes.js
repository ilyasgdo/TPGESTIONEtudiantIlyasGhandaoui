import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Accueil from './Components/Accueil';
import Etudiants from './Components/Etudiants';
import Enseignants from './Components/Enseignants';
import Matiere from './Components/Matiere';
import Note from './Components/Note';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Accueil} />
        <Route path="/etudiants" component={Etudiants} />
        <Route path="/enseignants" component={Enseignants} />
        <Route path="/matiere" component={Matiere} />
        <Route path="/note" component={Note} />
      </Switch>
    </Router>
  );
}

export default Routes;
