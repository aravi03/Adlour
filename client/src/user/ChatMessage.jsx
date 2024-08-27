import React, { useContext } from "react";
import { ChatContext } from "../utils/ChatContext";

export default function ChatMessage({ messages }) {
    const [chatContext, setChatContext] = useContext(ChatContext);
    try{
    if(messages.length>0)
    return (
        <ul className="list-unstyled mt-3">
            {messages.map((message, index) => {
                // Determine the class based on the senderId
                const messageClass = message.fromID === chatContext.id ? "card message-card" : "card message-card-received"
                const listClass=message.fromID === chatContext.id ? "d-flex justify-content-between mb-4":  "d-flex justify-content-end mb-4"
                const date = new Date(message.timestamp);
                if (date instanceof Date && !isNaN(date.getTime())) {
                    const options = { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                    };
                    message.timestamp= date.toLocaleDateString('en-US', options);
                }
                    return (
                    <li key={index} className={listClass}>
                        <div className={messageClass}>
                            <div className="card-body">
                                <p className="mb-0">
                                    {message.message}
                                </p>
                                <p className="text-end text-muted">
                                    {message.timestamp}
                                </p>
                            </div>
                        </div>
                    </li>
                );
            })}
        </ul>
    )
    else return(<p></p>)
}
    catch(error){
        return(<p></p>)
    }
}
