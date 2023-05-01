import React, { useState } from "react";
// import CSS
import "./App.css";
// import components
import Header from "./components/Header";
import Admin from "./components/Admin";
import recettes from "./recettes";
import Card from "./components/Card";

// Import Firebase
// import base from "./base";
// import { onValue, ref, set } from "firebase/database";

import { useParams } from "react-router-dom";

function App() {
    // récupération pseudoURL
    const pseudoURL = useParams();
    const pseudo = pseudoURL.pseudo;

    // Var etat recettes importés
    const [stateRecettes, setStateRecettes] = useState({});
    // fonction charger recettes dans le state
    const chargerExemple = () => setStateRecettes(recettes);

    // Recettes cards -> depuis le state analyse et affiche les details transmis en props à Card
    const cards = Object.keys(stateRecettes).map((key) => <Card key={key} details={stateRecettes[key]}></Card>);

    return (
        <div className="box">
            <Header pseudo={pseudo}></Header>
            <h1>Bonjour {pseudo}</h1>
            <div className="cards">{cards}</div>
            <Admin chargerExemple={chargerExemple}></Admin>
        </div>
    );
}

export default App;
