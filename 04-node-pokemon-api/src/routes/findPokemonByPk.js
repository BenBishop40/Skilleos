const { Pokemon } = require("../db/sequelize"); // import du m
// Module endpoint avec méhtode findAll propre à sequelize
module.exports = (app) => {
    app.get("/api/pokemons/:id", (req, res) => {
        Pokemon.findByPk(req.params.id).then((pokemon) => {
            const message = "Un pokémon a bien été trouvée.";
            res.json({ message, data: pokemon });
        });
    });
};
