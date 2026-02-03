import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav, Button, Form, InputGroup, Row, Col, Card, Dropdown, Badge, Image } from "react-bootstrap";
import { Search, Globe, MapPin, Star, LayoutDashboard, MessageSquare, Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);
    }, []);

    const sampleProfiles = [
        {
            id: 1,
            name: "Dr. Adrian Thorne",
            skill: "Chief Technology Officer",
            location: "Greater London, UK",
            rating: 4.9,
            image: "https://ui-avatars.com/api/?name=Adrian+Thorne&background=ff4e00&color=fff&size=200"
        },
        {
            id: 2,
            name: "Sophie Montgomery",
            skill: "Principal UX Researcher",
            location: "Stockholm, Sweden",
            rating: 4.8,
            image: "https://ui-avatars.com/api/?name=Sophie+Montgomery&background=ec9f05&color=fff&size=200"
        },
        {
            id: 3,
            name: "Marcus Aurelius",
            skill: "DevOps & Cloud Specialist",
            location: "Berlin, Germany",
            rating: 5.0,
            image: "https://ui-avatars.com/api/?name=Marcus+Aurelius&background=ff6b00&color=fff&size=200"
        },
        {
            id: 4,
            name: "Jessica Wu",
            skill: "AI/ML Engineering Lead",
            location: "Toronto, Canada",
            rating: 4.7,
            image: "https://ui-avatars.com/api/?name=Jessica+Wu&background=ff8c00&color=fff&size=200"
        },
    ];

    const goToLogin = () => {
        if (!user) navigate("/login");
    };

    return (
        <div
            className="landing-page"
            style={{
                background: "linear-gradient(135deg, #fffcf9 0%, #fff5eb 100%)",
                minHeight: "100vh",
                cursor: !user ? "pointer" : "default",
                fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
            }}
            onClick={goToLogin}
        >
            {/* Header */}
            <Navbar bg="white" className="border-bottom py-2 shadow-sm sticky-top">
                <Container>
                    <Navbar.Brand
                        className="fw-bold d-flex align-items-center gap-2"
                        style={{ color: "var(--primary-orange)", fontSize: "1.6rem", cursor: "pointer" }}
                        onClick={(e) => { e.stopPropagation(); navigate("/"); }}
                    >
                        <div className="bg-orange-gradient rounded-circle d-flex align-items-center justify-content-center" style={{ width: "38px", height: "38px" }}>
                            <Globe size={22} className="text-white" />
                        </div>
                        CONVOXA
                    </Navbar.Brand>

                    <Nav className="ms-auto d-flex gap-2 gap-md-4 align-items-center">
                        {user ? (
                            <>
                                <Nav.Link
                                    className="text-muted small fw-semibold hover-orange d-flex align-items-center gap-1"
                                    onClick={(e) => { e.stopPropagation(); navigate("/chats"); }}
                                >
                                    <LayoutDashboard size={16} /> <span className="d-none d-lg-inline">Dashboard</span>
                                </Nav.Link>
                                <Nav.Link
                                    className="text-muted small fw-semibold hover-orange d-flex align-items-center gap-1"
                                    onClick={(e) => { e.stopPropagation(); window.scrollTo({ top: 800, behavior: 'smooth' }); }}
                                >
                                    <Compass size={16} /> <span className="d-none d-lg-inline">Browse</span>
                                </Nav.Link>
                                <Nav.Link
                                    className="text-muted small fw-semibold hover-orange d-flex align-items-center gap-1"
                                    onClick={(e) => { e.stopPropagation(); navigate("/chats"); }}
                                >
                                    <MessageSquare size={16} /> <span className="d-none d-lg-inline">Messages</span>
                                </Nav.Link>
                                <div className="ms-2 border-start ps-3 d-flex align-items-center">
                                    <Image
                                        src={user.pic}
                                        roundedCircle
                                        width={35}
                                        height={35}
                                        className="border shadow-sm"
                                        style={{ cursor: "pointer", objectFit: "cover" }}
                                        onClick={(e) => { e.stopPropagation(); navigate("/chats"); }}
                                    />
                                </div>
                            </>
                        ) : (
                            <Button
                                className="rounded-pill px-4 shadow-sm fw-bold border-0 bg-orange-gradient"
                                onClick={(e) => { e.stopPropagation(); navigate("/login"); }}
                            >
                                Get Started
                            </Button>
                        )}
                    </Nav>
                </Container>
            </Navbar>

            {/* Hero Section */}
            <div className="py-5">
                <Container>
                    <Row className="justify-content-center text-center py-4">
                        <Col lg={9}>
                            <h1 className="display-4 fw-bold mb-3 text-orange-gradient" style={{ letterSpacing: "-1.5px" }}>
                                Networking reimagined in vibrant color.
                            </h1>
                            <p className="fs-5 text-muted mb-5 mx-auto" style={{ maxWidth: "600px" }}>
                                Join the most premium community of professionals and start collaborating on your next big idea today.
                            </p>

                            <div className="mx-auto shadow-lg" style={{ maxWidth: "750px", borderRadius: "50px", overflow: "hidden" }}>
                                <InputGroup className="bg-white p-2">
                                    <InputGroup.Text className="bg-transparent border-0 ps-3">
                                        <Search size={20} style={{ color: "var(--primary-orange)" }} />
                                    </InputGroup.Text>
                                    <Form.Control
                                        placeholder="Search by name, expertise, or industry"
                                        className="border-0 shadow-none fs-5 py-2"
                                        style={{ background: "transparent" }}
                                    />
                                    <Button className="rounded-pill px-4 fw-bold ms-2 bg-orange-gradient border-0">
                                        Search
                                    </Button>
                                </InputGroup>
                            </div>
                        </Col>
                    </Row>

                    {/* Quick Filters */}
                    <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
                        {["Available Now", "Web Design", "Backend", "AI/ML", "Architecture"].map(tag => (
                            <Badge key={tag} bg="light" className="text-dark border-orange px-3 py-2 rounded-pill fw-medium shadow-sm">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </Container>
            </div>

            {/* Profiles Section */}
            <Container className="py-5">
                <div className="d-flex align-items-center justify-content-between mb-5 px-2">
                    <h3 className="fw-bold m-0" style={{ color: "var(--dark-text)" }}>Featured Professionals</h3>
                    <Dropdown>
                        <Dropdown.Toggle variant="white" className="border rounded-pill px-4 shadow-sm fw-semibold small">
                            Sort by: Relevance
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="shadow border-0">
                            <Dropdown.Item>Top Rated</Dropdown.Item>
                            <Dropdown.Item>Recently Active</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                <Row xs={1} md={2} lg={4} className="g-4">
                    {sampleProfiles.map((p) => (
                        <Col key={p.id}>
                            <Card className="h-100 border-0 shadow-sm rounded-4 text-center overflow-hidden profile-card transition">
                                <Card.Img src={p.image} style={{ height: "180px", objectFit: "cover" }} />
                                <Card.Body className="p-4 bg-white">
                                    <h5 className="fw-bold mb-1">{p.name}</h5>
                                    <p className="small fw-bold mb-3" style={{ color: "var(--primary-orange)" }}>{p.skill}</p>
                                    <div className="d-flex align-items-center justify-content-center text-muted small mb-4">
                                        <MapPin size={14} className="me-1" /> {p.location}
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between pt-3 border-top">
                                        <div className="d-flex align-items-center gap-1">
                                            <Star size={14} style={{ color: "#f59e0b", fill: "#f59e0b" }} />
                                            <span className="fw-bold small">{p.rating}</span>
                                        </div>
                                        <span className="small fw-bold" style={{ color: "var(--primary-orange)" }}>Profile →</span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

        </div>
    );
};

export default LandingPage;
