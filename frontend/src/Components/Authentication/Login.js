import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

const Login = ({ setTab }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const config = { headers: { "Content-type": "application/json" } };
            const { data } = await axios.post("/api/user/login", { email, password }, config);
            localStorage.setItem("userInfo", JSON.stringify(data));
            if (data.email === "1@1.com") {
                navigate("/admin-dashboard");
            } else {
                navigate("/landing");
            }
        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const googleSuccess = async (response) => {
        try {
            const { data } = await axios.post("/api/user/google", { credential: response.credential });
            localStorage.setItem("userInfo", JSON.stringify(data));
            if (data.email === "1@1.com") {
                navigate("/admin-dashboard");
            } else {
                navigate("/landing");
            }
        } catch (error) {
            alert("Google Login Failed");
        }
    };

    return (
        <Form onSubmit={submitHandler} className="d-flex flex-column gap-2">
            {!isAdmin ? (
                <>
                    <div className="d-flex justify-content-center my-3">
                        <GoogleLogin
                            onSuccess={googleSuccess}
                            onError={() => alert("Google Login Failed")}
                            useOneTap
                            theme="outline"
                            text="signin_with"
                            width="270"
                        />
                    </div>
                    <div className="d-flex align-items-center my-3 gap-3">
                        <div className="flex-grow-1 border-bottom"></div>
                        <span className="text-muted fw-bold small" style={{ fontSize: "13px" }}>OR</span>
                        <div className="flex-grow-1 border-bottom"></div>
                    </div>
                </>
            ) : null}

            <Form.Group className="mb-2">
                <Form.Control
                    type="email"
                    placeholder="Email"
                    className="border-0 small shadow-none py-2 px-3 text-white"
                    style={{ fontSize: "12px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <InputGroup className="border-0 rounded overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <Form.Control
                        type={show ? "text" : "password"}
                        placeholder="Password"
                        className="bg-transparent border-0 small shadow-none py-2 px-3 text-white"
                        style={{ fontSize: "12px" }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button
                        variant="transparent"
                        className="border-0 small fw-bold shadow-none text-rose"
                        style={{ fontSize: "12px" }}
                        onClick={() => setShow(!show)}
                    >
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputGroup>
            </Form.Group>

            <Button
                className="w-100 border-0 fw-bold py-1 shadow-none bg-purple-gradient"
                style={{ fontSize: "14px" }}
                type="submit"
                disabled={loading}
            >
                {loading ? "Logging in..." : "Log In"}
            </Button>

            <div className="text-center mt-4">
                <Button
                    variant="link"
                    className="p-0 small text-decoration-none text-white opacity-75"
                    style={{ fontSize: "12px" }}
                    onClick={() => setIsAdmin(!isAdmin)}
                >
                    {isAdmin ? "Back to standard login" : "Login as Admin"}
                </Button>
            </div>

            <div className="text-center mt-2">
                <a href="#!" className="small text-decoration-none text-white opacity-50" style={{ fontSize: "12px" }}>Forgot password?</a>
            </div>

            <style>{`
                .bg-purple-gradient {
                    background: linear-gradient(135deg, #1A1A1D 0%, #3B1C32 50%, #6A1E55 100%);
                    color: white;
                }
                .text-rose { color: #A64D79 !important; }
            `}</style>
        </Form>
    );
};

export default Login;
