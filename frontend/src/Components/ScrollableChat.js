import React from "react";
import { ChatState } from "../Context/ChatProvider";
const ScrollableChat = ({ messages }) => {
    const { user } = ChatState();
    return (
        <div className="d-flex flex-column gap-2 overflow-auto">
            {messages?.map((m) => (
                <div key={m._id} className={`d-flex ${m.sender._id === user._id ? "justify-content-end" : "justify-content-start"}`}>
                    <span style={{ backgroundColor: m.sender._id === user._id ? "#B9F5D0" : "#fff", padding: "5px 12px", borderRadius: "15px", maxWidth: "80%", boxShadow: "0 1px 2px rgba(0,0,0,0.1)", }}>
                        {m.content}
                    </span>
                </div>
            ))}
        </div>
    );
};
export default ScrollableChat;
