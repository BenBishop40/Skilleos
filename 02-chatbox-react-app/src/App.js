import React, { useState } from "react";
import "./App.css";
import Formulaire from "./components/Formulaire";
import Message from "./components/Message";
import { useParams } from "react-router-dom";

// Firebase
import base from "./base";
import { ref, set } from "firebase/database";

function App() {
    const pseudoURL = useParams();
    const pseudo = pseudoURL.pseudo;

    // var etat messages et fonction ajout message avec key unique
    const [messages, setMessages] = useState({});

    // Référence path stockage en Db
    const messagesRef = ref(base, "messages");

    const addMessage = (message) => {
        const newKey = `message-${Date.now()}`;

        // Mise à jour state messages
        setMessages((messages) => ({ ...messages, [newKey]: message }));
       
        // Ecriture message en base
        set(ref(messagesRef, newKey), {
            message,
            // pseudo,
        })

    };
    console.log(messages);

    return (
        <div className="box">
            <div>
                <div className="messages">
                    {Object.keys(messages).map((key) => (
                        <Message key={key} message={messages[key].message} pseudo={messages[key].pseudo} />
                    ))}
                </div>
            </div>
            <Formulaire addMessage={addMessage} pseudo={pseudo} length={140} />
        </div>
    );
}
export default App;
