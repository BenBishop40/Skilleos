import React, { Component, Fragment } from "react";
import AddRecette from "./AddRecette";
import Login from "./Login";
import AdminForm from "./AdminForm";
// import recettes from "../recettes";

// import firebase / authentification
// import firebase from "firebase/app";
import { FacebookAuthProvider, getAuth, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import "firebase/auth";
import base, { firebaseApp } from "../base";
import { get, ref, set } from "firebase/database";

class Admin extends Component {
    state = {
        uid: null,
        chef: null,
    };

    componentDidMount() {
        const auth = getAuth(firebaseApp);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.handleAuth({ user });
            }
        });
    }

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

    // Deconnexion Firebase
    logout = async () => {
        const auth = getAuth(firebaseApp);
        await signOut(auth)
            .then(() => {
                console.log("déconnexion Firebase");
                this.setState({ uid: null });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        const { recettes, addRecette, chargerExemple, modifyRecette, deleteRecette } = this.props;

        const logout = <button onClick={this.logout}>Déconnexion</button>;

        // Si utilisateur non connecté
        if (!this.state.uid) {
            return <Login authenticate={this.authenticate} />;
        }
        if (this.state.uid !== this.state.chef) {
            return (
                <div>
                    <p>Tu n'es pas le chef de cette recette !</p>
                    {logout}
                </div>
            );
        }

        return (
            <Fragment>
                <div className="cards">
                    <AddRecette addRecette={addRecette}></AddRecette>
                    {Object.keys(recettes).map((key) => (
                        <AdminForm
                            key={key}
                            id={key}
                            modifyRecette={modifyRecette}
                            recettes={recettes}
                            deleteRecette={deleteRecette}
                        ></AdminForm>
                    ))}

                    <footer>
                        {logout}
                        <button onClick={chargerExemple}>Remplir</button>
                    </footer>
                </div>
            </Fragment>
        );
    }
}

export default Admin;
