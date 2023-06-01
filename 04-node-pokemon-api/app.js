const express = require("express"); // recherche dépendance express
const morgan = require("morgan"); // import du package Morgan (suivi log des requetes HTTP status code etc...)
const favicon = require("serve-favicon"); // import du package favicon
const bodyParser = require("body-parser"); //import package body parser (stringify des res JSON)
const sequelize = require("./src/db/sequelize");

// Setup Express
const app = express(); // création server express
const port = 3000; // définition du port sur lequel toune l'app

// Middleswares combinés
app.use(favicon(__dirname + "/favicon.ico"))
    .use(morgan("dev"))
    .use(bodyParser.json()); // à placer en haut du fichier poour etre actif sur toutes les fonctions appelées ensuite

sequelize.initDb();

// Mise en place écoute serveur sur port définit et log du ${port} :
app.listen(port, () => console.log(`Application Node démarrée sur http://localhost:${port}/...`)); // démarrage api rest sur port 3000 et renvoi du log
