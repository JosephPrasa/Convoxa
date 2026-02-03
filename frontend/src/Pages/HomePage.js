import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Tabs, Tab } from "react-bootstrap";
import Login from "../Components/Authentication/Login";
import Signup from "../Components/Authentication/Signup";
import { GoogleOAuthProvider } from "@react-oauth/google";

const HomePage = () => {
    const navigate = useNavigate();
    const [tab, setTab] = React.useState("login");

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) navigate("/chats");
    }, [navigate]);

    return (
        <GoogleOAuthProvider clientId="701224993949-sqd5rpvd9m3vq6mb4btcmce9pinlkmup.apps.googleusercontent.com">
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", background: "linear-gradient(135deg, #fffcf9 0%, #fff5eb 100%)" }}>
                <Row className="w-100 justify-content-center">
                    <Col md={6} lg={5}>
                        <Card className="p-4 shadow border-0 rounded-4">
                            <Card.Body>
                                <div className="text-center mb-4">
                                    <h1 className="fw-bold text-orange-gradient mb-0" style={{ fontSize: "2.5rem", letterSpacing: "-1px" }}>CONVOXA</h1>
                                    <p className="text-muted fw-medium">Premium MERN Communication</p>
                                </div>
                                <Tabs activeKey={tab} onSelect={(k) => setTab(k)} id="auth-tabs" className="mb-4 nav-pills nav-fill custom-tabs">
                                    <Tab eventKey="login" title="Login">
                                        <Login setTab={setTab} />
                                    </Tab>
                                    <Tab eventKey="signup" title="Signup">
                                        <Signup setTab={setTab} />
                                    </Tab>
                                </Tabs>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </GoogleOAuthProvider>
    );
};

export default HomePage;
