import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Image, Button, Navbar } from "react-bootstrap";
import { MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "../Components/miscellaneous/Sidebar";


const LandingPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (!userInfo) {
            navigate("/");
        } else {
            setUser(userInfo);
        }
    }, [navigate]);

    if (!user) return null;

    return (
        <div style={{ background: "var(--rose-gradient)", minHeight: "100vh", fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif", color: "var(--text-primary)" }}>
            <Sidebar user={user} />

            {/* Mobile Header */}
            <div className="d-lg-none">
                <Navbar className="border-bottom py-2 sticky-top mb-4 shadow-sm" style={{ background: "rgba(26, 26, 29, 0.8)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(255,255,255,0.1) !important" }}>
                    <Container className="d-flex justify-content-between align-items-center">
                        <Navbar.Brand
                            className="fw-bold instagram-logo text-white fs-4"
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate("/")}
                        >
                            Convoxa
                        </Navbar.Brand>
                        <MessageSquare size={22} className="cursor-pointer text-white" onClick={() => navigate("/chats")} />
                    </Container>
                </Navbar>
            </div>

            <Container className="ms-lg-auto me-lg-0 pe-lg-5" style={{ maxWidth: "calc(935px + 245px)", paddingLeft: "15px", paddingTop: "30px" }}>
                <div className="text-center mt-5 pt-5">
                    <h3 className="text-muted fw-light">No posts yet</h3>
                </div>
            </Container>

            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .instagram-logo {
                    font-family: 'Instagram', 'Billabong', cursive;
                    font-weight: 400;
                }
            `}</style>
        </div>
    );
};

export default LandingPage;
