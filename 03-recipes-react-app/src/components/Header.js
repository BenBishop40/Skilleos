import React from "react";

const Header = ({ pseudo }) => {
    // formatPseudo check premiere lettre pseudo pour display personalisé d' ou de ..prénom
    const formatPseudo = (pseudo) => (/[aeiouy]/i.test(pseudo[0]) ? `d'${pseudo}` : `de ${pseudo}`);
    console.log(`pseudo connecté: ${pseudo}`);
    return (
        <header>
            <h1>La boîte à recettes {formatPseudo(pseudo)}</h1>
        </header>
    );
};

export default Header;
