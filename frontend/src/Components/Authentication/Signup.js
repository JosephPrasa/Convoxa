import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = ({ setTab }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (password !== confirmpassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            const config = { headers: { "Content-type": "application/json" } };
            const { data } = await axios.post("/api/user", {
                username,
                email,
                password,
            }, config);
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/landing");
        } catch (error) {
            alert(error.response?.data?.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onSubmit={submitHandler} className="d-flex flex-column gap-2 text-center">
            <p className="text-white opacity-75 fw-bold mb-4" style={{ fontSize: "16px" }}>
                Sign up to connect with friends and share your moments.
            </p>

            <Form.Group className="mb-2">
                <Form.Control
                    type="text"
                    placeholder="Username"
                    className="border-0 small shadow-none py-2 px-3 text-white"
                    style={{ fontSize: "12px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </Form.Group>

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

            <Form.Group className="mb-2">
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

            <Form.Group className="mb-3">
                <InputGroup className="border-0 rounded overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <Form.Control
                        type={show ? "text" : "password"}
                        placeholder="Confirm Password"
                        className="bg-transparent border-0 small shadow-none py-2 px-3 text-white"
                        style={{ fontSize: "12px" }}
                        value={confirmpassword}
                        onChange={(e) => setConfirmpassword(e.target.value)}
                        required
                    />
                </InputGroup>
            </Form.Group>

            <p className="text-white opacity-50 small mb-3" style={{ fontSize: "11px" }}>
                By signing up, you agree to our <a href="#!" className="text-decoration-none text-rose">Terms</a>, <a href="#!" className="text-decoration-none text-rose">Privacy Policy</a> and <a href="#!" className="text-decoration-none text-rose">Cookies Policy</a>.
            </p>

            <Button
                className="w-100 border-0 fw-bold py-1 shadow-none bg-purple-gradient text-white"
                style={{ fontSize: "14px", opacity: (username && email && password && confirmpassword) ? 1 : 0.7 }}
                type="submit"
                disabled={loading}
            >
                {loading ? "Signing up..." : "Sign Up"}
            </Button>

            <style>{`
                .bg-purple-gradient {
                    background: linear-gradient(135deg, #1A1A1D 0%, #3B1C32 50%, #6A1E55 100%);
                }
                .text-rose { color: #A64D79 !important; }
                input.form-control::placeholder { color: rgba(255, 255, 255, 0.7) !important; opacity: 1; }
                input.form-control { color: white !important; caret-color: white; }
                input:-webkit-autofill,
                input:-webkit-autofill:hover, 
                input:-webkit-autofill:focus, 
                input:-webkit-autofill:active{
                    -webkit-text-fill-color: white !important;
                    transition: background-color 5000s ease-in-out 0s;
                }
            `}</style>
        </Form>
    );
};

export default Signup;
