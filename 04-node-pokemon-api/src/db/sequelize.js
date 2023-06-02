// Gestion de la connection a la db et export des models sequelize
const { Sequelize, DataTypes } = require("sequelize");
const PokemonModel = require("../models/pokemon");
const pokemons = require("./mock-pokemon");

// Setup Sequelize -> instance à la DB :
const sequelize = new Sequelize("pokedex", "root", "", {
    //constructeur Sequelize avec nom db : pokedex, nom db Maria par défaut : root et "" : mdp
    host: "localhost", // objet de config avec host
    dialect: "mariadb", // dialect = nom du driver pr interaction avec la DB
    dialectOptions: {
        // options timezone facultatives
        timezone: "Etc/GMT-2",
    },
    logging: false,
});
// Création model Pokemon (permet de créer ensuite les entités selon ce modèle)
const Pokemon = PokemonModel(sequelize, DataTypes);

// Init de la db avec création des pokemons selon model sequelize
const initDb = () => {
    return sequelize.sync({ force: true }).then((_) => {
        pokemons.map((pokemon) => {
            Pokemon.create({
                name: pokemon.name,
                hp: pokemon.hp,
                cp: pokemon.cp,
                picture: pokemon.picture,
                types: pokemon.types,
            }).then((pokemon) => console.log(pokemon.toJSON()));
        });
        console.log("La base de donnée a bien été initialisée !");
    });
};

module.exports = {
    initDb,
    Pokemon,
};
