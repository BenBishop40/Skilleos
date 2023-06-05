const { Pokemon } = require("../db/sequelize"); // import du module Pokemeon de Sequelize
const { Op } = require("sequelize"); // import opérateur sequelize
const auth = require("../auth/auth"); // import middleware auth.js
// Module endpoint avec méthode findAndCountAll propre à sequelize
module.exports = (app) => {
    app.get("/api/pokemons", auth, (req, res) => {
        // on extrait le param query name de l'URL pr recherche sur name
        if (req.query.name) {
            const name = req.query.name;
            const limit = parseInt(req.query.limit) || 5;
            // check si param nam > 2 caract pr lancer la requete (economise l API)
            if (name.length < 2) {
                const message = "Le terme de la recherche doit contenir au moins 2 caractères.";
                res.status(400).json({ message: message });
            } else {
                return Pokemon.findAndCountAll({
                    where: {
                        // name: propriété du modèle pokémon
                        name: {
                            [Op.like]: `%${name}%`, // name est le critère de rech. (Op.eq) = name ou (Op.like) = %name% (rech plus souple sur motif et pas le mot complet)
                        },
                    },
                    order: ["name"], // ordre alphapbétik par défaut sur name
                    limit: limit, // limite les résultats displayed
                    // { count , rows } liés à findANCountAll pr retourner les correspondances rech mais aussi le nbre total
                }).then(({ count, rows }) => {
                    const message = `Il y a ${count} pokémon(s) qui corresponde(nt) au terme de recherche ${name}`;
                    res.json({ message, data: rows });
                });
            }
        } else {
            Pokemon.findAll({ order: ["name"] })
                // Traitement de la success request
                .then((pokemons) => {
                    const message = "La liste des pokémons a bien été récupérée.";
                    res.json({ message, data: pokemons });
                })
                .catch((error) => {
                    const message = `La liste des pokémons n'a pas pu être récupérée. Réessayez dans quelques instants.`;
                    res.status(500).json({ message, data: error });
                });
        }
    });
};
