import React, { Fragment } from "react";

const AdminForm = ({ id: key, modifyRecette, recettes, deleteRecette }) => {
    const recette = recettes[key];

    if (!recette) {
        return null;
    }

    const handleChange = (event, key) => {
        const { name, value } = event.target;
        const recette = recettes[key];
        recette[name] = value;
        modifyRecette(key, recette);
    };
    return (
        <Fragment>
            <div className="card">
                <form className="admin-form">
                    <input
                        value={recette.nom}
                        onChange={(e) => handleChange(e, key)}
                        type="text"
                        name="nom"
                        placeholder="Nom de la recette"
                    ></input>
                    <input
                        value={recette.image}
                        onChange={(e) => handleChange(e, key)}
                        type="text"
                        name="image"
                        placeholder="Adresse de l'image"
                    ></input>
                    <textarea
                        value={recette.ingredients}
                        onChange={(e) => handleChange(e, key)}
                        name="ingredients"
                        rows={3}
                        placeholder="Liste des ingrédients"
                    ></textarea>
                    <textarea
                        value={recette.instructions}
                        onChange={(e) => handleChange(e, key)}
                        name="instructions"
                        rows={15}
                        placeholder="Liste des ingrédients"
                    ></textarea>
                </form>
                <button onClick={() => deleteRecette(key)}>Supprimer -</button>
            </div>
        </Fragment>
    );
};
export default AdminForm;
