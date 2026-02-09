import React from "react";
import { ChatState } from "../Context/ChatProvider";
import SingleChat from "./SingleChat";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
    const { selectedChat } = ChatState();
    return (
        <div
            className={`d-${selectedChat ? "flex" : "none"} d-md-flex flex-column h-100 rounded-4 overflow-hidden shadow-lg`}
            style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)"
            }}
        >
            <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </div>
    );
};
export default Chatbox;
