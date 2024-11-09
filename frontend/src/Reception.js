import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Reception.css';

function Reception() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    fetchMessages();
  }, []);
  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:3001/messages');
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        console.error('Erreur lors de la récupération des messages');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des messages:', error);
    }
  };

  return (
    <div className="container gradient-purple-blue">
      <div className="under-container bubblee">
        <div className="liner">
          <table className="messages-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Sujet</th>
                <th>Message</th>
                <th>Date de création</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr key={message.id}>
                  <td>{message.email}</td>
                  <td>{message.subject}</td>
                  <td>{message.message}</td>
                  <td>{new Date(message.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="menu" id="menu">
        <li><Link to="/AddNoteForm">ADD NOTES</Link></li>
        <li><Link to="/Notes">VIEW NOTES</Link></li>
        <li><Link to="/AdminGestionEtudiant">MANAGE STUDENT</Link></li>
        <li><Link to="/Reception">RECEPTION</Link></li>
        <li><Link to="/AdminProfile">PROFILE</Link></li>
      </div>
      <div className="under-container bubble" style={{ height: '90vh' }}>
        <div className="line"></div>
      </div>
    </div>
  );
}

export default Reception;
