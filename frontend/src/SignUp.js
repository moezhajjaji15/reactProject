import React, { useState } from 'react';
import './SignUp.css';

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    department: '',
    role: '',
    mobileNumber: ''
  });
  const [message, setMessage] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'inscription');
      }
      const data = await response.json();
      setMessage('Inscription réussie !'); // Affiche le message de succès
    } catch (error) {
      setMessage('Inscription réussie !'); // Affiche le message d'erreur
      console.error('Erreur lors de l\'inscription:', error);
    }
  };
  // Fonction pour rediriger vers la page de login
  const redirectToLogin = () => {
    window.location.href = '/login';
  };
  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Department:
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value=""></option>
              <option value="Informatique">Informatique</option>
              <option value="Électrique">Électrique</option>
              <option value="Mécanique">Mécanique</option>
              <option value="Management">Management</option>
              <option value="Autre">Autre</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Role:
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value=""></option>
              <option value="admin">admin</option>
              <option value="etudiant">etudiant</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Mobile Number:
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit" class="button-63" role="button">SIGNUP</button>
        {message && <p>{message}</p>} {/* Affiche le message */}
        <p>Already have an account? <span className="link" onClick={redirectToLogin}>Login</span></p> {/* Texte de lien pour rediriger vers la page de login */}
      </form>
    </div>
  );
}

export default SignUp;
