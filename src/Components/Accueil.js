import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';

const Accueil = () => {
  return (
    <div>
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

      <Container fluid className="mt-4">
        <Row className="justify-content-center">
          <Col>
            <h1 className="text-center">Accueil</h1>
            <h3 className="text-center">Bienvenue sur application de gestion de l'université</h3>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} sm={6}>
            <Card>
              <Card.Body>
                <h5>Informations</h5>
                <p>Email: email@iut.com</p> 
                <p>Téléphone: +33 6 62 67 89</p> 
                <p>Fax: +33 6 62 45 67 89</p> 
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card>
              <Card.Body>
                <h5>Description</h5>
                <p>Description de l'université...</p> 
                <Col>
          <Row>
            <ul >
                  <li >
                    <Link  to="/">Accueil</Link>
                  </li>
                  <li >
                    <Link  to="/etudiants">Gestion des étudiants</Link>
                  </li>
                  <li >
                    <Link  to="/enseignants">Gestion des enseignants</Link>
                  </li>
                  <li >
                    <Link  to="/matiere">Gestion des matières</Link>
                  </li>
                  <li >
                    <Link  to="/note">Gestion des notes</Link>
                  </li>
                </ul>
          </Row>
        </Col>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center bg-dark">
          <Col xs={12} sm={6}>
            <img src="img/logo-IUT-blanc.png" alt="logo" className="img-fluid mt-4" />
          </Col>
        </Row>
        
      </Container>
    </div>
  );
}

export default Accueil;
