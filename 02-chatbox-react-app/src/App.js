import React, { useEffect, useState, createRef } from "react";
import "./components/App.css";
import "./components/animations.css";
import Formulaire from "./components/Formulaire";
import Message from "./components/Message";
import { useParams } from "react-router-dom";

// Firebase
import base from "./base";
import { onValue, ref, set, remove } from "firebase/database";

// Animation messages
import { CSSTransition, TransitionGroup } from "react-transition-group";

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
        const messagesRef = ref(base, "/");

        // Ecouter les modifications de données en temps réel à cet emplacement dans la base de données Firebase
        onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setMessages(data);

                // Suppression des messages anciens au delà de 20
                const messagesKeys = Object.keys(data);
                if (messagesKeys.length > 20) {
                    const messagesToDelete = messagesKeys.slice(0, messagesKeys.length - 20);
                    messagesToDelete.forEach((key) => {
                        const messageRef = ref(base, `/${key}`);
                        remove(messageRef);
                    });
                }
            }
        });
    }, [pseudo]);

    // fonction ajout message avec definition key unique "message-timestamp"
    const addMessage = (message) => {
        const newKey = `message-${Date.now()}`;

        // Ecriture message ds dB Firebase
        set(ref(base, `/${newKey}`), message);
        // Mise à jour state messages
        setMessages((messages) => ({ ...messages, [newKey]: message }));
    };

    // identification boolen sur pseudo message = pseudo URL
    const isUser = (pseudo) => pseudo === pseudoURL.pseudo;

    const messagesToDisplay = Object.keys(messages).map((key) => (
        <CSSTransition key={key} timeout={2000} classNames="fade">
            <Message isUser={isUser} message={messages[key].message} pseudo={messages[key].pseudo} />
        </CSSTransition>
    ));

    return (
        <div className="box">
                <div className="messages" ref={messageRefScroll}>
                    <TransitionGroup className="message">{messagesToDisplay}</TransitionGroup>
                </div>
            <Formulaire addMessage={addMessage} pseudo={pseudo} length={140} />
        </div>
    );
}
export default App;
