import React, { Component } from "react";

class Formulaire extends Component {
    state = {
        message: "",
        length: this.props.length,
    };

    // creer message avec props
    createMessage = () => {
        const { addMessage, pseudo, length } = this.props;
        const message = {
            pseudo,
            message: this.state.message,
        };
        addMessage(message);
        // reset message sent
        this.setState({ message: "", length });
    };

    // submit form et lct fction createmessage
    handleSubmit = (event) => {
        event.preventDefault();
        this.createMessage();
    };

    // gestion du state input et decompte length
    handleChange = (event) => {
        const message = event.target.value;
        const length = this.props.length - message.length;
        this.setState({ message, length });
    };
    // Validation avec Enter - gestion event
    handleKeyUp = (event) => {
        if (event.key === "Enter") {
            this.createMessage();
        }
    };

    render() {
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <textarea
                    value={this.state.message}
                    onChange={this.handleChange}
                    onKeyUp={this.handleKeyUp}
                    required
                    maxLength={this.props.length}
                ></textarea>
                <div className="info">{this.state.length}</div>
                <button type="submit">Envoyer!</button>
            </form>
        );
    }
}

export default Formulaire;
