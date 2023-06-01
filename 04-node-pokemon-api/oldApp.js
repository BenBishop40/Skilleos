//archgive des ends points avec méthodes HTTP sur mockup pokemon (local) , plus utile avec mariaDb et squelize
// info page home :
// app.get("/", (req, res) => res.send("Hello, Express"));

// // Profil pokemon selon id parametre :
// app.get(`/api/pokemons/:id`, (req, res) => {
//     const id = parseInt(req.params.id);
//     const pokemon = pokemons.find((pokemon) => pokemon.id === id);
//     const message = "un pokémon a été trouvé.";
//     res.json(success(message, pokemon));
// });

// // Synthèse Nbre pokemons :
// app.get("/api/pokemons", (req, res) => {
//     const message = "La liste complète des pokémons a bien été récupérée.";
//     res.json(success(message, pokemons));
// });

// // Post new pokemon - parse des infos body avec body parser - middleware
// app.post("/api/pokemons", (req, res) => {
//     const id = getUniqueId(pokemons);
//     const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } };
//     pokemons.push(pokemonCreated);
//     const message = `Le pokemon ${pokemonCreated.name} a bien été créé.`;
//     res.json(success(message, pokemonCreated));
// });

// // Put pokemon - modification
// app.put("/api/pokemons/:id", (req, res) => {
//     const id = parseInt(req.params.id);
//     const pokemonUpdated = { ...req.body, id: id };
//     pokemons = pokemons.map((pokemon) => {
//         return pokemon.id === id ? pokemonUpdated : pokemon;
//     });
//     const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié.`;
//     res.json(success(message, pokemonUpdated));
// });

// // DELETE pokemon :
// app.delete("/api/pokemons/:id", (req, res) => {
//     const id = parseInt(req.params.id);
//     const pokemonDeleted = pokemons.find((pokemon) => pokemon.id === id);
//     pokemons = pokemons.filter((pokemon) => pokemon.id !== id);
//     const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`;
//     res.json(success(message, pokemonDeleted));
// });