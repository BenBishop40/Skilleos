import React, { Fragment } from "react";

const Login = ({ authenticate }) => {
    return (
        <Fragment>
            <div className="login">
                <h2>Connecte toi pour créer tes recettes !</h2>
                <button onClick={authenticate} className="facebook-button">
                    Me connecter avec Facebook
                </button>
            </div>
        </Fragment>
    );
};
export default Login;
