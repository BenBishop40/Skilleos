import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Connexion from "./components/Connexion";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";

class Root extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Connexion />} />
                    <Route path="/pseudo/:pseudo" element={<App />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
