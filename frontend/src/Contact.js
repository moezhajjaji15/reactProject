import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

function Contact() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, subject, message })
      });

      if (response.ok) {
        alert('Message envoyé avec succès');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        throw new Error('Erreur lors de l\'envoi du message');
      }
    } catch (error) {
      console.error(error);
      alert('Erreur lors de l\'envoi du message');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container gradient-purple-blue">
      <div className="menu" id="menu">
        <li><Link to="/NotesEtudiant">VIEW NOTES</Link></li>
        <li><Link to="/contact">CONTACT</Link></li>
        <li><Link to="/Profile">PROFILE</Link></li>
      </div>
      
      <div className="transparent-frame"> {/* Cadre transparent */}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Objet:</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Message:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="message-field" // Ajout de la classe pour le style du champ de message
              required
            />
          </div>
          <button className="button-63" type="submit" disabled={isLoading}>
            {isLoading ? 'Envoi en cours...' : 'Envoyer'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
