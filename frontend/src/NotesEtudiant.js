import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Notes.css';

function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('http://localhost:3001/notes');
        if (response.ok) {
          const data = await response.json();
          setNotes(data);
        } else {
          console.error('Erreur lors de la récupération des notes:', response.statusText);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des notes:', error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="container gradient-purple-blue">
      <div className="menu" id="menu">
        <li><Link to="/NotesEtudiant">VIEW NOTES</Link></li>
        <li><Link to="/Contact">CONTACT</Link></li>
        <li><Link to="/Profile">PROFILE</Link></li>
      </div>
      <div className="under-container bubble">
        <div className="line">
          <table className="notes-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Département</th>
                <th>Classe</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {notes.map((note, index) => (
                <tr key={index}>
                  <td>{note.username}</td>
                  <td>{note.department}</td>
                  <td>{note.class}</td>
                  <td>{note.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Notes;
