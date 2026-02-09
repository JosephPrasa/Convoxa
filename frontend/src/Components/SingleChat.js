import React, { useEffect, useState, useCallback } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Spinner, InputGroup, Button, Form, Image } from "react-bootstrap";
import { ArrowLeft, Send, MoreVertical, Globe, Phone, Video, Plus } from "lucide-react";
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
    const {
        selectedChat,
        setSelectedChat,
        user,
        notification,
        setNotification
    } = ChatState();

    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);

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
            console.error("Error fetching messages");
            setLoading(false);
        }
    }, [selectedChat, user.token]);

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on("connected", () => console.log("connected"));
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));

        return () => socket.disconnect();
    }, [user]);

    useEffect(() => {
        fetchMessages();
        // Clear notifications for the selected chat
        if (selectedChat) {
            setNotification(notification.filter((n) => n.chat._id !== selectedChat._id));
        }
    }, [selectedChat, fetchMessages, notification, setNotification]);

    useEffect(() => {
        const messageHandler = (newMessageReceived) => {
            if (!selectedChat || selectedChat._id !== newMessageReceived.chat._id) {
                if (!notification.includes(newMessageReceived)) {
                    setNotification([newMessageReceived, ...notification]);
                    setFetchAgain(!fetchAgain);
                }
            } else {
                setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
            }
        };
        socket.on("message recieved", messageHandler);
        return () => socket.off("message recieved", messageHandler);
    }, [selectedChat, notification, fetchAgain, setFetchAgain, setNotification]);

    const sendMessage = async (e) => {
        if ((e.key === "Enter" || e.type === "click") && newMessage) {
            socket.emit("stop typing", selectedChat._id);
            try {
                const config = { headers: { "Content-type": "application/json", Authorization: `Bearer ${user.token}` } };
                setNewMessage("");
                const { data } = await axios.post("/api/message", { content: newMessage, chatId: selectedChat._id }, config);
                socket.emit("new message", data);
                setMessages((prevMessages) => [...prevMessages, data]);
            } catch (error) {
                console.error("Msg error");
            }
        }
    };

    const typingHandler = (e) => {
        setNewMessage(e.target.value);

        if (!socket) return;

        if (!typing) {
            setTyping(true);
            socket.emit("typing", selectedChat._id);
        }
        let lastTypingTime = new Date().getTime();
        var timerLength = 3000;
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", selectedChat._id);
                setTyping(false);
            }
        }, timerLength);
    };

    const getSender = (loggedUser, users) => {
        return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
    };

    const getSenderFull = (loggedUser, users) => {
        return users[0]._id === loggedUser._id ? users[1] : users[0];
    };

    const postDetails = (pics) => {
        setLoading(true);
        if (pics === undefined) {
            alert("Please Select an Image!");
            return;
        }
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chat-app");
            data.append("cloud_name", "piyushkumar");
            fetch("https://api.cloudinary.com/v1_1/piyushkumar/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    sendImageMessage(data.url.toString());
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        } else {
            alert("Please Select an Image!");
            setLoading(false);
        }
    };

    const sendImageMessage = async (url) => {
        try {
            const config = { headers: { "Content-type": "application/json", Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.post("/api/message", { content: url, chatId: selectedChat._id, type: "image" }, config);
            socket.emit("new message", data);
            setMessages((prevMessages) => [...prevMessages, data]);
        } catch (error) {
            console.error("Msg error");
        }
    };

    return (
        <div className="d-flex flex-column h-100 p-0 text-white">
            {selectedChat ? (
                <>
                    {/* Unified Header */}
                    <div className="d-flex align-items-center justify-content-between p-3 border-bottom border-secondary border-opacity-25 bg-black bg-opacity-25">
                        <div className="d-flex align-items-center gap-3">
                            <Button variant="link" className="d-md-none text-white p-0" onClick={() => setSelectedChat("")}><ArrowLeft size={24} /></Button>
                            <Image
                                src={!selectedChat.isGroupChat ? getSenderFull(user, selectedChat.users).pic : "https://cdn-icons-png.flaticon.com/512/2354/2354573.png"}
                                roundedCircle
                                width={40}
                                height={40}
                                className="border border-secondary border-opacity-25"
                            />
                            <div>
                                <h6 className="m-0 fw-bold">
                                    {!selectedChat.isGroupChat ? getSender(user, selectedChat.users) : selectedChat.chatName}
                                </h6>
                                <span className="text-success small" style={{ fontSize: "11px" }}>{istyping ? "typing..." : "online"}</span>
                            </div>
                        </div>
                        <div className="d-flex align-items-center gap-3">
                            <Phone size={20} className="cursor-pointer opacity-75 hover-rose" />
                            <Video size={22} className="cursor-pointer opacity-75 hover-rose" />
                            {!selectedChat.isGroupChat ? (
                                <ProfileModal user={getSenderFull(user, selectedChat.users)}>
                                    <MoreVertical size={22} className="cursor-pointer opacity-75 hover-rose" />
                                </ProfileModal>
                            ) : (
                                <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} fetchMessages={fetchMessages}>
                                    <MoreVertical size={22} className="cursor-pointer opacity-75 hover-rose" />
                                </UpdateGroupChatModal>
                            )}
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-grow-1 p-4 overflow-auto d-flex flex-column no-scrollbar" style={{ background: "rgba(0,0,0,0.1)" }}>
                        {loading ? (
                            <div className="m-auto d-flex flex-column align-items-center gap-3">
                                <Spinner animation="border" style={{ color: "#A64D79" }} />
                                <span className="text-white opacity-50 small">Loading messages...</span>
                            </div>
                        ) : <ScrollableChat messages={messages} />}
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-black bg-opacity-25">
                        <InputGroup className="bg-white bg-opacity-10 rounded-pill overflow-hidden p-1 border border-secondary border-opacity-25 shadow-sm">
                            <Button variant="link" className="text-white opacity-75 p-2 shadow-none position-relative overflow-hidden">
                                <Plus size={22} />
                                <input
                                    type="file"
                                    className="position-absolute top-0 start-0 opacity-0 cursor-pointer"
                                    style={{ height: "40px", width: "100%" }}
                                    onChange={(e) => postDetails(e.target.files[0])}
                                />
                            </Button>
                            <Form.Control
                                value={newMessage}
                                onChange={typingHandler}
                                onKeyDown={sendMessage}
                                placeholder="Type a message..."
                                className="bg-transparent border-0 text-white shadow-none ps-3 small"
                                style={{ outline: "none", color: "white" }}
                            />
                            <Button onClick={sendMessage} className="bg-purple-gradient border-0 rounded-pill px-4 d-flex align-items-center justify-content-center shadow-none">
                                <Send size={20} className="text-white" />
                            </Button>
                        </InputGroup>
                    </div>
                </>
            ) : (
                <div className="m-auto text-center p-5">
                    <div className="bg-white bg-opacity-5 p-5 rounded-circle mb-4 d-inline-block border border-secondary border-opacity-10">
                        <Globe size={64} style={{ color: "#A64D79", opacity: 0.3 }} />
                    </div>
                    <h5 className="text-white opacity-90 fw-bold">Convoxa Direct</h5>
                    <p className="text-white opacity-50 small" style={{ maxWidth: "250px" }}>
                        Send private photos and messages to a friend or group.
                    </p>
                    <Button className="bg-purple-gradient border-0 rounded-pill px-4 py-2 mt-3 fw-bold small shadow-none">
                        Send Message
                    </Button>
                </div>
            )}

            <style>{`
                .hover-rose:hover { color: #A64D79 !important; }
                .bg-purple-gradient {
                    background: linear-gradient(135deg, #1A1A1D 0%, #3B1C32 50%, #6A1E55 100%);
                }
                .cursor-pointer { cursor: pointer; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                ::placeholder { color: rgba(255,255,255,0.4) !important; }
            `}</style>
        </div>
    );
};
export default SingleChat;
