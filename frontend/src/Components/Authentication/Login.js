import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { Eye, EyeOff } from "lucide-react";

const Login = ({ setTab }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!email || !password) {
            alert("Fields cannot be empty");
            setLoading(false);
            return;
        }

        try {
            const config = { headers: { "Content-type": "application/json" } };
            const { data } = await axios.post("/api/user/login", { email, password }, config);
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            navigate("/chats");
        } catch (error) {
            console.error("Login error:", error);
            const message = error.response?.data?.message || error.message || "Login failed";
            alert(`Login Failed: ${message}`);
            setLoading(false);
        }
    };

    const googleSuccess = async (response) => {
        try {
            const { data } = await axios.post("/api/user/google", { credential: response.credential });
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/chats");
        } catch (error) {
            alert("Google Login Failed");
        }
    };

    return (
        <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                    <Form.Control type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <Button variant="outline-secondary" onClick={() => setShow(!show)}>
                        {show ? <EyeOff size={18} /> : <Eye size={18} />}
                    </Button>
                </InputGroup>
            </Form.Group>
            <Button className="w-100 mb-3 bg-orange-gradient border-0 rounded-pill py-2 fw-bold" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </Button>
            <div className="d-flex justify-content-center mb-3">
                <GoogleLogin onSuccess={googleSuccess} onError={() => alert("Google Login Failed")} />
            </div>
            <div className="text-center mt-3">
                <span className="text-muted small fw-medium">Don't have an account? </span>
                <Button variant="link" className="p-0 small text-decoration-none fw-bold" style={{ color: "var(--primary-orange)" }} onClick={() => setTab("signup")}>
                    Sign Up
                </Button>
            </div>
        </Form>
    );
};

export default Login;
