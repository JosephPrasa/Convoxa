import React, { useState } from "react";
import { Nav, Image, Dropdown } from "react-bootstrap";
import {
    Home, Compass, MessageCircle,
    Menu
} from "lucide-react";
import { ChatState } from "../../Context/ChatProvider";
import { useNavigate, useLocation } from "react-router-dom";
import ReportProblemModal from "./ReportProblemModal";
import SwitchAccountModal from "./SwitchAccountModal";

const Sidebar = ({ user }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showReportProblem, setShowReportProblem] = useState(false);
    const [showSwitchAccount, setShowSwitchAccount] = useState(false);
    const { theme, setTheme } = ChatState();
    const [isHovered, setIsHovered] = useState(false);

    const menuItems = [
        { name: "Home", icon: <Home size={24} />, path: "/landing" },
        { name: "Discover", icon: <Compass size={24} />, path: "/discover" },
        { name: "Messages", icon: <MessageCircle size={24} />, path: "/chats" },
    ];

    if (!user) return null;

    return (
        <div 
            className="instagram-sidebar d-none d-lg-flex flex-column border-end position-fixed h-100 text-white"
            style={{ 
                width: isHovered ? "245px" : "72px", 
                zIndex: 1000, 
                background: "var(--rose-gradient)",
                transition: "width 0.3s ease-in-out"
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={`p-4 mb-3 ${!isHovered && "d-flex justify-content-center p-2"}`}>
                <h1
                    className="instagram-logo cursor-pointer m-0 text-white"
                    style={{ 
                        fontSize: "1.8rem", 
                        display: isHovered ? "block" : "none",
                        whiteSpace: "nowrap"
                    }}
                    onClick={() => window.location.href = "/landing"}
                >
                    Convoxa
                </h1>
                 <h1
                    className="instagram-logo cursor-pointer m-0 text-white"
                     style={{ 
                        fontSize: "1.8rem", 
                        display: !isHovered ? "block" : "none",
                     }}
                     onClick={() => window.location.href = "/landing"}
                >
                    C
                </h1>
            </div>

            <Nav className="flex-column flex-grow-1 px-2">
                {menuItems.map((item) => (
                    <Nav.Link
                        key={item.name}
                        onClick={() => navigate(item.path)}
                        className={`d-flex align-items-center gap-3 px-3 py-3 rounded-3 text-white mb-1 sidebar-link ${location.pathname === item.path ? "active-link" : ""}`}
                         style={{ justifyContent: isHovered ? "flex-start" : "center" }}
                    >
                        <span className={location.pathname === item.path ? "text-rose" : ""}>{item.icon}</span>
                        <span className="fs-6" style={{ 
                            fontWeight: location.pathname === item.path ? "bold" : "400",
                            display: isHovered ? "block" : "none",
                            whiteSpace: "nowrap",
                             opacity: isHovered ? 1 : 0,
                             transition: "opacity 0.2s ease-in"
                        }}>{item.name}</span>
                    </Nav.Link>
                ))}

                <Nav.Link
                    onClick={() => navigate(`/profile/${user._id}`)}
                    className={`d-flex align-items-center gap-3 px-3 py-3 rounded-3 text-white mb-1 sidebar-link ${location.pathname === `/profile/${user._id}` ? "active-link" : ""}`}
                     style={{ justifyContent: isHovered ? "flex-start" : "center" }}
                >
                    <Image src={user.pic} roundedCircle width={24} height={24} className="border border-secondary" />
                    <span className="fs-6" style={{ 
                        fontWeight: location.pathname === `/profile/${user._id}` ? "bold" : "400",
                        display: isHovered ? "block" : "none",
                         whiteSpace: "nowrap",
                         opacity: isHovered ? 1 : 0,
                         transition: "opacity 0.2s ease-in"
                    }}>Profile</span>
                </Nav.Link>
            </Nav>

            <div className="p-2 mb-3">
                <Dropdown drop={isHovered ? "up" : "end"}>
                    <Dropdown.Toggle variant="transparent" className="w-100 d-flex align-items-center gap-3 border-0 py-3 rounded-3 sidebar-link shadow-none text-white"
                     style={{ justifyContent: isHovered ? "flex-start" : "center" }}>
                        <Menu size={24} />
                        <span className="fs-6" style={{ 
                            display: isHovered ? "block" : "none",
                             whiteSpace: "nowrap",
                             opacity: isHovered ? 1 : 0,
                             transition: "opacity 0.2s ease-in"
                        }}>More</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="shadow border-0 rounded-4 p-2 mb-2 bg-dark text-white" style={{ width: "266px" }}>
                        <Dropdown.Item className="rounded-3 py-3 text-white hover-dark" onClick={() => navigate("/settings")}>Settings</Dropdown.Item>
                        <Dropdown.Item className="rounded-3 py-3 text-white hover-dark" onClick={() => navigate("/activity")}>Your activity</Dropdown.Item>
                        <Dropdown.Item className="rounded-3 py-3 text-white hover-dark" onClick={() => navigate(`/profile/${user._id}`)}>Saved</Dropdown.Item>
                        <Dropdown.Item
                            className="rounded-3 py-3 text-white hover-dark"
                            onClick={(e) => {
                                e.stopPropagation();
                                setTheme(theme === "dark" ? "light" : "dark");
                            }}
                        >
                            Switch appearance {theme === "dark" ? "(Dark)" : "(Light)"}
                        </Dropdown.Item>
                        <Dropdown.Item className="rounded-3 py-3 text-white hover-dark" onClick={() => setShowReportProblem(true)}>Report a problem</Dropdown.Item>

                        <Dropdown.Divider className="bg-secondary" />
                        <Dropdown.Item className="rounded-3 py-3 text-white hover-dark" onClick={() => setShowSwitchAccount(true)}>Switch accounts</Dropdown.Item>

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

            <ReportProblemModal show={showReportProblem} handleClose={() => setShowReportProblem(false)} />
            <SwitchAccountModal show={showSwitchAccount} handleClose={() => setShowSwitchAccount(false)} />

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
