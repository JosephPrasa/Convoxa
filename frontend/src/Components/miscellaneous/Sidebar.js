import React, { useState } from "react";
import { Nav, Image, Dropdown } from "react-bootstrap";
import {
    Home, Compass, MessageCircle,
    Menu
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import SettingsModal from "./SettingsModal";

const Sidebar = ({ user }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showSettings, setShowSettings] = useState(false);

    const menuItems = [
        { name: "Home", icon: <Home size={24} />, path: "/landing" },
        { name: "Discover", icon: <Compass size={24} />, path: "/discover" },
        { name: "Messages", icon: <MessageCircle size={24} />, path: "/chats" },
    ];

    if (!user) return null;

    return (
        <div className="instagram-sidebar d-none d-lg-flex flex-column border-end position-fixed h-100 text-white"
            style={{ width: "245px", zIndex: 1000, background: "linear-gradient(180deg, #1A1A1D 0%, #3B1C32 100%)" }}>
            <div className="p-4 mb-3">
                <h1
                    className="instagram-logo cursor-pointer m-0 text-white"
                    style={{ fontSize: "1.8rem" }}
                    onClick={() => navigate("/landing")}
                >
                    Convoxa
                </h1>
            </div>

            <Nav className="flex-column flex-grow-1 px-2">
                {menuItems.map((item) => (
                    <Nav.Link
                        key={item.name}
                        onClick={() => navigate(item.path)}
                        className={`d-flex align-items-center gap-3 px-3 py-3 rounded-3 text-white mb-1 sidebar-link ${location.pathname === item.path ? "active-link" : ""}`}
                    >
                        <span className={location.pathname === item.path ? "text-rose" : ""}>{item.icon}</span>
                        <span className="fs-6" style={{ fontWeight: location.pathname === item.path ? "bold" : "400" }}>{item.name}</span>
                    </Nav.Link>
                ))}

                <Nav.Link
                    onClick={() => navigate(`/profile/${user._id}`)}
                    className={`d-flex align-items-center gap-3 px-3 py-3 rounded-3 text-white mb-1 sidebar-link ${location.pathname === `/profile/${user._id}` ? "active-link" : ""}`}
                >
                    <Image src={user.pic} roundedCircle width={24} height={24} className="border border-secondary" />
                    <span className="fs-6" style={{ fontWeight: location.pathname === `/profile/${user._id}` ? "bold" : "400" }}>Profile</span>
                </Nav.Link>
            </Nav>

            <div className="p-2 mb-3">
                <Dropdown drop="up">
                    <Dropdown.Toggle variant="transparent" className="w-100 d-flex align-items-center gap-3 border-0 py-3 rounded-3 sidebar-link shadow-none text-white">
                        <Menu size={24} />
                        <span className="fs-6">More</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="shadow border-0 rounded-4 p-2 mb-2 bg-dark text-white" style={{ width: "266px" }}>
                        <Dropdown.Item className="rounded-3 py-3 text-white hover-dark" onClick={() => setShowSettings(true)}>Settings</Dropdown.Item>
                        <Dropdown.Item className="rounded-3 py-3 text-white hover-dark">Your activity</Dropdown.Item>
                        <Dropdown.Item className="rounded-3 py-3 text-white hover-dark">Saved</Dropdown.Item>
                        <Dropdown.Item className="rounded-3 py-3 text-white hover-dark" onClick={(e) => e.stopPropagation()}>Switch appearance</Dropdown.Item>
                        <Dropdown.Divider className="bg-secondary" />
                        <Dropdown.Item
                            onClick={() => { localStorage.removeItem("userInfo"); window.location.href = "/"; }}
                            className="rounded-3 py-3 text-danger"
                        >
                            Log out
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <SettingsModal show={showSettings} handleClose={() => setShowSettings(false)} />

            <style>{`
                .sidebar-link:hover {
                    background-color: rgba(255, 255, 255, 0.1) !important;
                }
                .active-link {
                    background-color: rgba(255, 255, 255, 0.05);
                }
                .text-rose { color: #A64D79; }
                .cursor-pointer { cursor: pointer; }
                .instagram-logo {
                    font-family: 'Instagram', 'Billabong', cursive;
                    font-weight: 400;
                }
                .hover-dark:hover { background-color: #333 !important; }
            `}</style>
        </div>
    );
};

export default Sidebar;
