// Gestion de la connection a la db et export des models sequelize
const { Sequelize, DataTypes } = require("sequelize");
const PokemonModel = require("../models/pokemon");
const UserModel = require("../models/user");
const pokemons = require("./mock-pokemon");
const bcrypt = require("bcrypt");

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
const User = UserModel(sequelize, DataTypes);

// Init de la db avec création des pokemons selon model sequelize
const initDb = () => {
    return sequelize.sync({ force: true }).then((_) => {
        console.log("La base de donnée a bien été initialisée !");
        pokemons.map((pokemon) => {
            Pokemon.create({
                name: pokemon.name,
                hp: pokemon.hp,
                cp: pokemon.cp,
                picture: pokemon.picture,
                types: pokemon.types,
            }).then((pokemon) => console.log(pokemon.toJSON()));
        });

        // Brcypt : hachage du mdp
        bcrypt
            .hash("pikachu", 10)
            // creation du user avec pwd haché par bcrypt
            .then((hash) =>
                User.create({
                    username: "pikachu",
                    password: hash,
                })
            )
            .then((user) => console.log(user.toJSON()));
    });
};

module.exports = {
    initDb,
    Pokemon,
    User,
};
