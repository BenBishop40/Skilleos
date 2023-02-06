import React, { Component } from "react";
import "./App.css";
import Formulaire from "./components/Formulaire";
import Message from "./components/Message";

class App extends Component {
    state = {
        messages: {},
        pseudo: "",
    };

    addMessage = (message) => {
        const messages = { ...this.state.messages };
        messages[`message-${Date.now()}`] = message;
        this.setState({ messages });
    };
    render() {
        return (
            <div className="box">
                <div>
                    <div className="messages">
                        <Message />
                    </div>
                </div>
                <Formulaire addMessage={this.addMessage} />
            </div>
        );
    }
}
export default App;
