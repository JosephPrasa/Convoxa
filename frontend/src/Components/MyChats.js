import React, { useEffect, useCallback } from "react";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import { Button, Stack, Card } from "react-bootstrap";
import { Plus } from "lucide-react";
import ChatLoading from "./miscellaneous/ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";

const MyChats = ({ fetchAgain }) => {
    const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

    const fetchChats = useCallback(async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get("/api/chat", config);
            setChats(data);
        } catch (error) {
            console.error("Chat fetch error");
        }
    }, [user.token, setChats]);

    useEffect(() => {
        fetchChats();
    }, [fetchAgain, fetchChats]);

    return (
        <div
            className={`d-${selectedChat ? "none" : "flex"
                } d-md-flex flex-column h-100 bg-white border rounded shadow-sm p-3`}
        >
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold m-0">My Chats</h5>
                <GroupChatModal>
                    <Button
                        size="sm"
                        className="d-flex align-items-center gap-1 bg-orange-gradient border-0 px-3 py-1 rounded-pill fw-bold"
                    >
                        <Plus size={16} /> New Group
                    </Button>
                </GroupChatModal>
            </div>
            <div className="overflow-auto flex-grow-1 custom-scrollbar">
                {chats ? (
                    <Stack gap={2}>
                        {chats.map((chat) => (
                            <Card
                                key={chat._id}
                                onClick={() => setSelectedChat(chat)}
                                className={`p-3 border-0 transition rounded-3 ${selectedChat?._id === chat._id ? "bg-orange-gradient text-white shadow-sm" : "bg-light-orange-card"
                                    }`}
                                style={{ cursor: "pointer" }}
                            >
                                <div className="fw-bold text-truncate">
                                    {!chat.isGroupChat
                                        ? chat.users[0]._id === user._id
                                            ? chat.users[1].name
                                            : chat.users[0].name
                                        : chat.chatName}
                                </div>
                                <div className="small opacity-75 text-truncate">
                                    {chat.latestMessage ? chat.latestMessage.content : "Tap to start chatting"}
                                </div>
                            </Card>
                        ))}
                    </Stack>
                ) : (
                    <ChatLoading />
                )}
            </div>
        </div>
    );
};
export default MyChats;
