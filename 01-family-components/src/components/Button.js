import React from "react";
import "./Button.css";

// On passe la méthode au component avec un import props (vieillir)
const Button = ({ vieillir }) => {
    return <button onClick={vieillir}>Vieillir de 2 ans</button>;
};

export default Button;
