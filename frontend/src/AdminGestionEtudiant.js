import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminGestionEtudiant.css';

function AdminGestionEtudiant() {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editUserValues, setEditUserValues] = useState({ username: '', email: '', department: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3001/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error('Erreur lors de la récupération des utilisateurs');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    }
  };

  const handleEdit = (userId) => {
    const user = users.find((user) => user.id === userId);
    setEditUserValues({ username: user.username, email: user.email, department: user.department });
    setEditUserId(userId);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUserValues({ ...editUserValues, [name]: value });
  };

  const handleSave = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editUserValues)
      });
      if (response.ok) {
        console.log(`Enregistrement des modifications de l'utilisateur avec l'ID ${userId}`);
        setEditUserId(null);
        fetchUsers();
      } else {
        console.error('Erreur lors de la mise à jour de l\'utilisateur');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchUsers();
        console.log('Utilisateur supprimé avec succès');
      } else {
        console.error('Erreur lors de la suppression de l\'utilisateur');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    }
  };

  return (
    <div className="container gradient-purple-blue">
      <div className="under-container bubblee">
        <div className='liner'>
          <table className="notes-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Département</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{editUserId === user.id ? <input type="text" name="username" value={editUserValues.username} onChange={handleInputChange} /> : user.username}</td>
                  <td>{editUserId === user.id ? <input type="text" name="email" value={editUserValues.email} onChange={handleInputChange} /> : user.email}</td>
                  <td>{editUserId === user.id ? <input type="text" name="department" value={editUserValues.department} onChange={handleInputChange} /> : user.department}</td>
                  <td>
                    {editUserId === user.id ? (
                      <button className="button-66" onClick={() => handleSave(user.id)}>Enregistrer</button>
                    ) : (
                      <button className="button-66" onClick={() => handleEdit(user.id)}>Modifier</button>
                    )}
                    <button className="button-67" onClick={() => handleDelete(user.id)}>Supprimer</button>
                  </td>
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

export default AdminGestionEtudiant;
