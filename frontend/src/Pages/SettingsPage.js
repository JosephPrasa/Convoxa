import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { ChevronRight, Settings, AlertTriangle, Ban, HelpCircle, FileText, Info, MessageCircle, Globe, Search, CreditCard, VolumeX } from "lucide-react";
import Sidebar from "../Components/miscellaneous/Sidebar";
import { ChatState } from "../Context/ChatProvider";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
    const [activeSetting, setActiveSetting] = useState("Edit Profile");
    const { user } = ChatState();
    const navigate = useNavigate();

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

    const handleSettingClick = (item) => {
        if (item === "Privacy Centre") {
            navigate("/privacy");
        } else if (item === "Supervision for Teen Accounts") {
            navigate("/supervision");
        } else {
            setActiveSetting(item);
        }
    };

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
                                                    onClick={() => handleSettingClick(item)}
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
                        <div className="p-5 mw-100" style={{ maxWidth: "800px", margin: "0 auto" }}>
                            <h3 className="mb-4">{activeSetting}</h3>

                            {activeSetting === "Account Status" ? (
                                <div className="p-4 border border-secondary rounded-4 bg-glass">
                                    <div className="text-center mb-5">
                                        <img
                                            src={user?.pic}
                                            alt={user?.name}
                                            className="rounded-circle mb-3 border border-secondary"
                                            style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                        />
                                        <h4 className="fw-bold mb-1">{user?.name}</h4>
                                        <p className="text-secondary">{user?.email}</p>
                                    </div>

                                    <div className="mb-5 text-center px-lg-5">
                                        <p className="text-white-50" style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
                                            See any actions Convoxa has taken when your account or content doesn't
                                            follow our standards. <span className="text-primary cursor-pointer text-decoration-none">Learn more about Account Status</span>
                                        </p>
                                    </div>

                                    <div className="d-flex flex-column gap-3">
                                        {/* Removed Content Item */}
                                        <div className="d-flex align-items-center justify-content-between p-3 rounded-3 bg-secondary bg-opacity-10 cursor-pointer hover-bg-glass transition-200">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="p-2 rounded-circle bg-danger bg-opacity-20 text-danger">
                                                    <AlertTriangle size={20} />
                                                </div>
                                                <div>
                                                    <h6 className="mb-0">Removed content and messaging issues</h6>
                                                    <p className="mb-0 text-secondary small">No issues found</p>
                                                </div>
                                            </div>
                                            <ChevronRight size={18} className="text-secondary" />
                                        </div>

                                        {/* Features you can't use Item */}
                                        <div className="d-flex align-items-center justify-content-between p-3 rounded-3 bg-secondary bg-opacity-10 cursor-pointer hover-bg-glass transition-200">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="p-2 rounded-circle bg-warning bg-opacity-20 text-warning">
                                                    <Ban size={20} />
                                                </div>
                                                <div>
                                                    <h6 className="mb-0">Features you can't use</h6>
                                                    <p className="mb-0 text-secondary small">You have full access</p>
                                                </div>
                                            </div>
                                            <ChevronRight size={18} className="text-secondary" />
                                        </div>
                                    </div>
                                </div>
                            ) : activeSetting === "Help" ? (
                                <div className="d-flex flex-column gap-4">
                                    <div className="p-0 bg-transparent">
                                        {[
                                            { icon: <HelpCircle size={20} />, text: "Help Centre" },
                                            { icon: <Info size={20} />, text: "Account Status", onClick: () => setActiveSetting("Account Status") },
                                            { icon: <FileText size={20} />, text: "Privacy and security help" },
                                            { icon: <MessageCircle size={20} />, text: "Support requests" }
                                        ].map((item, idx) => (
                                            <div key={idx}
                                                className="d-flex align-items-center justify-content-between p-3 rounded-3 cursor-pointer hover-bg-glass transition-200 mb-2"
                                                onClick={item.onClick}
                                                style={{ background: "rgba(255,255,255,0.03)" }}>
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="text-secondary">{item.icon}</div>
                                                    <span className="fw-medium">{item.text}</span>
                                                </div>
                                                <ChevronRight size={18} className="text-secondary" />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-4">
                                        <h5 className="fw-bold mb-4">Tell us how we're doing</h5>
                                        <div className="p-4 rounded-4 bg-secondary bg-opacity-10">
                                            <p className="mb-4 fw-medium">How satisfied or dissatisfied are you with the help you received for this issue?</p>
                                            <div className="d-flex justify-content-between gap-2">
                                                {['Very Dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Very Satisfied'].map((rating) => (
                                                    <div key={rating} className="text-center cursor-pointer p-2 rounded-3 hover-bg-glass transition-200 flex-grow-1"
                                                        style={{ background: "rgba(0,0,0,0.2)" }}>
                                                        <span style={{ fontSize: "0.8rem" }}>{rating}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : activeSetting === "Language" ? (
                                <div className="d-flex flex-column h-100">
                                    <h4 className="fw-bold mb-2">App language</h4>
                                    <p className="text-secondary mb-4">See buttons, titles and other texts on Convoxa in your preferred language.</p>

                                    <div className="position-relative mb-4">
                                        <Search className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary" size={20} />
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            className="form-control bg-secondary bg-opacity-10 border-0 text-white ps-5 py-2 rounded-3 placeholder-secondary"
                                            onChange={(e) => {
                                                const search = e.target.value.toLowerCase();
                                                const items = document.querySelectorAll('.language-item');
                                                items.forEach(item => {
                                                    const text = item.textContent.toLowerCase();
                                                    item.style.display = text.includes(search) ? 'flex' : 'none';
                                                });
                                            }}
                                            style={{ boxShadow: "none" }}
                                        />
                                    </div>

                                    <div className="overflow-auto custom-scrollbar flex-grow-1 pe-2" style={{ maxHeight: "calc(100vh - 350px)" }}>
                                        {[
                                            "Afrikaans", "Bahasa Indonesia", "Bahasa Melayu", "Dansk", "Deutsch", "English (UK)", "English (US)",
                                            "Español", "Español (España)", "Filipino", "Français", "Français (Canada)", "Italiano", "Magyar",
                                            "Nederlands", "Norsk", "Polski", "Português", "Português (Brasil)", "Română", "Suomi", "Svenska",
                                            "Tiếng Việt", "Türkçe", "Čeština", "Ελληνικά", "Български", "Русский", "Українська", "Српски",
                                            "עברית", "العربية", "فارسی", "हिन्दी", "ภาษาไทย", "中文 (简体)", "中文 (繁體)", "日本語", "한국어"
                                        ].map((lang) => (
                                            <div
                                                key={lang}
                                                className="language-item d-flex align-items-center justify-content-between p-3 rounded-3 cursor-pointer hover-bg-glass transition-200 mb-1"
                                                onClick={() => {
                                                    // Logic to handle selection if needed, visually just a radio button for now
                                                }}
                                            >
                                                <span className="fw-medium">{lang}</span>
                                                <div className={`rounded-circle border border-secondary d-flex align-items-center justify-content-center ${lang === "English (UK)" ? 'bg-primary border-primary' : 'bg-transparent'}`}
                                                    style={{ width: "22px", height: "22px" }}>
                                                    {lang === "English (UK)" && <div className="bg-white rounded-circle" style={{ width: "8px", height: "8px" }} />}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : activeSetting === "Subscriptions" ? (
                                <div className="d-flex flex-column h-100">
                                    <h4 className="fw-bold mb-4">Subscriptions</h4>

                                    <div className="d-flex flex-column align-items-center justify-content-center text-center p-5 rounded-4 bg-secondary bg-opacity-10 mb-4">
                                        <div className="p-3 rounded-circle bg-secondary bg-opacity-20 mb-3">
                                            <CreditCard size={32} className="text-secondary" />
                                        </div>
                                        <h5 className="fw-bold mb-2">No subscriptions</h5>
                                        <p className="text-secondary mb-0">You don't have any active subscriptions.</p>
                                    </div>

                                    <div className="d-flex flex-column gap-2">
                                        {["Settings", "Help & support"].map((item) => (
                                            <div key={item}
                                                className="d-flex align-items-center justify-content-between p-3 rounded-3 cursor-pointer hover-bg-glass transition-200"
                                                style={{ background: "rgba(255,255,255,0.03)" }}>
                                                <span className="fw-medium">{item}</span>
                                                <ChevronRight size={18} className="text-secondary" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : activeSetting === "Like and share counts" ? (
                                <div className="d-flex flex-column h-100">
                                    <h4 className="fw-bold mb-4">Like and share counts</h4>

                                    <div className="p-4 rounded-4 bg-secondary bg-opacity-10">
                                        <h6 className="fw-bold mb-3">Like and share counts</h6>
                                        <div className="d-flex align-items-center justify-content-between mb-2">
                                            <span className="fw-medium">Hide like and share counts</span>
                                            <Form.Check
                                                type="switch"
                                                id="hide-likes-switch"
                                                className="custom-switch"
                                            />
                                        </div>
                                        <p className="text-secondary small mb-0">
                                            Hide like and share counts one time only
                                        </p>
                                    </div>
                                </div>
                            ) : activeSetting === "Content preferences" ? (
                                <div className="d-flex flex-column h-100">
                                    <h4 className="fw-bold mb-4">Content preferences</h4>
                                    <div className="d-flex flex-column gap-2">
                                        {["Content from accounts that you don't follow", "Sensitive content"].map((item) => (
                                            <div key={item}
                                                className="d-flex align-items-center justify-content-between p-3 rounded-3 cursor-pointer hover-bg-glass transition-200"
                                                style={{ background: "rgba(255,255,255,0.03)" }}>
                                                <span className="fw-medium">{item}</span>
                                                <ChevronRight size={18} className="text-secondary" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : activeSetting === "Muted accounts" ? (
                                <div className="d-flex flex-column h-100">
                                    <h4 className="fw-bold mb-4">Muted accounts</h4>

                                    <div className="d-flex flex-column align-items-center justify-content-center text-center p-5 rounded-4 bg-secondary bg-opacity-10 flex-grow-1" style={{ maxHeight: "400px" }}>
                                        <div className="p-3 rounded-circle bg-secondary bg-opacity-20 mb-3">
                                            <VolumeX size={32} className="text-secondary" />
                                        </div>
                                        <p className="text-secondary mb-0 fw-medium">You haven't muted anyone.</p>
                                    </div>
                                </div>
                            ) : activeSetting === "Archiving and downloading" ? (
                                <div className="d-flex flex-column h-100">
                                    <h4 className="fw-bold mb-4">Archiving and downloading</h4>

                                    <div className="p-4 rounded-4 bg-secondary bg-opacity-10 mb-3">
                                        <h6 className="fw-bold mb-3">Saving to archive</h6>
                                        <div className="d-flex align-items-center justify-content-between mb-2">
                                            <span className="fw-medium">Save story to archive</span>
                                            <Form.Check
                                                type="switch"
                                                id="save-story-archive-switch"
                                                className="custom-switch"
                                            />
                                        </div>
                                        <p className="text-secondary small mb-0" style={{ maxWidth: "90%" }}>
                                            Automatically save photos and videos to your archive so you don't have to save them to your phone. Only you can see your archive.
                                        </p>
                                    </div>
                                </div>
                            ) : activeSetting === "Accessibility" ? (
                                <div className="d-flex flex-column h-100">
                                    <h4 className="fw-bold mb-4">Accessibility</h4>

                                    <div className="p-4 rounded-4 bg-secondary bg-opacity-10">
                                        <div className="d-flex align-items-center justify-content-between mb-2">
                                            <span className="fw-medium">Reduce motion</span>
                                            <Form.Check
                                                type="switch"
                                                id="reduce-motion-switch"
                                                className="custom-switch"
                                            />
                                        </div>
                                        <p className="text-secondary small mb-0" style={{ maxWidth: "80%" }}>
                                            Reduce the motion for visual effects in your chats.
                                        </p>
                                    </div>
                                </div>
                            ) : activeSetting === "Website permissions" ? (
                                <div className="d-flex flex-column gap-4">
                                    <div className="p-0 bg-transparent">
                                        <div className="d-flex align-items-center justify-content-between p-3 rounded-3 cursor-pointer hover-bg-glass transition-200"
                                            style={{ background: "rgba(255,255,255,0.03)" }}>
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="text-secondary"><Globe size={20} /></div>
                                                <span className="fw-medium">Apps and websites</span>
                                            </div>
                                            <ChevronRight size={18} className="text-secondary" />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-5 border border-secondary rounded-4 d-flex flex-column align-items-center justify-content-center text-center text-muted"
                                    style={{ minHeight: "300px", background: "rgba(255,255,255,0.02)" }}>
                                    <Settings size={48} className="mb-3 opacity-50" />
                                    <p>Settings for <strong>{activeSetting}</strong> are coming soon.</p>
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>

                <style>{`
                    .hover-bg-glass:hover {
                        background-color: rgba(255, 255, 255, 0.08) !important;
                    }
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 6px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background-color: rgba(255, 255, 255, 0.2);
                        border-radius: 4px;
                    }
                    .transition-200 {
                        transition: all 0.2s ease;
                    }
                    .bg-glass {
                        background: rgba(25, 25, 28, 0.6);
                        backdrop-filter: blur(10px);
                    }
                    .placeholder-secondary::placeholder {
                        color: rgba(255, 255, 255, 0.5);
                    }
                    .custom-switch .form-check-input {
                        background-color: rgba(255, 255, 255, 0.1);
                        border-color: rgba(255, 255, 255, 0.2);
                        cursor: pointer;
                        width: 40px;
                        height: 20px;
                    }
                    .custom-switch .form-check-input:checked {
                        background-color: #0d6efd;
                        border-color: #0d6efd;
                    }
                    .custom-switch .form-check-input:focus {
                        box-shadow: none;
                        border-color: rgba(255, 255, 255, 0.5);
                    }
                `}</style>
            </Container>
        </div >
    );
};

export default SettingsPage;
