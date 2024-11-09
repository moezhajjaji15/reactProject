const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Importer le module fs pour le système de fichiers
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();
const port = 3001;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());
app.use(session({
  secret: 'votre_clé_secrète',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2d4b88bg', 
    database: 'user_auth'
});
db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
        return;
    }
    console.log('Connecté à la base de données MySQL');
});
app.post('/signup', (req, res) => {
  const { username, email, password, department, role, mobileNumber } = req.body;
  const query = 'INSERT INTO users (username, email, password, department, role, mobile_number) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [username, email, password, department, role, mobileNumber], (err, result) => {
      if (err) {
          console.error('Erreur lors de l\'insertion de l\'utilisateur:', err);
          res.status(500).send('Erreur du serveur');
          return;
      }
      req.session.user = { id: result.insertId, username, email, role };
      res.status(201).send('Utilisateur créé avec succès');
  });
});
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
      if (err) {
          console.error('Erreur lors de la récupération de l\'utilisateur:', err);
          res.status(500).send('Erreur du serveur');
          return;
      }
      if (results.length === 0) {
          res.status(401).send('Email ou mot de passe incorrect');
          return;
      }
      const user = results[0];
      if (password !== user.password) {
          res.status(401).send('Email ou mot de passe incorrect');
          return;
      }
      req.session.user = { id: user.id, username: user.username, email: user.email, role: user.role };
      res.status(200).json({ role: user.role });
  });
});
app.get('/checkSession', (req, res) => {
  if (req.session.user) {
      res.status(200).json({ user: req.session.user });
  } else {
      res.status(401).send('Non connecté');
  }
});
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Erreur lors de la déconnexion');
        }
        res.status(200).send('Déconnexion réussie');
    });
});
// Route pour ajouter une note
app.post('/add-note', (req, res) => {
  const { username, department, class: className, note } = req.body;
  const query = 'INSERT INTO notes (username, department, class, note) VALUES (?, ?, ?, ?)';
  db.query(query, [username, department, className, note], (err, result) => {
      if (err) {
          console.error('Erreur lors de l\'ajout de la note:', err);
          res.status(500).send('Erreur du serveur');
          return;
      }
      console.log('Note ajoutée avec succès');
      res.status(200).send('Note ajoutée avec succès');
  });
});
// Route pour récupérer toutes les notes
app.get('/Notes', (req, res) => {
  const query = 'SELECT * FROM notes';
  db.query(query, (err, results) => {
      if (err) {
          console.error('Erreur lors de la récupération des notes:', err);
          res.status(500).send('Erreur du serveur');
          return;
      }
      res.status(200).json(results);
  });
});
// Route pour mettre à jour une note
app.put('/notes/:id', (req, res) => {
  const { id } = req.params;
  const { username, note, department, class: className } = req.body;
  const query = 'UPDATE notes SET username = ?, note = ?, department = ?, class = ? WHERE id = ?';

  db.query(query, [username, note, department, className, id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la mise à jour de la note:', err);
      res.status(500).send('Erreur du serveur');
      return;
    }
    res.status(200).send('Note mise à jour avec succès');
  });
});
// Route pour récupérer tous les utilisateurs
app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des utilisateurs:', err);
      res.status(500).send('Erreur du serveur');
      return;
    }
    res.status(200).json(results);
  });
});
// Route pour supprimer un utilisateur
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', err);
      res.status(500).send('Erreur du serveur');
      return;
    }
    res.status(200).send('Utilisateur supprimé avec succès');
  });
});
// Route pour mettre à jour un utilisateur
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { username, email, department } = req.body;
  const query = 'UPDATE users SET username = ?, email = ?, department = ? WHERE id = ?';
  db.query(query, [username, email, department, userId], (err, result) => {
    if (err) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', err);
      res.status(500).send('Erreur du serveur');
    } else {
      res.status(200).send('Utilisateur mis à jour avec succès');
    }
  });
});
// Route pour gérer les messages de contact
app.post('/contact', (req, res) => {
  const { email, subject, message } = req.body;
  const query = 'INSERT INTO messages (email, subject, message) VALUES (?, ?, ?)';
  db.query(query, [email, subject, message], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion du message:', err);
      res.status(500).send('Erreur du serveur');
      return;
    }
    res.status(201).send('Message envoyé avec succès');
  });
});
// Route pour récupérer le profil de l'utilisateur connecté
app.get('/profile', (req, res) => {
  if (req.session.user) {
    const userId = req.session.user.id;
    const query = 'SELECT username, email, department, role FROM users WHERE id = ?';
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error('Erreur lors de la récupération du profil de l\'utilisateur:', err);
        res.status(500).send('Erreur du serveur');
        return;
      }
      if (results.length === 0) {
        res.status(404).send('Utilisateur introuvable');
        return;
      }
      const userProfile = results[0];
      res.status(200).json(userProfile);
    });
  } else {
    res.status(401).send('Non connecté');
  }
});
app.get('/messages', (req, res) => {
  const query = 'SELECT * FROM messages';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des messages:', err);
      res.status(500).send('Erreur du serveur');
      return;
    }
    res.status(200).json(results);
  });
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
