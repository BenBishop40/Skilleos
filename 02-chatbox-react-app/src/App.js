import React, { useState } from "react";
import "./App.css";
import Formulaire from "./components/Formulaire";
import Message from "./components/Message";
import { useParams } from "react-router-dom";

function App() {
    const pseudoURL = useParams();
    const pseudo = pseudoURL.pseudo;

    // var etat messages et actualisation ajout message
    const [messages, setMessages] = useState({});
    const addMessage = (message) => {
        const newKey = `message-${Date.now()}`;
        setMessages((messages) => ({ ...messages, [newKey]: message }));
    };
    console.log(messages);

    return (
        <div className="box">
            <div>
                <div className="messages">
                    <Message />
                </div>
            </div>
            <Formulaire addMessage={addMessage} pseudo={pseudo} length={140} />
        </div>
    );
}
export default App;
