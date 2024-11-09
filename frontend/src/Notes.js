import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Notes.css';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [editableNoteId, setEditableNoteId] = useState(null);
  const [editableNote, setEditableNote] = useState({
    username: '',
    note: '',
    department: '',
    class: ''
  });

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

  const handleEditClick = (note) => {
    setEditableNoteId(note.id);
    setEditableNote(note);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableNote(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSaveClick = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editableNote)
      });

      if (response.ok) {
        setNotes(notes.map(note => (note.id === id ? editableNote : note)));
        setEditableNoteId(null);
      } else {
        console.error('Erreur lors de la mise à jour de la note:', response.statusText);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la note:', error);
    }
  };

  return (
    <div className="container gradient-purple-blue">
      <div className="menu" id="menu">
        <li><Link to="/AddNoteForm">ADD NOTES</Link></li>
        <li><Link to="/Notes">VIEW NOTES</Link></li>
        <li><Link to="/AdminGestionEtudiant">MANAGE STUDENT</Link></li>
        <li><Link to="/Reception">RECEPTION</Link></li>
        <li><Link to="/AdminProfile">PROFILE</Link></li>
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {notes.map(note => (
                <tr key={note.id}>
                  {editableNoteId === note.id ? (
                    <>
                      <td><input type="text" name="username" value={editableNote.username} onChange={handleInputChange} /></td>
                      <td><input type="text" name="department" value={editableNote.department} onChange={handleInputChange} /></td>
                      <td><input type="text" name="class" value={editableNote.class} onChange={handleInputChange} /></td>
                      <td><input type="text" name="note" value={editableNote.note} onChange={handleInputChange} /></td>
                      <td>
                        <button class="button-65" onClick={() => handleSaveClick(note.id)}>Save</button>
                        <button class="button-67" onClick={() => setEditableNoteId(null)}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{note.username}</td>
                      <td>{note.department}</td>
                      <td>{note.class}</td>
                      <td>{note.note}</td>
                      <td><button class="button-64" onClick={() => handleEditClick(note)}>Edit</button></td>
                    </>
                  )}
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
