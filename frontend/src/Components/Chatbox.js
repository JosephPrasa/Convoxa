import React from "react";
import { ChatState } from "../Context/ChatProvider";
import SingleChat from "./SingleChat";
const Chatbox = ({ fetchAgain, setFetchAgain }) => {
    const { selectedChat } = ChatState();
    return (
        <div className={`d-${selectedChat ? "flex" : "none"} d-md-flex flex-column h-100 bg-white border-orange shadow-sm rounded-4 p-3`}>
            <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </div>
    );
};
export default Chatbox;
