import React, { useEffect, useState } from "react";
import "./App.css";
import Formulaire from "./components/Formulaire";
import Message from "./components/Message";
import { useParams } from "react-router-dom";

// Firebase
import base from "./base";
import { onValue, ref, set } from "firebase/database";

function App() {
    const pseudoURL = useParams();
    const pseudo = pseudoURL.pseudo;
    console.log(pseudo);

    // var etat messages et fonction ajout message avec key unique
    const [messages, setMessages] = useState({});

    useEffect(() => {
        // Création d'une référence à l'emplacement des messages dans la base de données Firebase
        const messagesRef = ref(base, `/messages/${pseudo}`);

        // Ecouter les modifications de données en temps réel à cet emplacement dans la base de données Firebase
        onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setMessages(data);
            }
        });
    }, [pseudo]);

    const addMessage = (message) => {
        const newKey = `message-${Date.now()}`;
        // Mise à jour state messages
        setMessages((messages) => ({ ...messages, [newKey]: message }));
        // Ecriture message en base
        set(ref(base, `/messages/${pseudo}/${newKey}`), message);
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
