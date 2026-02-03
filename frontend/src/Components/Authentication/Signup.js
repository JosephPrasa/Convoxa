import React, { useState } from "react";
import { Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const Signup = ({ setTab }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [pic, setPic] = useState();
    const [picLoading, setPicLoading] = useState(false);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const postDetails = (pics) => {
        setPicLoading(true);
        if (!pics || (pics.type !== "image/jpeg" && pics.type !== "image/png")) {
            alert("Invalid image type");
            setPicLoading(false);
            return;
        }
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "convoxa");
        data.append("cloud_name", "dj6tfxxvk");
        fetch("https://api.cloudinary.com/v1_1/dj6tfxxvk/image/upload", { method: "post", body: data })
            .then((res) => res.json())
            .then((data) => {
                setPic(data.url.toString());
                setPicLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setPicLoading(false);
            });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!name || !email || !password || password !== confirmpassword) {
            alert("Please validate all fields");
            return;
        }
        try {
            const config = { headers: { "Content-type": "application/json" } };
            const { data } = await axios.post("/api/user", { name, email, password, pic }, config);
            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/chats");
        } catch (error) {
            console.error("Signup error:", error);
            const message = error.response?.data?.message || error.message || "Signup failed";
            alert(`Signup Failed: ${message}`);
        }
    };

    return (
        <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
                <Form.Label className="fw-medium small">Name</Form.Label>
                <Form.Control className="rounded-pill px-3" onChange={(e) => setName(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label className="fw-medium small">Email</Form.Label>
                <Form.Control className="rounded-pill px-3" type="email" onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Row className="mb-3">
                <Col>
                    <Form.Label className="fw-medium small">Password</Form.Label>
                    <InputGroup>
                        <Form.Control className="rounded-start-pill ps-3" type={show ? "text" : "password"} onChange={(e) => setPassword(e.target.value)} required />
                        <Button variant="outline-secondary" className="rounded-end-pill px-3" onClick={() => setShow(!show)}>{show ? <EyeOff size={16} /> : <Eye size={16} />}</Button>
                    </InputGroup>
                </Col>
                <Col>
                    <Form.Label className="fw-medium small">Confirm</Form.Label>
                    <Form.Control className="rounded-pill px-3" type="password" onChange={(e) => setConfirmpassword(e.target.value)} required />
                </Col>
            </Row>
            <Form.Group className="mb-3">
                <Form.Label className="fw-medium small">Avatar</Form.Label>
                <Form.Control className="rounded-pill px-3" type="file" onChange={(e) => postDetails(e.target.files[0])} />
            </Form.Group>
            <Button className="w-100 mb-3 bg-orange-gradient border-0 rounded-pill py-2 fw-bold" type="submit" disabled={picLoading}>
                {picLoading ? "Starting..." : "Sign Up"}
            </Button>
            <div className="text-center mt-3">
                <span className="text-muted small fw-medium">Already have an account? </span>
                <Button variant="link" className="p-0 small text-decoration-none fw-bold" style={{ color: "var(--primary-orange)" }} onClick={() => setTab("login")}>
                    Login
                </Button>
            </div>
        </Form>
    );
};

export default Signup;
