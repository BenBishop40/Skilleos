import React, { useState, useEffect } from "react";
// import CSS
import "./App.css";
// import components
import Header from "./components/Header";
import Admin from "./components/Admin";
import recettes from "./recettes";
import Card from "./components/Card";

// Import Firebase
import base from "./base";
import { ref, set, onValue } from "firebase/database";

import { useParams } from "react-router-dom";

function App() {
    // récupération pseudoURL
    const pseudoURL = useParams();
    const pseudo = pseudoURL.pseudo;

    // Var etat recettes importés
    const [stateRecettes, setStateRecettes] = useState({});

    // Recettes cards -> depuis le state analyse et affiche les details transmis en props à Card
    const cards = Object.keys(stateRecettes).map((key) => <Card key={key} details={stateRecettes[key]}></Card>);

    // Fonction pour sauvegarder les données dans Firebase
    const saveRecettes = () => {
        // écriture des datas ds le noeud "recettes" de Firebase
        set(ref(base, `/${pseudo}/recettes`), stateRecettes);
    };
    // A chaque modif ds App/state recettes -> SaveRecettes enregistre les datas ds Firebase
    useEffect(() => {
        saveRecettes();
        console.log("useEffect saveRecette()");
    }, [stateRecettes]);

    // Utilisation de useEffect pour écouter les modifications apportées à "recettes" et mettre à jour l'état stateRecettes
    // charger recettes sur page
    useEffect(() => {
        // Création d'un gestionnaire pour l'événement "value" de Firebase
        const recettesRef = ref(base, `/${pseudo}/recettes`);
        const recettesHandler = onValue(recettesRef, (snapshot) => {
            const recettesData = snapshot.val();
            if (recettesData) {
                setStateRecettes(recettesData);
            }
        });

        // Retour de la fonction pour nettoyer le gestionnaire lors du démontage du composant
        return () => {
            recettesHandler();
        };
    }, [pseudo]);

    // Ajout recette et enregistrement automatique ds firebase avec modif state
    const addRecette = (recette) => {
        const recettes = { ...stateRecettes };
        const newKey = `recette-${Date.now()}`;
        recettes[newKey] = recette;
        setStateRecettes(recettes);
        console.log(`Recette avec la clé ${newKey} ajoutée dans Firebase.`);

        // Partie ci-dessous inutile -> ecoute du state modifié et enregistrement ds Firebase à chaque modif data
        // console.log(recettes);
        // const recetteRef = ref(base, `/${pseudo}/recettes/${newKey}`);
        // set(recetteRef, recette)
        //     .then(() => console.log(`Recette avec la clé ${newKey} ajoutée dans Firebase.`))
        //     .catch((err) => console.log(err));
    };

    // Modif recette et enregistrement automatique ds firebase avec modif state
    const modifyRecette = (key, newRecette) => {
        const recettes = { ...stateRecettes };
        recettes[key] = newRecette;
        setStateRecettes(recettes);
        console.log(`Recette avec la clé ${key} modifiée dans Firebase.`);
    };

    // Suppression recette et enregistrement automatique ds firebase avec modif state
    const deleteRecette = (key) => {
        const recettes = { ...stateRecettes };
        recettes[key] = null;
        setStateRecettes(recettes);
        console.log(`Recette avec la clé ${key} supprimée de Firebase.`);

        // Partie ci-dessous inutile -> ecoute du state modifié et enregistrement ds Firebase à chaque modif data
        // const recetteRef = ref(base, `/${pseudo}/recettes/${key}`);
        // set(recetteRef, null)
        //     .then(() => console.log(`Recette avec la clé ${key} supprimée de Firebase.`))
        //     .catch((err) => console.log(err));
    };

    // fonction charger recettes dans le state
    const chargerExemple = () => {
        setStateRecettes(recettes);
    };

    return (
        <div className="box">
            <Header pseudo={pseudo}></Header>
            <h1>Bonjour {pseudo}</h1>
            <div className="cards">{cards}</div>
            <Admin
                pseudo={pseudo}
                addRecette={addRecette}
                modifyRecette={modifyRecette}
                chargerExemple={chargerExemple}
                deleteRecette={deleteRecette}
                recettes={stateRecettes}
            ></Admin>
        </div>
    );
}

export default App;
