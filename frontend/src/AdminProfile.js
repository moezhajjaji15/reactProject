import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

const AdminProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3001/profile', { withCredentials: true });
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération du profil:', error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="container">
      <div className="menu" id="menu">
      <li><Link to="/AddNoteForm">ADD NOTES</Link></li>
        <li><Link to="/Notes">VIEW NOTES</Link></li>
        <li><Link to="/AdminGestionEtudiant">MANAGE STUDENT</Link></li>
        <li><Link to="/Reception">RECEPTION</Link></li>
        <li><Link to="/AdminProfile">PROFILE</Link></li>
      </div>
      <div className="profile-container">
        {loading ? (
          <p>Chargement...</p>
        ) : userData ? (
          <>
            <div className="profile-info">
              <label>Nom d'utilisateur:</label>
              <p>{userData.username}</p>
            </div>
            <div className="profile-info">
              <label>Email:</label>
              <p>{userData.email}</p>
            </div>
            <div className="profile-info">
              <label>Département:</label>
              <p>{userData.department}</p>
            </div>
            <div className="profile-info">
              <label>Rôle:</label>
              <p>{userData.role}</p>
            </div>
          </>
        ) : (
          <p>Utilisateur non connecté</p>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
