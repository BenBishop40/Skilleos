import React, { Component } from "react";
import AddRecette from "./AddRecette";

class Admin extends Component {
    render() {
        const { addRecette, chargerExemple } = this.props;
        return (
            <div className="cards">
                <AddRecette addRecette={addRecette}></AddRecette>
                <footer>
                    <button onClick={chargerExemple}>Remplir</button>
                </footer>
            </div>
        );
    }
}

export default Admin;
