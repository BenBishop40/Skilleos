import React, { useState } from "react";
import "./App.css";
import Formulaire from "./components/Formulaire";
import Message from "./components/Message";
import { useParams } from "react-router-dom";

function App() {
    const pseudoURL = useParams();
    const pseudo = pseudoURL.pseudo;

    const [messages, setMessages] = useState({});

    const addMessage = (message) => {
        const newMessages = { ...messages };
        newMessages[`message-${Date.now()}`] = message;
        setMessages({ newMessages });
        console.log(message);
    };

    return (
        <div className="box">
            <div>
                <div className="messages">
                    <Message />
                </div>
            </div>
            <Formulaire addMessage={addMessage} pseudo={pseudo} />
        </div>
    );
}
export default App;
