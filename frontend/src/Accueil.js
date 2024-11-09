// src/Accueil.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminAccueil from './AdminAccueil';
import EtudiantAccueil from './EtudiantAccueil';

function Accueil() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost:3001/checkSession', {
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de la session:', error);
        navigate('/login');
      }
    };
    checkSession();
  }, [navigate]);
  if (!user) {
    return <p>Chargement...</p>;
  }
  return user.role === 'admin' ? (
    <AdminAccueil user={user} />
  ) : (
    <EtudiantAccueil user={user} />
  );
}
export default Accueil;
