import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, LogOut } from "lucide-react";

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("userInfo");
        navigate("/");
    };

    return (
        <div style={{ background: "linear-gradient(135deg, #1A1A1D 0%, #3B1C32 100%)", minHeight: "100vh", color: "white" }}>
            <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <ShieldCheck size={80} className="mb-4 text-purple-gradient" />
                <h1 className="display-4 fw-bold mb-4">Admin Dashboard</h1>
                <p className="fs-5 mb-5 text-muted">Welcome, System Administrator. You have full access to internal controls.</p>
                <div className="d-flex gap-3">
                    <Button variant="light" className="rounded-pill px-4 fw-bold" onClick={() => navigate("/")}>Go to Home</Button>
                    <Button variant="danger" className="rounded-pill px-4 fw-bold d-flex align-items-center gap-2" onClick={handleLogout}>
                        <LogOut size={18} /> Logout
                    </Button>
                </div>
            </Container>
        </div>
    );
};

export default AdminDashboard;
