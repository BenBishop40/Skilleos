// module success prend 2 param pr construire la réponse json où elle sera appelée
exports.success = (message, data) => {
    return {
        message,
        data,
    };
};
// Génération Id unique à création pokemon
exports.getUniqueId = (pokemons) => {
    const pokemonsIds = pokemons.map((pokemon) => pokemon.id);
    const maxId = pokemonsIds.reduce((a, b) => Math.max(a, b));
    const uniqueId = maxId + 1;
    return uniqueId;
};
