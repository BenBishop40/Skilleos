import React, { Fragment } from "react";

const Membre = ({ nom, children, age, hideName, handleChange }) => {
    return (
        <Fragment>
            <h2
                style={{
                    backgroundColor: age < 18 ? "cadetblue" : "beige",
                    color: age < 18 ? "beige" : "cadetblue",
                }}
            >
                {nom.toUpperCase()} : {age}
            </h2>
            <input value={nom} onChange={handleChange} type="text"></input>
            <button onClick={hideName}>X</button>
            {children ? <p>{children}</p> : <Fragment />}
        </Fragment>
    );
};

export default Membre;
