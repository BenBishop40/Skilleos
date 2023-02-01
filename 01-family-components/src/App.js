import "./App.css";
import React, { Component } from "react";
import Membre from "./components/Membre";
import Button from "./components/Button";

const famille = {
    membre1: {
        nom: "Michel",
        age: 74,
    },
    membre2: {
        nom: "Francine",
        age: 67,
    },
    membre3: {
        nom: "Benjamin",
        age: 36,
    },
    membre4: {
        nom: "Charlotte",
        age: 34,
    },
    membre5: {
        nom: "Mesca",
        age: 15,
    },
};

class App extends Component {
    state = {
        famille,
    };

    // 3 étapes pr incrémenter l'âge memebre 1; copie du objet famille, modif age puis màj du state
    handleClick = (num) => {
        const famille = { ...this.state.famille };
        famille.membre1.age += num;
        this.setState({ famille });
    };
    // gestion event input pr modifier le state du nom membre1 de famille
    handleChange = (event) => {
        const famille = { ...this.state.famille };
        const nom = event.target.value;
        famille.membre1.nom = nom;
        this.setState({ famille });
    };

    render() {
        // Déstructuration des appels de props et state
        const { titre } = this.props;
        const { famille } = this.state;
        return (
            <div className="App">
                <h1>{titre}</h1>
                <input value={famille.membre1.nom} onChange={this.handleChange} type="text"></input>
                <Membre nom={famille.membre1.nom} age={famille.membre1.age} />
                <Membre nom={famille.membre2.nom} age={famille.membre2.age} />
                <Membre nom={famille.membre3.nom} age={famille.membre3.age} />
                <Membre nom={famille.membre4.nom} age={famille.membre4.age} />
                <Membre nom={famille.membre5.nom} age={famille.membre5.age}>
                    <strong>je suis un chat félin</strong>
                </Membre>
                <Button vieillir={() => this.handleClick(2)} />
            </div>
        );
    }
}

export default App;
