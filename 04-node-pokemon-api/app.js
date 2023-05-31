const express = require("express"); // recherche dépendance express
const pokemons = require("./mock-pokemon");
const app = express(); // création server express
const port = 3000; // définition du port sur lequel toune l'app

app.get("/", (req, res) => res.send("Hello, Express"));

// Profil pokemon selon id parametre
app.get(`/api/pokemons/:id`, (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find((pokemon) => pokemon.id === id);
    res.send(`Hello, vous avez demandé le pokémon ${pokemon.name}`);
});

// Synthèse Nbre pokemons :
app.get("/api/pokemons", (req, res) => {
    res.send(`Il y a ${pokemons.length} pokémons dans le pokédex, pour le moment.`);
});

app.listen(port, () => console.log(`Application Node démarrée sur port ${port}...`)); // démarrage api rest sur port 3000 et renvoi du log
