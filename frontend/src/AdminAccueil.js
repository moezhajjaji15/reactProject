// AdminAccueil.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminAccueil.css';
import AddNoteForm from './AddNoteForm';
import AdminGestionEtudiant from './AdminGestionEtudiant';
import Notes from './Notes';

function AdminAccueil({ user }) {
  useEffect(() => {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
      square.addEventListener('mouseenter', function () {
        this.classList.add("rubberBand");
      });
      square.addEventListener('animationend', function () {
        this.classList.remove("rubberBand");
      });
    });
    return () => {
      squares.forEach(square => {
        square.removeEventListener('mouseenter', function () {
          this.classList.add("rubberBand");
        });
        square.removeEventListener('animationend', function () {
          this.classList.remove("rubberBand");
        });
      });
    };
  }, []);
  return (
    <div className="container gradient-purple-blue">
      <div className="menu" id="menu">
        {/* Utiliser Link pour naviguer vers AddNoteForm */}
        <li className="bt"><Link to="/AddNoteForm">ADD NOTES</Link></li>
        <li><Link to="/Notes">VIEW NOTES</Link></li>
        <li><Link to="/AdminGestionEtudiant">MANAGE STUDENT</Link> </li>
        <li><Link to="/Reception">RECEPTION</Link></li>
        <li><Link to="/AdminProfile">PROFILE</Link></li>
      </div>
      <div className="intro-section">
        <p>
        Bienvenue sur notre plateforme de gestion de notes et d'étudiants, conçue pour transformer et simplifier la gestion académique tout en renforçant la communication entre les administrateurs et les étudiants. En tant qu'administrateur, vous avez la possibilité d'ajouter, modifier et consulter les notes, ainsi que de gérer les comptes des étudiants en mettant à jour leurs informations personnelles et académiques. Vous pouvez également recevoir et répondre directement aux messages des étudiants via une interface intuitive et sécurisée. Notre mission est de créer un environnement éducatif moderne et efficace, assurant la transparence et la confidentialité des données grâce à des protocoles de sécurité avancés. Nous nous engageons à fournir une solution complète qui facilite vos tâches quotidiennes et améliore l'expérience globale des utilisateurs. Pour toute question ou assistance, notre équipe de support dédiée est toujours prête à vous aider. Ensemble, nous pouvons établir un cadre académique transparent et performant, propice à la réussite de tous nos étudiants.        </p>
      </div>
      <div className="under-container bubble" style={{ height: '90vh' }}>
        <div className="linee">
        </div>
        <div className="linee">     
        </div>
      </div>
    </div>
  );
}
export default AdminAccueil;
