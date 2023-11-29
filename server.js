// Importation des modules
const express = require('express');
const path = require('path');

// Création  de l'application 
const app = express();

// Définition du port 
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

// Middleware : Vérification des heures d'ouverture (du lundi au vendredi, de 7h à 17h UTC)
app.use((req, res, next) => {
  const now = new Date();
  const utcHours = now.getUTCHours();

  // Si le jour est compris entre lundi (1) et vendredi (5) et l'heure est entre 7h et 17h UTC, passe au middleware suivant
  if (now.getUTCDay() >= 1 && now.getUTCDay() <= 5 && utcHours >= 7 && utcHours < 17) {
    next();
  } else {
    // Sinon, envoie la page 'closed.html'
    res.sendFile(path.join(__dirname, 'closed.html'));
  }
});

// Route  Page d'accueil
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route Page du menu
app.get('/menu', (req, res) => {
  res.sendFile(path.join(__dirname, 'services.html'));
});

// Route  Page de contact
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'contact.html'));
});

// Démarrage du serveur et écoute sur le port spécifié
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
