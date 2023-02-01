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
    membre6: {
        nom: "Doug",
        age: 55,
    },
};

class App extends Component {
    state = {
        famille,
        isShow: false,
    };

    // 3 étapes pr incrémenter l'âge memebre 1; copie du objet famille, modif age puis màj du state
    handleClick = (num) => {
        const famille = { ...this.state.famille };
        famille.membre1.age += num;
        this.setState({ famille });
    };
    // gestion event input pr modifier le state du nom membre1 de famille
    handleChange = (event, id) => {
        const famille = { ...this.state.famille };
        const nom = event.target.value;
        famille[id].nom = nom;
        this.setState({ famille });
    };

    // gestion event input pr modifier le state du nom membre1 de famille
    hideName = (id) => {
        const famille = { ...this.state.famille };
        famille[id].nom = "X";
        this.setState({ famille });
    };

    handleShowDescription = () => {
        const isShow = !this.state.isShow;
        this.setState({ isShow });
    };

    render() {
        // Déstructuration des appels de props et state
        const { titre } = this.props;
        const { famille, isShow } = this.state;

        let description = null;
        if (isShow) {
            description = <strong>je suis un chat malin</strong>;
        }

        const liste = Object.keys(famille).map((membre) => (
            <Membre
                key={membre}
                handleChange={(event) => this.handleChange(event, membre)}
                hideName={() => this.hideName(membre)}
                age={famille[membre].age}
                nom={famille[membre].nom}
            />
        ));
        console.log(liste);

        return (
            <div className="App">
                <h1>{titre}</h1>

                {liste}
                {description}
                <button onClick={this.handleShowDescription}>{isShow ? "Cacher" : "Montrer"}</button>

                <Button vieillir={() => this.handleClick(2)} />
            </div>
        );
    }
}

export default App;
