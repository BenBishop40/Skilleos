import React, { Component } from "react";

class Formulaire extends Component {
    state = {
        message: "",
    };

    createMessage = () => {
        const { addMessage, pseudo } = this.props;
    };

    handleSubmit = (event) => {
        event.preventDefault();
        
        console.log("Submit!");
    };

    handleChange = (event) => {
        const message = event.target.value;
        this.setState({ message });
    };

    render() {
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <textarea value={this.state.message} onChange={this.handleChange} required maxLength="140"></textarea>
                <div className="info">140</div>
                <button type="submit">Envoyer!</button>
            </form>
        );
    }
}

export default Formulaire;
