import React, { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Container, Row, Col } from "react-bootstrap";
import MyChats from "../Components/MyChats";
import Chatbox from "../Components/Chatbox";
import Sidebar from "../Components/miscellaneous/Sidebar";

const Chatpage = () => {
    const [fetchAgain, setFetchAgain] = useState(false);
    const { user } = ChatState();

    return (
        <div style={{
            width: "100%",
            background: "var(--rose-gradient)",
            minHeight: "100vh",
            color: "var(--text-primary)"
        }}>
            {user && <Sidebar user={user} />}

            <Container fluid className="ms-lg-auto me-lg-0 pe-lg-4" style={{
                maxWidth: "calc(100% - 245px)",
                height: "100vh",
                paddingLeft: "20px"
            }}>
                <Row className="h-100 g-0 py-3">
                    <Col md={4} lg={3} className="h-100 pe-3 d-none d-md-block">
                        {user && <MyChats fetchAgain={fetchAgain} />}
                    </Col>
                    <Col md={8} lg={9} className="h-100">
                        {user && <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
                    </Col>
                </Row>
            </Container>

            <style>{`
                .instagram-logo {
                    font-family: 'Instagram', 'Billabong', cursive;
                    font-weight: 400;
                }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

export default Chatpage;
