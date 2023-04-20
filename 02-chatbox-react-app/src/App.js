import React, { useState } from "react";
import "./App.css";
import Formulaire from "./components/Formulaire";
import Message from "./components/Message";
import { useParams } from "react-router-dom";

function App () {

    const pseudoURL = useParams();
    console.log(pseudoURL);

    const [messages, setMessages] = useState({  });
    const [pseudo, setPseudo] = useState(pseudoURL);


    const addMessage = (message) => {
        const messages = { ...this.state.messages };
        messages[`message-${Date.now()}`] = message;
        setMessages({ messages });
    };

    return (
        <div className="box">
            <div>
                <div className="messages">
                    <Message />
                </div>
            </div>
            <Formulaire addMessage={addMessage} />
        </div>
    );
}
export default App;
