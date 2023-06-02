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
                type: DataTypes.STRING,
                allowNull: false,
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
                    notNull: { msg: "Les points de vie sont une propriété requise." },
                },
            },
            cp: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isInt: { msg: "Utilisez uniquement des nombres entiers pour les points de dégats" },
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
            },
        },
        {
            timestamps: true,
            createdAt: "created",
            updatedAt: false,
        }
    );
};
