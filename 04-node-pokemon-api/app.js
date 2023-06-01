const express = require("express"); // recherche dépendance express
const { success, getUniqueId } = require("./helper"); // appel méthodes success dans helper (gestion success et error)
const morgan = require("morgan"); // import du package Morgan (suivi log des requetes HTTP status code etc...)
const favicon = require("serve-favicon"); // import du package favicon
const bodyParser = require("body-parser"); //import package body parser (stringify des res JSON)
let pokemons = require("./mock-pokemon");
const app = express(); // création server express
const port = 3000; // définition du port sur lequel toune l'app

// middleware d'application logg method path IP: et remplacé par middleware Morgan
// app.use(function middleware(req, res, next) {
//     const { method, url, ip } = req;
//     console.log(method + " : " + url + " - " + ip);
//     next();
// });
// Middleswares combinés
app.use(favicon(__dirname + "/favicon.ico"))
    .use(morgan("dev"))
    .use(bodyParser.json()); // à placer en haut du fichier poour etre actif sur toutes les fonctions appelées ensuite

// info page home :
app.get("/", (req, res) => res.send("Hello, Express"));

// Profil pokemon selon id parametre :
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

// Post new pokemon - parse des infos body avec body parser - middleware
app.post("/api/pokemons", (req, res) => {
    const id = getUniqueId(pokemons);
    const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } };
    pokemons.push(pokemonCreated);
    const message = `Le pokemon ${pokemonCreated.name} a bien été créé.`;
    res.json(success(message, pokemonCreated));
});

// Put pokemon - modification
app.put("/api/pokemons/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const pokemonUpdated = { ...req.body, id: id };
    pokemons = pokemons.map((pokemon) => {
        return pokemon.id === id ? pokemonUpdated : pokemon;
    });
    const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié.`;
    res.json(success(message, pokemonUpdated));
});

// DELETE pokemon :
app.delete("/api/pokemons/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const pokemonDeleted = pokemons.find((pokemon) => pokemon.id === id);
    pokemons.filter((pokemon) => pokemon.id !== id);
    const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`;
    res.json(success(message, pokemonDeleted));
});

// Mise en place écoute serveur sur port définit et log du ${port} :
app.listen(port, () => console.log(`Application Node démarrée sur http://localhost:${port}/...`)); // démarrage api rest sur port 3000 et renvoi du log
