// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminAccueil from './AdminAccueil';
import AddNoteForm from './AddNoteForm';
import AdminGestionEtudiant from './AdminGestionEtudiant';
import NotesEtudiant from './NotesEtudiant';
import Contact from './Contact'; 
import Profile from './Profile';
import AdminProfile from './AdminProfile';
import Notes from './Notes';
import SignUp from './SignUp';
import Login from './Login';
import Accueil from './Accueil';
import Reception from './Reception';

import './App.css';

function App() {
  const [userRole, setUserRole] = useState('');

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login setUserRole={setUserRole} />}
        />
        <Route path="/signup" element={<SignUp />} />
        {userRole ? (
          <>
            <Route path="/accueil" element={<Accueil />} />
            <Route path="/admin" element={<AdminAccueil />} />
            <Route path="/AddNoteForm" element={<AddNoteForm />} />
            <Route path="/Notes" element={<Notes />} />
            <Route path="/NotesEtudiant" element={<NotesEtudiant />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/AdminProfile" element={<AdminProfile />} />
            <Route path="/Reception" element={<Reception />} />
            <Route path="/AdminGestionEtudiant" element={<AdminGestionEtudiant />} />

            <Route path="/" element={<Navigate to="/accueil" />} />
          </>
        ) : (
          <Route path="/" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
