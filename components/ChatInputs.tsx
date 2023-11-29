'use client'
import React, { useState } from 'react';

const ChatInputs: React.FC = () => {
    const [message, setMessage] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = () => {
        // Logic to send the message
        console.log('Sending message:', message);
        setMessage('');
    };

    return (
        <div className="flex items-center justify-between p-2 bg-gray-200">
            <input
                type="text"
                value={message}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={handleSendMessage}
                className="ml-2 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
                Send
            </button>
        </div>
    );
};

export default ChatInputs;
