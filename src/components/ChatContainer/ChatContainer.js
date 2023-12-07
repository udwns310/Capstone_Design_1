import React, { useState } from 'react';
import InputField from '../InputField/InputField';
import './ChatContainer.css';

function ChatContainer() {
    return (
        <div className="Container">
            <div className="system-message-container">
                <p className="system-message">"홍길동" 님이 입장하셨습니다.</p>
            </div>
            <div className="my-message-container">
                <div className="my-message">안녕하세용가리</div>
            </div>
            <div className="your-message-container">
                <img src="/profile.jpeg" className="profile-image" />
                <div className="your-message">니 누고!</div>
            </div>
            <InputField />
        </div>
    );
}

export default ChatContainer;
