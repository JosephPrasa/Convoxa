import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Navbar, Nav, Image, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MessageSquare, LogOut, Users, Zap, TrendingUp, Bell, ArrowRight } from "lucide-react";
import { ChatState } from "../Context/ChatProvider";

const Dashboard = () => {
    const navigate = useNavigate();
    const { user } = ChatState();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (!userInfo) {
            navigate("/");
        }
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, [navigate]);

    if (!user) return null;

    const stats = [
        { title: "Active Chats", value: "12", icon: <MessageSquare size={24} />, color: "#A64D79" },
        { title: "Connections", value: "84", icon: <Users size={24} />, color: "#6A1E55" },
        { title: "Messages", value: "1.2k", icon: <Zap size={24} />, color: "#3B1C32" },
        { title: "Growth", value: "+14%", icon: <TrendingUp size={24} />, color: "#1A1A1D" },
    ];

    const activities = [
        { id: 1, type: "Message", content: "Sophie Montgomery shared a new file", time: "2m ago" },
        { id: 2, type: "Connection", content: "Marcus Aurelius accepted your request", time: "1h ago" },
        { id: 3, type: "System", content: "Your profile was viewed by 5 people today", time: "3h ago" },
    ];

    return (
        <div style={{ background: "linear-gradient(135deg, #fdf2f8 0%, #f3e8ff 100%)", minHeight: "100vh" }}>
            {/* Simple Top Nav */}
            <Navbar bg="white" className="border-bottom shadow-sm px-4">
                <Navbar.Brand
                    className="fw-bold text-purple-gradient"
                    style={{ fontSize: "1.5rem", cursor: "pointer" }}
                    onClick={() => navigate("/")}
                >
                    CONVOXA
                </Navbar.Brand>
                <Nav className="ms-auto align-items-center gap-3">
                    <Button variant="light" className="rounded-circle p-2 border-0"><Bell size={20} /></Button>
                    <div className="d-flex align-items-center border-start ps-3 gap-2" onClick={() => navigate("/chats")} style={{ cursor: "pointer" }}>
                        <Image src={user.pic} roundedCircle width={32} height={32} />
                        <span className="fw-bold small d-none d-md-inline">{user.name.split(' ')[0]}</span>
                    </div>
                </Nav>
            </Navbar>

            <Container className="py-5">
                {/* Welcome Header */}
                <Row className="mb-5 align-items-center">
                    <Col md={8}>
                        <h2 className="display-6 fw-bold mb-1">Welcome back, <span className="text-purple-gradient">{user.name.split(' ')[0]}!</span></h2>
                        <p className="text-muted fs-5">{currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                    </Col>
                    <Col md={4} className="text-md-end">
                        <Button className="bg-purple-gradient border-0 rounded-pill px-4 py-2 fw-bold shadow-sm" onClick={() => navigate("/chats")}>
                            Resume Chatting <ArrowRight size={18} className="ms-2" />
                        </Button>
                    </Col>
                </Row>

                {/* Stats Grid */}
                <Row className="mb-5 g-4">
                    {stats.map((stat, idx) => (
                        <Col key={idx} xs={6} lg={3}>
                            <Card className="border-0 shadow-sm rounded-4 h-100 transition-hover">
                                <Card.Body className="p-4">
                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <div className="p-2 rounded-3" style={{ background: `${stat.color}15`, color: stat.color }}>{stat.icon}</div>
                                        <Badge bg="light" className="text-success small border">+5%</Badge>
                                    </div>
                                    <h3 className="fw-bold mb-0">{stat.value}</h3>
                                    <p className="small text-muted mb-0">{stat.title}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <Row className="g-4">
                    {/* Activity Feed */}
                    <Col lg={8}>
                        <Card className="border-0 shadow-sm rounded-4 h-100 overflow-hidden">
                            <Card.Header className="bg-white border-0 p-4">
                                <h5 className="fw-bold mb-0">Recent Activity</h5>
                            </Card.Header>
                            <Card.Body className="p-0">
                                {activities.map((activity, idx) => (
                                    <div key={idx} className="d-flex align-items-center p-4 border-top">
                                        <div className="rounded-circle bg-light p-3 me-3 d-flex align-items-center justify-content-center">
                                            {activity.type === "Message" ? <MessageSquare size={18} /> : <Users size={18} />}
                                        </div>
                                        <div className="flex-grow-1">
                                            <p className="mb-0 fw-medium">{activity.content}</p>
                                            <span className="small text-muted">{activity.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </Card.Body>
                            <Card.Footer className="bg-white border-0 p-4 text-center">
                                <Button variant="link" className="text-purple-gradient fw-bold text-decoration-none">View All Activity</Button>
                            </Card.Footer>
                        </Card>
                    </Col>

                    {/* Quick Profile Summary */}
                    <Col lg={4}>
                        <Card className="border-0 shadow-sm rounded-4 text-center p-4 bg-white">
                            <Image src={user.pic} roundedCircle width={100} height={100} className="mx-auto mb-3 border p-1 shadow-sm" />
                            <h5 className="fw-bold mb-1">{user.name}</h5>
                            <p className="small text-muted mb-4">{user.email}</p>
                            <hr className="my-4 opacity-10" />
                            <div className="d-grid gap-2">
                                <Button variant="light" className="text-start rounded-pill px-4 py-2 border-0 d-flex align-items-center gap-2">
                                    <LogOut size={16} /> Logout
                                </Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <style>{`
                .transition-hover:hover {
                    transform: translateY(-5px);
                    transition: all 0.3s ease;
                }
                .text-purple-gradient {
                    background: linear-gradient(to right, #6A1E55, #A64D79);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .bg-purple-gradient {
                    background: linear-gradient(135deg, #3B1C32 0%, #6A1E55 50%, #A64D79 100%) !important;
                }
            `}</style>
        </div>
    );
};

export default Dashboard;
