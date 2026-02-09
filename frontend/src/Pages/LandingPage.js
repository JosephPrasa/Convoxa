import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Image, Button, Navbar } from "react-bootstrap";
import {
    MessageSquare, Heart, Bookmark,
    MessageCircle, Send, MoreHorizontal
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "../Components/miscellaneous/Sidebar";
import StatusFeed from "../Components/StatusFeed";

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

    const feedPosts = [
        {
            id: 1,
            user: "adri_t",
            userImg: "https://i.pravatar.cc/150?u=a042581f4e29026704e",
            postImg: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1000",
            likes: 1243,
            caption: "Late night coding sessions are the best. Building something amazing with Convoxa! #coding #mern #premium",
            time: "2 HOURS AGO"
        },
        {
            id: 2,
            user: "sophie_m",
            userImg: "https://i.pravatar.cc/150?u=a042581f4e29026704a",
            postImg: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
            likes: 856,
            caption: "Clean code, happy life. Just finished refactoring the core logic. 🚀",
            time: "4 HOURS AGO"
        }
    ];

    if (!user) return null;

    return (
        <div style={{ background: "linear-gradient(135deg, #1A1A1D 0%, #3B1C32 100%)", minHeight: "100vh", fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif", color: "white" }}>
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
                <Row className="justify-content-center">
                    <Col lg={10} xl={9}>
                        <Row className="g-4">
                            {/* Feed Column */}
                            <Col lg={8}>
                                {/* Stories Bar */}
                                <StatusFeed />

                                {/* Feed Posts */}
                                {feedPosts.map(post => (
                                    <motion.div
                                        key={post.id}
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        className="mb-4"
                                    >
                                        <Card className="border-0 shadow-lg rounded-4 overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)" }}>
                                            {/* Post Header */}
                                            <Card.Header className="border-0 py-3 d-flex align-items-center justify-content-between" style={{ background: "transparent" }}>
                                                <div className="d-flex align-items-center gap-2">
                                                    <div className="bg-rose-gradient-border p-0.5 rounded-circle">
                                                        <div className="bg-dark p-0.5 rounded-circle">
                                                            <Image src={post.userImg} roundedCircle width={32} height={32} />
                                                        </div>
                                                    </div>
                                                    <span className="fw-bold small text-white">{post.user}</span>
                                                </div>
                                                <MoreHorizontal size={18} className="cursor-pointer text-white opacity-50" />
                                            </Card.Header>

                                            {/* Post Image */}
                                            <div style={{ position: "relative", paddingTop: "100%", overflow: "hidden" }}>
                                                <Image
                                                    src={post.postImg}
                                                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
                                                />
                                            </div>

                                            {/* Post Actions */}
                                            <Card.Body className="p-3">
                                                <div className="d-flex justify-content-between mb-3 text-white">
                                                    <div className="d-flex gap-3">
                                                        <Heart size={24} className="cursor-pointer hover-rose" />
                                                        <MessageCircle size={24} className="cursor-pointer" />
                                                        <Send size={24} className="cursor-pointer" />
                                                    </div>
                                                    <Bookmark size={24} className="cursor-pointer" />
                                                </div>
                                                <p className="fw-bold small mb-2 text-white">{post.likes.toLocaleString()} likes</p>
                                                <p className="small mb-2 text-white opacity-90">
                                                    <span className="fw-bold me-2">{post.user}</span>
                                                    {post.caption}
                                                </p>
                                                <p className="text-white opacity-50" style={{ fontSize: "10px" }}>{post.time}</p>
                                            </Card.Body>

                                            {/* Comment Input */}
                                            <Card.Footer className="border-top-0 p-3" style={{ background: "rgba(0,0,0,0.2)" }}>
                                                <div className="d-flex align-items-center gap-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Add a comment..."
                                                        className="form-control border-0 shadow-none small p-0 fw-medium bg-transparent text-white"
                                                        style={{ fontSize: "14px" }}
                                                    />
                                                    <Button variant="link" className="text-rose fw-bold p-0 text-decoration-none small shadow-none">Post</Button>
                                                </div>
                                            </Card.Footer>
                                        </Card>
                                    </motion.div>
                                ))}
                            </Col>

                            {/* Sidebar Suggestions Column */}
                            <Col lg={4} className="d-none d-lg-block">
                                <div className="sticky-top" style={{ top: "30px" }}>
                                    <div className="d-flex align-items-center justify-content-between mb-4 px-2">
                                        <div className="d-flex align-items-center gap-3">
                                            <Image src={user.pic} roundedCircle width={56} height={56} className="border border-secondary shadow-sm" />
                                            <div>
                                                <p className="fw-bold mb-0 small text-white">{user.name.split(' ')[0].toLowerCase()}_dev</p>
                                                <p className="text-white opacity-50 mb-0 small" style={{ fontSize: "12px" }}>{user.name}</p>
                                            </div>
                                        </div>
                                        <Button variant="link" className="text-info fw-bold p-0 text-decoration-none small shadow-none" style={{ fontSize: "12px" }}>Switch</Button>
                                    </div>

                                    <div className="px-2">
                                        <div className="d-flex justify-content-between mb-3 border-bottom pb-2 border-secondary">
                                            <span className="text-white opacity-50 fw-bold small">Suggested for you</span>
                                            <span className="text-white fw-bold small cursor-pointer" style={{ fontSize: "12px" }} onClick={() => navigate("/discover")}>See All</span>
                                        </div>

                                        {[
                                            { id: 1, name: "dev_architect", rel: "Followed by adri_t", img: "https://i.pravatar.cc/150?u=12" },
                                            { id: 2, name: "code_ninja", rel: "New to Convoxa", img: "https://i.pravatar.cc/150?u=13" },
                                            { id: 3, name: "ux_queen", rel: "Followed by sophie_m", img: "https://i.pravatar.cc/150?u=14" }
                                        ].map(suggest => (
                                            <div key={suggest.id} className="d-flex align-items-center justify-content-between mb-3">
                                                <div className="d-flex align-items-center gap-3">
                                                    <Image src={suggest.img} roundedCircle width={32} height={32} />
                                                    <div>
                                                        <p className="fw-bold mb-0 small text-white" style={{ fontSize: "13px" }}>{suggest.name}</p>
                                                        <p className="text-white opacity-50 mb-0 small" style={{ fontSize: "11px" }}>{suggest.rel}</p>
                                                    </div>
                                                </div>
                                                <Button variant="link" className="text-info fw-bold p-0 text-decoration-none small shadow-none" style={{ fontSize: "12px" }} onClick={() => navigate("/discover")}>Follow</Button>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-5 px-2 opacity-50">
                                        <p className="text-white small" style={{ fontSize: "11px", letterSpacing: "0.5px" }}>
                                            About · Help · Press · API · Jobs · Privacy · Terms · Locations · Language · Convoxa Verified
                                        </p>
                                        <p className="text-white small mt-3" style={{ fontSize: "11px" }}>
                                            © 2026 CONVOXA FROM PREMIUM MERN
                                        </p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>

            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .instagram-logo {
                    font-family: 'Instagram', 'Billabong', cursive;
                    font-weight: 400;
                }
                .bg-rose-gradient-border {
                    background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
                }
                .hover-rose:hover { color: #A64D79; fill: #A64D79; }
                .text-rose { color: #A64D79 !important; }
            `}</style>
        </div>
    );
};

export default LandingPage;
