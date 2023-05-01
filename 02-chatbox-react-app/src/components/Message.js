import React from "react";

const Message = ({ pseudo, message, isUser }) => {
    return (
        <>
            <div className={isUser(pseudo) ? "user-message" : "not-user-message"}>
                {isUser(pseudo) ? null : <strong>{pseudo}: </strong>}
                {message}
            </div>
        </>
    );
};

export default Message;
