import React, { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Container, Row, Col } from "react-bootstrap";
import SideDrawer from "../Components/miscellaneous/SideDrawer";
import MyChats from "../Components/MyChats";
import Chatbox from "../Components/Chatbox";

const Chatpage = () => {
    const [fetchAgain, setFetchAgain] = useState(false);
    const { user } = ChatState();

    return (
        <div style={{ width: "100%", background: "linear-gradient(135deg, #fffcf9 0%, #fff5eb 100%)", minHeight: "100vh" }}>
            {user && <SideDrawer />}
            <Container fluid className="p-3" style={{ height: "91vh" }}>
                <Row className="h-100">
                    <Col md={4} lg={3} className="h-100 d-none d-md-block">
                        {user && <MyChats fetchAgain={fetchAgain} />}
                    </Col>
                    <Col md={8} lg={9} className="h-100">
                        {user && <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Chatpage;
