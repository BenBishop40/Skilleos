import React, { Component, Fragment } from "react";
import { Navigate } from "react-router-dom";

import withPlaceholder from "./withPlaceholder";

class Connexion extends Component {
    state = {
        pseudo: "",
        goToApp: false,
    };

    goToApp = (event) => {
        event.preventDefault();
        this.setState({ goToApp: true });
    };

    handleChange = (event) => {
        const pseudo = event.target.value;
        this.setState({ pseudo });
    };

    render() {
        if (this.state.goToApp) {
            return <Navigate push to={`/pseudo/${this.state.pseudo}`} />;
        }
        return (
            <Fragment>
                <div className="connexionBox">
                    <form className="connexion" onSubmit={this.goToApp}>
                        <h1>Ma Boîte à Recettes</h1>
                        <input
                            type="text"
                            value={this.state.pseudo}
                            onChange={this.handleChange}
                            placeholder={this.props.placeholder}
                            pattern="[A-Za-z-]{1,}"
                            required
                        />
                        <button type="submit">GO</button>
                        <p>Pas de caractères spéciaux.</p>
                    </form>
                </div>
            </Fragment>
        );
    }
}

const WrappedComponent = withPlaceholder(Connexion);

export default WrappedComponent;
