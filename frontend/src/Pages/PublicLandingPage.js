import React from "react";
import { Container, Row, Col, Button, Card, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageSquare, Users, Zap, Shield, Smartphone, Globe } from "lucide-react";

const PublicLandingPage = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: <Users size={32} className="text-primary" />,
            title: "Discover People",
            description: "Explore a vibrant community and find people with similar interests, just like on Instagram."
        },
        {
            icon: <MessageSquare size={32} className="text-success" />,
            title: "Private Messaging",
            description: "Chat securely with your connections in a clean, WhatsApp-inspired interface."
        },
        {
            icon: <Zap size={32} className="text-warning" />,
            title: "Real-time Stories",
            description: "Share your moments with 24-hour statuses that keep your friends updated."
        }
    ];

    return (
        <div className="bg-dark text-white min-vh-100" style={{ fontFamily: "'Inter', sans-serif" }}>
            {/* Navbar */}
            <Navbar expand="lg" variant="dark" className="py-3 border-bottom border-secondary">
                <Container>
                    <Navbar.Brand className="fw-bold fs-3 instagram-logo">Convoxa</Navbar.Brand>
                    <Nav className="ms-auto">
                        <Button variant="outline-light" className="rounded-pill px-4 me-2" onClick={() => navigate("/auth")}>Login</Button>
                        <Button className="bg-rose-gradient border-0 rounded-pill px-4" onClick={() => navigate("/auth")}>Sign Up</Button>
                    </Nav>
                </Container>
            </Navbar>

            {/* Hero Section */}
            <section className="py-5 position-relative overflow-hidden">
                <div className="position-absolute top-0 start-50 translate-middle" style={{ width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(166, 77, 121, 0.1) 0%, transparent 70%)', zIndex: 0 }}></div>
                <Container className="py-5 position-relative" style={{ zIndex: 1 }}>
                    <Row className="align-items-center">
                        <Col lg={6} className="text-center text-lg-start mb-5 mb-lg-0">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="display-3 fw-bold mb-4"
                            >
                                Convoxa – <span className="text-rose">Discover</span> & <span className="text-success">Chat</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="fs-4 text-secondary mb-5"
                            >
                                Discover people like Instagram. Chat privately like WhatsApp. The complete social experience.
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                <Button size="lg" className="bg-rose-gradient border-0 rounded-pill px-5 py-3 fw-bold shadow-lg me-3 mb-3" onClick={() => navigate("/auth")}>
                                    Get Started Free
                                </Button>
                                <Button size="lg" variant="outline-light" className="rounded-pill px-5 py-3 fw-bold mb-3">
                                    Learn More
                                </Button>
                            </motion.div>
                        </Col>
                        <Col lg={6}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                className="position-relative"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
                                    alt="Convoxa Preview"
                                    className="img-fluid rounded-4 shadow-2xl border border-secondary"
                                    style={{ transform: 'rotate(-2deg)' }}
                                />
                                <div className="position-absolute bottom-0 end-0 bg-white text-dark p-3 rounded-4 shadow-lg mb-n3 me-n3 d-none d-md-block" style={{ width: '200px' }}>
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <div className="bg-success rounded-circle" style={{ width: '10px', height: '10px' }}></div>
                                        <span className="fw-bold small">10k+ Active Users</span>
                                    </div>
                                    <p className="small text-muted mb-0">Join the fastest growing social community.</p>
                                </div>
                            </motion.div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Feature Section */}
            <section className="py-5 bg-black bg-opacity-50">
                <Container className="py-5">
                    <Row className="justify-content-center text-center mb-5">
                        <Col lg={8}>
                            <h2 className="display-5 fw-bold mb-3">Everything you need</h2>
                            <p className="text-secondary fs-5">Convoxa combines the best of social discovery and private messaging into one seamless app.</p>
                        </Col>
                    </Row>
                    <Row className="g-4">
                        {features.map((feature, idx) => (
                            <Col key={idx} md={4}>
                                <Card className="h-100 bg-dark border border-secondary rounded-4 p-4 hover-lift transition-all">
                                    <div className="bg-secondary bg-opacity-25 rounded-3 p-3 d-inline-block mb-4">
                                        {feature.icon}
                                    </div>
                                    <h4 className="fw-bold mb-3">{feature.title}</h4>
                                    <p className="text-secondary">{feature.description}</p>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            <style>{`
                .text-rose { color: #A64D79; }
                .bg-rose-gradient { background: linear-gradient(135deg, #6A1E55, #A64D79); }
                .hover-lift:hover { transform: translateY(-10px); border-color: #A64D79 !important; }
                .transition-all { transition: all 0.3s ease; }
                .instagram-logo {
                    font-family: 'Instagram', 'Billabong', cursive;
                    font-weight: 400;
                }
                @font-face {
                    font-family: 'Instagram';
                    src: url('https://fonts.cdnfonts.com/s/14894/Billabong.woff') format('woff');
                }
            `}</style>
        </div>
    );
};

export default PublicLandingPage;
