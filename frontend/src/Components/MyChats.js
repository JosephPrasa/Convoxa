import React, { useEffect, useCallback } from "react";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import { Button, Stack, Image } from "react-bootstrap";
import { Plus, Search } from "lucide-react";
import ChatLoading from "./miscellaneous/ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import io from "socket.io-client";

const MyChats = ({ fetchAgain }) => {
    const { selectedChat, setSelectedChat, user, chats, setChats, notification } = ChatState();

    const [onlineUsers, setOnlineUsers] = React.useState(new Set());

    const getUnreadCount = (chatId) => {
        return notification.filter((n) => n.chat._id === chatId).length;
    };

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

        const socket = io("http://localhost:5000");
        socket.emit("setup", user);

        socket.on("user-online", (userId) => {
            setOnlineUsers((prev) => new Set(prev).add(userId));
        });

        socket.on("user-offline", (userId) => {
            setOnlineUsers((prev) => {
                const next = new Set(prev);
                next.delete(userId);
                return next;
            });
        });

        return () => socket.disconnect();
    }, [fetchAgain, fetchChats, user]);

    const isUserOnline = (chatUsers) => {
        const otherUser = chatUsers.find(u => u._id !== user._id);
        return otherUser ? onlineUsers.has(otherUser._id) : false;
    };

    const getSender = (loggedUser, users) => {
        return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
    };

    const getSenderPic = (loggedUser, users) => {
        return users[0]._id === loggedUser._id ? users[1].pic : users[0].pic;
    };

    return (
        <div
            className={`d-${selectedChat ? "none" : "flex"} d-md-flex flex-column h-100 rounded-4 overflow-hidden shadow-lg glass-card`}
        >
            <div className="p-4 border-bottom border-secondary border-opacity-25">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="fw-bold m-0 text-white">Messages</h4>
                    <GroupChatModal>
                        <Button
                            variant="link"
                            className="p-0 text-rose shadow-none"
                        >
                            <Plus size={24} />
                        </Button>
                    </GroupChatModal>
                </div>

                <div className="bg-white bg-opacity-10 rounded-3 d-flex align-items-center px-3 py-2" style={{ border: "1px solid var(--glass-border)" }}>
                    <Search size={16} className="text-white opacity-50 me-2" />
                    <input
                        type="text"
                        placeholder="Search chats..."
                        className="bg-transparent border-0 text-white small w-100 shadow-none"
                        style={{ outline: "none", fontSize: "14px" }}
                    />
                </div>
            </div>

            <div className="overflow-auto flex-grow-1 no-scrollbar p-2">
                {chats ? (
                    <Stack gap={1}>
                        {chats.map((chat) => (
                            <div
                                key={chat._id}
                                onClick={() => setSelectedChat(chat)}
                                className={`p-3 transition-200 rounded-4 d-flex align-items-center gap-3 cursor-pointer ${selectedChat?._id === chat._id
                                    ? "bg-white bg-opacity-10 shadow-sm"
                                    : "hover-white-05"
                                    }`}
                            >
                                <div className="position-relative">
                                    <Image
                                        src={!chat.isGroupChat ? getSenderPic(user, chat.users) : "https://cdn-icons-png.flaticon.com/512/2354/2354573.png"}
                                        roundedCircle
                                        width={48}
                                        height={48}
                                        className="border border-secondary border-opacity-25"
                                    />
                                    {!chat.isGroupChat && (
                                        <div
                                            className={`position-absolute rounded-circle border border-dark ${isUserOnline(chat.users) ? 'bg-success' : 'bg-secondary'}`}
                                            style={{ width: "12px", height: "12px", right: "2px", bottom: "2px" }}
                                        ></div>
                                    )}
                                </div>
                                <div className="flex-grow-1 overflow-hidden">
                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                        <span className="fw-bold text-white text-truncate small">
                                            {!chat.isGroupChat ? getSender(user, chat.users) : chat.chatName}
                                        </span>
                                        <div className="d-flex flex-column align-items-end">
                                            <span className="text-white opacity-50 mb-1" style={{ fontSize: "10px" }}>12:45 PM</span>
                                            {getUnreadCount(chat._id) > 0 && (
                                                <div className="bg-rose text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "18px", height: "18px", fontSize: "10px", fontWeight: "bold" }}>
                                                    {getUnreadCount(chat._id)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-white opacity-50 text-truncate small" style={{ fontSize: "12px" }}>
                                        {chat.latestMessage ? chat.latestMessage.content : "Tap to start chatting"}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Stack>
                ) : (
                    <ChatLoading />
                )}
            </div>

            <style>{`
                .hover-white-05:hover { background: rgba(255, 255, 255, 0.05); }
                .bg-rose { background-color: #A64D79 !important; }
            `}</style>
        </div>
    );
};
export default MyChats;
