import React, { useEffect, useState, createRef } from "react";
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

    // var etat messages
    const [messages, setMessages] = useState({});

    // creation ref messages
    const messageRefScroll = createRef();

    useEffect(() => {
        // Défiler scroll auto à publi message
        messageRefScroll.current.scrollTop = messageRefScroll.current.scrollHeight;
    }, [messageRefScroll]);

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

    // fonction ajout message avec key unique "message-timestamp"
    const addMessage = (message) => {
        const newKey = `message-${Date.now()}`;
        // Mise à jour state messages
        setMessages((messages) => ({ ...messages, [newKey]: message }));
        // Ecriture message ds dB Firebase
        set(ref(base, `/messages/${pseudo}/${newKey}`), message);
    };

    return (
        <div className="box">
            <div>
                <div className="messages" ref={messageRefScroll}>
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
