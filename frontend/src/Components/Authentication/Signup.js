import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = ({ setTab }) => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState(""); // New field
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState(""); // New field
    const [interests, setInterests] = useState(""); // New field
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const config = { headers: { "Content-type": "application/json" } };
            const interestsArray = interests.split(",").map(i => i.trim()).filter(i => i !== "");
            const { data } = await axios.post("/api/user", {
                name,
                username,
                email,
                password,
                bio,
                interests: interestsArray
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
                Sign up to see photos and videos from your friends.
            </p>

            <Form.Group className="mb-2">
                <Form.Control
                    type="text"
                    placeholder="Full Name"
                    className="border-0 small shadow-none py-2 px-3 text-white"
                    style={{ fontSize: "12px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </Form.Group>

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
                    type="text"
                    placeholder="Bio (Optional)"
                    className="border-0 small shadow-none py-2 px-3 text-white"
                    style={{ fontSize: "12px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-2">
                <Form.Control
                    type="text"
                    placeholder="Interests (comma separated)"
                    className="border-0 small shadow-none py-2 px-3 text-white"
                    style={{ fontSize: "12px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
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

            <p className="text-white opacity-50 small mb-3" style={{ fontSize: "11px" }}>
                People who use our service may have uploaded your contact information to Convoxa. <a href="#!" className="text-decoration-none text-rose">Learn More</a>
            </p>

            <Button
                className="w-100 border-0 fw-bold py-1 shadow-none bg-purple-gradient text-white"
                style={{ fontSize: "14px", opacity: (name && username && email && password) ? 1 : 0.7 }}
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
            `}</style>
        </Form>
    );
};

export default Signup;
