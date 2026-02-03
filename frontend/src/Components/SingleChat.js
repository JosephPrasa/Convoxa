import React, { useEffect, useState, useCallback } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Spinner, InputGroup, Button, Form } from "react-bootstrap";
import { ArrowLeft, Send, MoreVertical, Globe } from "lucide-react";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
import ProfileModal from "./miscellaneous/ProfileModal";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";

const ENDPOINT = "http://localhost:5000";
let socket;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const { selectedChat, setSelectedChat, user } = ChatState();

    const fetchMessages = useCallback(async () => {
        if (!selectedChat) return;
        try {
            setLoading(true);
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get(`/api/message/${selectedChat._id}`, config);
            setMessages(data);
            setLoading(false);
            socket.emit("join chat", selectedChat._id);
        } catch (error) {
            alert("Error fetching messages");
            setLoading(false);
        }
    }, [selectedChat, user.token]);

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        return () => socket.disconnect();
    }, [user]);

    useEffect(() => {
        fetchMessages();
    }, [selectedChat, fetchMessages]);

    useEffect(() => {
        const messageHandler = (newMessageReceived) => {
            if (!selectedChat || selectedChat._id !== newMessageReceived.chat._id) {
                // Notification logic
            } else {
                setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
            }
        };
        socket.on("message recieved", messageHandler);
        return () => socket.off("message recieved", messageHandler);
    }, [selectedChat]);

    const sendMessage = async (e) => {
        if ((e.key === "Enter" || e.type === "click") && newMessage) {
            try {
                const config = { headers: { "Content-type": "application/json", Authorization: `Bearer ${user.token}` } };
                setNewMessage("");
                const { data } = await axios.post("/api/message", { content: newMessage, chatId: selectedChat._id }, config);
                socket.emit("new message", data);
                setMessages((prevMessages) => [...prevMessages, data]);
            } catch (error) {
                alert("Msg error");
            }
        }
    };

    const getSender = (loggedUser, users) => {
        return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
    };

    const getSenderFull = (loggedUser, users) => {
        return users[0]._id === loggedUser._id ? users[1] : users[0];
    };

    return (
        <div className="d-flex flex-column h-100">
            {selectedChat ? (
                <>
                    <div className="d-flex align-items-center justify-content-between mb-3 px-2">
                        <div className="d-flex align-items-center gap-2">
                            <Button variant="light" className="d-md-none" onClick={() => setSelectedChat("")}><ArrowLeft size={20} /></Button>
                            <h5 className="m-0 fw-bold">
                                {!selectedChat.isGroupChat ? getSender(user, selectedChat.users) : selectedChat.chatName.toUpperCase()}
                            </h5>
                        </div>
                        {!selectedChat.isGroupChat ? (
                            <ProfileModal user={getSenderFull(user, selectedChat.users)}>
                                <Button variant="light border-0"><MoreVertical size={20} /></Button>
                            </ProfileModal>
                        ) : (
                            <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchMessages={fetchMessages}>
                                <Button variant="light border-0"><MoreVertical size={20} /></Button>
                            </UpdateGroupChatModal>
                        )}
                    </div>
                    <div className="flex-grow-1 bg-white rounded-4 p-3 mb-3 border-orange overflow-auto d-flex flex-column custom-scrollbar" style={{ boxShadow: "inset 0 2px 10px rgba(255, 78, 0, 0.05)" }}>
                        {loading ? <Spinner className="m-auto text-orange-gradient" /> : <ScrollableChat messages={messages} />}
                    </div>
                    <InputGroup className="bg-white rounded-pill shadow-sm overflow-hidden p-1 border">
                        <Form.Control
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={sendMessage}
                            placeholder="Write your message..."
                            className="border-0 shadow-none ps-3"
                        />
                        <Button onClick={sendMessage} className="bg-orange-gradient border-0 rounded-pill px-4 d-flex align-items-center justify-content-center">
                            <Send size={18} />
                        </Button>
                    </InputGroup>
                </>
            ) : (
                <div className="m-auto text-center">
                    <div className="bg-light-orange-card p-5 rounded-circle mb-4 d-inline-block">
                        <Globe size={64} style={{ color: "var(--primary-orange)", opacity: 0.5 }} />
                    </div>
                    <h4 className="text-muted fw-bold">Select a colleague to start chatting</h4>
                </div>
            )}
        </div>
    );
};
export default SingleChat;
