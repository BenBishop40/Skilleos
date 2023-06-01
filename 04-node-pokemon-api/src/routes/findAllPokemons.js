const { Pokemon } = require("../db/sequelize"); // import du m
// Module endpoint avec méhtode findAll propre à sequelize
module.exports = (app) => {
    app.get("/api/pokemons", (req, res) => {
        Pokemon.findAll().then((pokemons) => {
            const message = "La liste des pokémons a bien été récupérée.";
            res.json({ message, data: pokemons });
        });
    });
};
