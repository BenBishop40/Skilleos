import React from "react";

// import CSS
import "./App.css";
import { useParams } from "react-router-dom";

function App() {
  // récupération pseudoURL 
  const pseudoURL = useParams();
  const pseudo = pseudoURL.pseudo;

    return (
        <div className="box">
            <h1>Bonjour {pseudo}</h1>
            <div className="cards">
                <div className="card">
                    <h2>Une Carte</h2>
                </div>
            </div>
        </div>
    );
}

export default App;
