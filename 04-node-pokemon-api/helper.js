// module success prend 2 param pr construire la réponse json où elle sera appelée
exports.success = (message, data) => {
    return {
        message,
        data,
    };
};
