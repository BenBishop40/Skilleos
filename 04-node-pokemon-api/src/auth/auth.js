const jwt = require("jsonwebtoken");
const private_key = require("./private_key");

module.exports = (req, res, next) => {
    const authorizationHeader = req.headers.authorization; // récupération entete http authorization

    //vérif JWT fourni
    if (!authorizationHeader) {
        const message = "Vous n'avez pas de jeton d'authentification. Ajoutez-en-un dans l'en tête de la requête.";
        return res.status(401).json({ message });
    }
    // Si JWT
    const token = authorizationHeader.split(" ")[1];
    // Vérif si JWT valide avec verify et 3 params (token , privateKey, expiresIn)
    const decodedToken = jwt.verify(token, private_key, (error, decodedToken) => {
        if (error) {
            const message = "L'utilisateur n'est pas autorisé à accéder à cette ressource.";
            return res.status(401).json({ message, data: error });
        }

        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            const message = "L'identifiant de l'utilisateur est invalide.";
            res.status(401).json({ message });
        } else {
            next();
        }
    });
};
