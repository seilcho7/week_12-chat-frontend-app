import React from 'react';

function ChatList({messages}) {
    const messageItems = messages.map((m, i) => (
        <li className="chatList" key={i}>{m}</li>
    ));
    return (
        <ul className="chat">
            {messageItems}
        </ul>
    );
}

export default ChatList;