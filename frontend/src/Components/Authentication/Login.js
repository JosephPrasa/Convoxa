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

    const googleSuccess = async (credentialResponse) => {
        setLoading(true);
        try {
            const config = { headers: { "Content-type": "application/json" } };
            const { data } = await axios.post(
                "/api/user/google",
                { credential: credentialResponse.credential },
                config
            );
            localStorage.setItem("userInfo", JSON.stringify(data));
            if (data.email === "1@1.com") {
                navigate("/admin-dashboard");
            } else {
                navigate("/landing");
            }
        } catch (error) {
            console.error("Google Sign In Error:", error);
            alert("Google Sign In Failed");
        } finally {
            setLoading(false);
        }
    };

    const googleFailure = () => {
        console.log("Google Sign In was unsuccessful. Try again later");
        alert("Google Sign In Failed");
    };

    return (
        <Form onSubmit={submitHandler} className="d-flex flex-column gap-2">
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
                <div className="d-flex justify-content-end mt-1">
                    <a href="#!" className="small text-decoration-none text-rose opacity-75" style={{ fontSize: "11px" }}>Forgot password?</a>
                </div>
            </Form.Group>

            <Button
                className="w-100 border-0 fw-bold py-1 shadow-none bg-purple-gradient"
                style={{ fontSize: "14px" }}
                type="submit"
                disabled={loading}
            >
                {loading ? "Logging in..." : "Log In"}
            </Button>

            <div className="d-flex align-items-center my-2">
                <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255,255,255,0.2)" }}></div>
                <span className="px-2 text-white small opacity-50" style={{ fontSize: "10px" }}>OR</span>
                <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(255,255,255,0.2)" }}></div>
            </div>

            <div className="d-flex justify-content-center w-100">
                <GoogleLogin
                    onSuccess={googleSuccess}
                    onError={googleFailure}
                    theme="filled_black"
                    text="continue_with"
                    shape="circle"
                    width="250"
                />
            </div>

            <style>{`
                .bg-purple-gradient {
                    background: linear-gradient(135deg, #1A1A1D 0%, #3B1C32 50%, #6A1E55 100%);
                    color: white;
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

export default Login;
