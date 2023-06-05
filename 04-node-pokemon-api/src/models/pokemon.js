// Déclaration des types valides pour Sequelize validator perso
const validTypes = ["Plante", "Poison", "Feu", "Eau", "Insecte", "Vol", "Normal", "Electrik", "Fée"];

// Models permettant de créer une instance de table avec Sequelize
// Définit également les types de datas, format primarykey...
module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "Pokemon",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING(25),
                // len: [3, 25],
                allowNull: false,
                unique: {
                    msg: "Le nom est déjà pris.",
                },
                // Gestion des contraintes - règles de validation sur format datas
                validate: {
                    notEmpty: { msg: "Le champ nom ne doit pas être vide." },
                    notNull: { msg: "Le champ nom ne doit pas être nul. " },
                },
            },
            hp: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isInt: { msg: "Utilisez uniquement des nombres entiers pour les points de vie" },
                    min: {
                        args: [0],
                        msg: "Les points de vie doivent être supérieurs ou égaux à 0.",
                    },
                    max: {
                        args: [999],
                        msg: "Les points de vie doivent être inférieurs ou égaux à 999.",
                    },
                    notNull: { msg: "Les points de vie sont une propriété requise." },
                },
            },
            cp: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isInt: { msg: "Utilisez uniquement des nombres entiers pour les points de dégats" },
                    min: {
                        args: [0],
                        msg: "Les points de dégâts doivent être supérieurs ou égaux à 0.",
                    },
                    max: {
                        args: [99],
                        msg: "Les points de dégâts doivent être inférieurs ou égaux à 99.",
                    },
                    notNull: { msg: "Les points de dégats sont une propriété requise." },
                },
            },
            picture: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isURL: { msg: "Spécifiez une adresse URL valide pour l'image." },
                    notNull: { msg: " L'image est une propriété requise." },
                },
            },
            types: {
                type: DataTypes.STRING,
                allowNull: false,
                // Traitement des communications entre API et Db (format db = string et API = ["", ""]) géré par sequelize avec getter et setter
                get() {
                    return this.getDataValue("types").split(",");
                },
                set(types) {
                    this.setDataValue("types", types.join());
                },
                validate: {
                    // Sequelize validator perso
                    isTypesValid(value) {
                        //param value est la valeur en BDD (string avec les types séparés par une virgule) - pas de prise en compte du getter et setter
                        if (!value) {
                            throw new Error("Un pokémon doit avoir au moins un type");
                        }
                        if (value.split(",").length > 3) {
                            throw new Error("Un pokémon ne peut pas avoir plus de 3 types");
                        }
                        value.split(",").forEach((type) => {
                            if (!validTypes.includes(type)) {
                                throw new Error(
                                    `Le type d'un pokémon doit appartenir à la liste suivante : ${validTypes}`
                                );
                            }
                        });
                    },
                },
            },
        },
        {
            timestamps: true,
            createdAt: "created",
            updatedAt: false,
        }
    );
};
