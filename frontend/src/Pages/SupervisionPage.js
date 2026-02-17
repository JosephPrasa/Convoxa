import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../Components/miscellaneous/Sidebar";
import { ChatState } from "../Context/ChatProvider";

const SupervisionPage = () => {
    const { user } = ChatState();

    return (
        <div style={{ display: "flex", width: "100vw" }}>
            {user && <Sidebar user={user} />}
            <Container fluid className="p-0 text-white" style={{ height: "100vh", overflow: "hidden", marginLeft: "72px", width: "calc(100% - 72px)" }}>
                <Row className="h-100 g-0">
                    <Col className="h-100 overflow-auto custom-scrollbar bg-black bg-opacity-25">
                        <div className="p-5 mw-100" style={{ maxWidth: "800px", margin: "0 auto" }}>
                            <h2 className="mb-4 fw-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>Supervision</h2>
                            <p className="text-white-50">Tools and resources for parents and teens.</p>

                            <div className="p-5 border border-secondary rounded-4 d-flex flex-column align-items-center justify-content-center text-center text-muted"
                                style={{ minHeight: "300px", background: "rgba(255,255,255,0.02)" }}>
                                <p>Supervision tools coming soon.</p>
                            </div>
                        </div>
                    </Col>
                </Row>
                <style>{`
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 6px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background-color: rgba(255, 255, 255, 0.2);
                        border-radius: 4px;
                    }
                `}</style>
            </Container>
        </div>
    );
};

export default SupervisionPage;
