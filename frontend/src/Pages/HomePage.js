import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import Login from "../Components/Authentication/Login";
import Signup from "../Components/Authentication/Signup";
import { GoogleOAuthProvider } from "@react-oauth/google";

const HomePage = () => {
    const navigate = useNavigate();
    const [tab, setTab] = React.useState("login");

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        if (user) navigate("/chats");
    }, [navigate]);

    return (
        <GoogleOAuthProvider clientId="701224993949-sqd5rpvd9m3vq6mb4btcmce9pinlkmup.apps.googleusercontent.com">
            <Container fluid className="d-flex align-items-center justify-content-center min-vh-100" style={{ background: "linear-gradient(135deg, #1A1A1D 0%, #3B1C32 100%)" }}>
                <div style={{ width: "100%", maxWidth: "350px" }}>
                    <Card className="p-4 mb-3 rounded-4 border-0 shadow-lg" style={{ background: "rgba(255, 255, 255, 0.05)", backdropFilter: "blur(10px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
                        <div className="text-center mb-4">
                            <h1 className="instagram-logo text-white" style={{ fontSize: "2.8rem", marginTop: "10px" }}>Convoxa</h1>
                            <p className="text-rose small fw-bold mt-n2" style={{ letterSpacing: "1px", textTransform: "uppercase" }}>Premium Social</p>
                        </div>

                        <div className="mb-2">
                            {tab === "login" ? <Login setTab={setTab} /> : <Signup setTab={setTab} />}
                        </div>
                    </Card>

                    <Card className="p-3 text-center rounded-4 border-0 shadow-lg" style={{ background: "rgba(255, 255, 255, 0.05)", backdropFilter: "blur(10px)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
                        <span className="small text-white opacity-75">
                            {tab === "login" ? (
                                <>Don't have an account? <Button variant="link" className="p-0 fw-bold border-0 align-baseline text-decoration-none shadow-none text-rose" style={{ fontSize: "14px" }} onClick={() => setTab("signup")}>Sign up</Button></>
                            ) : (
                                <>Have an account? <Button variant="link" className="p-0 fw-bold border-0 align-baseline text-decoration-none shadow-none text-rose" style={{ fontSize: "14px" }} onClick={() => setTab("login")}>Log in</Button></>
                            )}
                        </span>
                    </Card>
                </div>

                <style>{`
                    @font-face {
                        font-family: 'Instagram';
                        src: url('https://fonts.cdnfonts.com/s/14894/Billabong.woff') format('woff');
                    }
                    .instagram-logo {
                        font-family: 'Instagram', 'Billabong', cursive;
                        font-weight: 400;
                    }
                    .text-rose { color: #A64D79 !important; }
                    .filter-invert { filter: invert(1); }
                    body { background: #1A1A1D !important; }
                `}</style>
            </Container>
        </GoogleOAuthProvider>
    );
};



export default HomePage;
