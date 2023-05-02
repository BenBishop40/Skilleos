import React, { Component } from "react";
import AddRecette from "./AddRecette";
import Login from "./Login";

// import firebase / authentification
// import firebase from "firebase/app";
import { FacebookAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import "firebase/auth";
import { firebaseApp } from "../base";

class Admin extends Component {
    state = {
        uid: null,
        chef: null,
    };

    handleAuth = (authData) => {
        console.log(authData);
    };

    authenticate = () => {
        const provider = new FacebookAuthProvider();
        const auth = getAuth(firebaseApp);
        signInWithPopup(auth, provider).then(this.handleAuth);
    };

    render() {
        const { addRecette, chargerExemple } = this.props;

        // Si utilisateur non connecté
        if (!this.state.uid) {
            return <Login authenticate={this.authenticate} />;
        }
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
