import React, { Component } from "react";

class AddRecette extends Component {
    state = {
        nom: "",
        image: "",
        ingredients: "",
        instructions: "",
    };

    // Fonction maj du state
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    // Validation formulaire
    handleSubmit = (event) => {
        event.preventDefault();
        const recette = { ...this.state };
        this.props.addRecette(recette);
        // Reset formulaire
        const newForm = Object.assign({}, recette, {
            nom: "",
            image: "",
            ingredients: "",
            instructions: "",
        });
        this.setState(newForm);
    };

    render() {
        return (
            <div className="card">
                <form className="admin-form ajouter-recette" onSubmit={this.handleSubmit}>
                    <input
                        name="nom"
                        value={this.state.nom}
                        onChange={this.handleChange}
                        type="text"
                        placeholder="Nom de la recette"
                    />
                    <input
                        name="image"
                        value={this.state.image}
                        onChange={this.handleChange}
                        type="text"
                        placeholder="Nom de l'image"
                    />
                    <textarea
                        name="ingredients"
                        value={this.state.ingredients}
                        onChange={this.handleChange}
                        rows="3"
                        placeholder="Liste des ingrédients"
                    />
                    <textarea
                        name="instructions"
                        value={this.state.instructions}
                        onChange={this.handleChange}
                        rows="15"
                        placeholder="Liste des instructions"
                    />
                    <button type="submit">Ajouter une recette +</button>
                </form>
            </div>
        );
    }
}
export default AddRecette;
