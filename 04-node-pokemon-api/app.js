const express = require("express"); // recherche dépendance express
const { success } = require("./helper"); // appel méthodes success dans helper (gestion success et error)
const morgan = require("morgan"); // import du package Morgan (suivi log des requetes HTTP)
const favicon = require("serve-favicon"); // import du package favicon
const pokemons = require("./mock-pokemon");
const app = express(); // création server express
const port = 3000; // définition du port sur lequel toune l'app

// middleware d'application logg method path IP: et remplacé par middleware Morgan
// app.use(function middleware(req, res, next) {
//     const { method, url, ip } = req;
//     console.log(method + " : " + url + " - " + ip);
//     next();
// });
// Middleswares combinés
app.use(favicon(__dirname + "/favicon.ico")).use(morgan("dev")); // à placer en haut du fichier poour etre actif sur toutes les fonctions appelées ensuite

// info page home :
app.get("/", (req, res) => res.send("Hello, Express"));

// Profil pokemon selon id parametre
app.get(`/api/pokemons/:id`, (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find((pokemon) => pokemon.id === id);
    const message = "un pokémon a été trouvé.";
    res.json(success(message, pokemon));
});

// Synthèse Nbre pokemons :
app.get("/api/pokemons", (req, res) => {
    const message = "La liste complète des pokémons a bien été récupérée.";
    res.json(success(message, pokemons));
});
// Mise en place écoute serveur sur port définit et log du ${port} :
app.listen(port, () => console.log(`Application Node démarrée sur http://localhost:${port}/...`)); // démarrage api rest sur port 3000 et renvoi du log
