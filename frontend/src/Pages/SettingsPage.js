import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ChevronRight, Settings } from "lucide-react";
import Sidebar from "../Components/miscellaneous/Sidebar";
import { ChatState } from "../Context/ChatProvider";

const SettingsPage = () => {
    const [activeSetting, setActiveSetting] = useState("Edit Profile");
    const { user } = ChatState();

    const settingsMenu = [
        {
            category: "How you use Convoxa",
            items: ["Edit Profile", "Notifications"]
        },
        {
            category: "For professionals",
            items: ["Professional account", "Creator tools and controls"]
        },
        {
            category: "Who can see your content",
            items: ["Account privacy", "Close Friends", "Blocked", "Story and location"]
        },
        {
            category: "How others can interact with you",
            items: ["Messages and story replies", "Tags and mentions", "Comments", "Sharing and reuse", "Restricted accounts", "Hidden words"]
        },
        {
            category: "What you see",
            items: ["Muted accounts", "Content preferences", "Like and share counts", "Subscriptions"]
        },
        {
            category: "Your app and media",
            items: ["Archiving and downloading", "Accessibility", "Language", "Website permissions"]
        },
        {
            category: "Family Centre",
            items: ["Supervision for Teen Accounts"]
        },
        {
            category: "More info and support",
            items: ["Help", "Privacy Centre", "Account Status"]
        }
    ];

    return (
        <div style={{ display: "flex", width: "100vw" }}>
            {user && <Sidebar user={user} />}
            <Container fluid className="p-0 text-white" style={{ height: "100vh", overflow: "hidden", marginLeft: "72px", width: "calc(100% - 72px)" }}>
                <Row className="h-100 g-0">
                    {/* Internal Settings Sidebar */}
                    <Col md={3} lg={3} className="h-100 border-end border-secondary overflow-auto custom-scrollbar"
                        style={{ background: "var(--charcoal)", maxWidth: "300px" }}>
                        <div className="p-4">
                            <h2 className="mb-4 fw-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>Settings</h2>

                            <div className="d-flex flex-column gap-4">
                                {settingsMenu.map((section, idx) => (
                                    <div key={idx}>
                                        <h6 className="text-white-50 form-text mb-3 px-2 text-uppercase" style={{ fontSize: "0.75rem", letterSpacing: "1px" }}>
                                            {section.category}
                                        </h6>
                                        <div className="d-flex flex-column">
                                            {section.items.map((item) => (
                                                <div
                                                    key={item}
                                                    className={`p-3 rounded-3 cursor-pointer d-flex align-items-center justify-content-between transition-200 ${activeSetting === item ? 'bg-white bg-opacity-10' : 'hover-bg-glass'}`}
                                                    onClick={() => setActiveSetting(item)}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    <span className="fs-6" style={{ fontWeight: activeSetting === item ? "500" : "400" }}>{item}</span>
                                                    {activeSetting === item && <ChevronRight size={16} className="text-white-50" />}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Col>

                    {/* Content Area */}
                    <Col className="h-100 overflow-auto custom-scrollbar bg-black bg-opacity-25">
                        <div className="p-5 mw-100" style={{ maxWidth: "800px" }}>
                            <h3 className="mb-4">{activeSetting}</h3>
                            <div className="p-5 border border-secondary rounded-4 d-flex flex-column align-items-center justify-content-center text-center text-muted"
                                style={{ minHeight: "300px", background: "rgba(255,255,255,0.02)" }}>
                                <Settings size={48} className="mb-3 opacity-50" />
                                <p>Settings for <strong>{activeSetting}</strong> are coming soon.</p>
                            </div>
                        </div>
                    </Col>
                </Row>

                <style>{`
                    .hover-bg-glass:hover {
                        background-color: rgba(255, 255, 255, 0.05);
                    }
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 6px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background-color: rgba(255, 255, 255, 0.2);
                        border-radius: 4px;
                    }
                `}</style>
            </Container>
        </div>
    );
};

export default SettingsPage;
