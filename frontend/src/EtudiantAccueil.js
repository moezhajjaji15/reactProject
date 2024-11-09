// AdminAccueil.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminAccueil.css';

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
        <li><Link to="/NotesEtudiant">VIEW NOTES</Link></li>
        <li><Link to="/contact">CONTACT</Link></li>
        <li><Link to="/Profile">PROFILE</Link></li>
      </div>
      <div className="intro-section">
        <p>
        Bienvenue sur la page "À Propos" dédiée aux étudiants de notre plateforme de gestion de notes. Ici, vous trouverez toutes les informations essentielles sur notre outil conçu pour simplifier votre parcours académique. Notre plateforme vous permet de consulter facilement les notes ajoutées par les administrateurs sans possibilité de les modifier, assurant ainsi une transparence totale sur vos résultats académiques. Vous avez également accès à une fonctionnalité de contact pour envoyer des messages directement à l'administration, facilitant la communication pour toute question ou préoccupation que vous pourriez avoir. Nous sommes déterminés à vous offrir une expérience utilisateur enrichissante et à vous soutenir tout au long de votre parcours éducatif.</p>
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
