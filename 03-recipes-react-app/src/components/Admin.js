import React, { Component } from "react";
import AddRecette from "./AddRecette";
import Login from "./Login";
import AdminForm from "./AdminForm";
import recettes from "../recettes";

// import firebase / authentification
// import firebase from "firebase/app";
import { FacebookAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import "firebase/auth";
import base, { firebaseApp } from "../base";
import { get, ref, set } from "firebase/database";

class Admin extends Component {
    
    state = {
        uid: null,
        chef: null,
    };

    // Function async check data user en base sinon dégage ,

    handleAuth = async (authData) => {
        console.log(authData.user.uid);
        const auth = getAuth(firebaseApp);
        if (!auth.currentUser) return;

        // check emplacement firebase/pseudo et récupération data
        const box = ref(base, `/${this.props.pseudo}`);
        const data = await get(box);

        // check si chef existe sinon écriture ds firebase du uid d auth Facebook
        if (!data.chef) {
            var boxRef = ref(base, `${this.props.pseudo}/chef`);
            const chef = set(boxRef, authData.user.uid);
            console.log(chef);
        }

        // màj uid et chef pdt authentification FB
        this.setState({
            uid: authData.user.uid,
            chef: data.chef || authData.user.uid,
        });
    };

    // Fonction authentification Facebook
    authenticate = async () => {
        const provider = new FacebookAuthProvider();
        const auth = getAuth(firebaseApp);
        await signInWithPopup(auth, provider).then(this.handleAuth);
    };

    render() {
        const { addRecette, chargerExemple, modifyRecette, deleteRecette } = this.props;

        // Si utilisateur non connecté
        if (!this.state.uid) {
            return <Login authenticate={this.authenticate} />;
        }

        if (this.state.uid !== this.state.chef) {
            return (
                <div>
                    <p>Tu n'es pas le chef de cette recette !</p>
                </div>
            );
        }
        return (
            <div className="cards">
                <AddRecette addRecette={addRecette}></AddRecette>
                {Object.keys(recettes).map((key) => (
                    <AdminForm key={key} id={key} modifyRecette={modifyRecette} recettes={recettes} deleteRecette={deleteRecette}></AdminForm>
                ))}

                <footer>
                    <button onClick={chargerExemple}>Remplir</button>
                </footer>
            </div>
        );
    }
}

export default Admin;
