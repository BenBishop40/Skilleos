const { Pokemon } = require("../db/sequelize"); // import du m
// Module endpoint avec méhtode findAll propre à sequelize
module.exports = (app) => {
    app.get("/api/pokemons/:id", (req, res) => {
        Pokemon.findByPk(req.params.id)
            .then((pokemon) => {
                if (pokemon === null) {
                    const message = "Le pokémon demandé n'existe pas. Réessayez avec un autre identifiant.";
                    return res.status(404).json({ message });
                }
                const message = "Un pokémon a bien été trouvée.";
                res.json({ message, data: pokemon });
            })
            .catch((error) => {
                const message = "Le pokémon n'a pas pu être récupéré. Réessayez dans quelques instants.";
                res.status(500).json({ message, data: error });
            });
    });
};
