import React from "react";
import { ChatState } from "../Context/ChatProvider";

const ScrollableChat = ({ messages }) => {
    const { user } = ChatState();

    return (
        <div className="d-flex flex-column gap-3">
            {messages?.map((m) => (
                <div
                    key={m._id}
                    className={`d-flex ${m.sender._id === user._id ? "justify-content-end" : "justify-content-start"}`}
                >
                    <div
                        className="transition-200 shadow-lg"
                        style={{
                            background: m.sender._id === user._id
                                ? "var(--premium-gradient)"
                                : "rgba(255, 255, 255, 0.08)",
                            color: "white",
                            padding: "8px 16px",
                            borderRadius: m.sender._id === user._id ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                            maxWidth: "75%",
                            border: "1px solid var(--glass-border)",
                            position: "relative"
                        }}
                    >
                        <div className="small fw-medium mb-1" style={{ fontSize: "14px", lineHeight: "1.4" }}>
                            {m.type === "image" ? (
                                <img
                                    src={m.content}
                                    alt="shared"
                                    style={{ maxWidth: "100%", borderRadius: "8px", cursor: "pointer" }}
                                    onClick={() => window.open(m.content, "_blank")}
                                />
                            ) : (
                                m.content
                            )}
                        </div>
                        <div
                            className="text-white opacity-40 text-end"
                            style={{ fontSize: "9px", marginTop: "4px" }}
                        >
                            12:46 PM
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ScrollableChat;
