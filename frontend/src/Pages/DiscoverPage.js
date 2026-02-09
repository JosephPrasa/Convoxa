import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Image, Button, Form, InputGroup } from "react-bootstrap";
import { Search, UserPlus, UserCheck, MessageSquare } from "lucide-react";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import Sidebar from "../Components/miscellaneous/Sidebar";
import { useNavigate } from "react-router-dom";

const DiscoverPage = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const { user, setSelectedChat, chats, setChats } = ChatState();
    const navigate = useNavigate();

    const fetchUsers = React.useCallback(async (query = "") => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get(`/api/user?search=${query}`, config);
            setUsers(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching users", error);
            setLoading(false);
        }
    }, [user.token]);

    useEffect(() => {
        if (user) fetchUsers();
    }, [user, fetchUsers]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        fetchUsers(e.target.value);
    };

    const handleFollow = async (userId) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            await axios.put(`/api/user/follow/${userId}`, {}, config);
            // Refresh users to show updated follow status
            fetchUsers(search);
        } catch (error) {
            console.error("Error following user", error);
        }
    };

    const accessChat = async (userId) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post(`/api/chat`, { userId }, config);

            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
            setSelectedChat(data);
            navigate("/chats");
        } catch (error) {
            alert(error.response?.data?.message || "Error accessing chat");
        }
    };

    return (
        <div style={{ background: "linear-gradient(135deg, #1A1A1D 0%, #3B1C32 100%)", minHeight: "100vh", color: "white" }}>
            <Sidebar user={user} />

            <Container className="ms-lg-auto me-lg-0 pe-lg-5" style={{ maxWidth: "1200px", paddingTop: "50px", paddingBottom: "50px" }}>
                <div className="mb-5 text-center">
                    <h2 className="display-5 fw-bold mb-3">Discover People</h2>
                    <p className="text-secondary fs-5">Find and connect with people from around the world.</p>
                </div>

                <div className="mb-5 mx-auto" style={{ maxWidth: "600px" }}>
                    <InputGroup className="bg-dark border border-secondary rounded-pill overflow-hidden shadow-lg p-1">
                        <InputGroup.Text className="bg-transparent border-0 text-secondary ps-3">
                            <Search size={20} />
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Search by name or email..."
                            className="bg-transparent border-0 text-white shadow-none py-2"
                            value={search}
                            onChange={handleSearch}
                        />
                    </InputGroup>
                </div>

                <Row className="g-4">
                    {users.map((u) => {
                        const isFollowing = user.following?.includes(u._id) || (u.followers && u.followers.includes(user._id));
                        return (
                            <Col key={u._id} xs={12} sm={6} lg={4} xl={3}>
                                <Card className="h-100 bg-dark border border-secondary rounded-4 overflow-hidden hover-lift transition-all p-3 text-center">
                                    <div className="position-relative mb-3 d-inline-block mx-auto">
                                        <div className="bg-rose-gradient-border p-0.5 rounded-circle shadow-sm">
                                            <div className="bg-dark p-0.5 rounded-circle">
                                                <Image src={u.pic} roundedCircle width={90} height={90} style={{ objectFit: 'cover' }} />
                                            </div>
                                        </div>
                                    </div>
                                    <h6 className="fw-bold mb-0 text-white">{u.username || u.name.split(' ')[0].toLowerCase()}</h6>
                                    <p className="small text-secondary mb-3" style={{ fontSize: '11px' }}>{u.name}</p>

                                    <p className="small text-light opacity-75 mb-4 px-2" style={{ height: '40px', overflow: 'hidden', fontSize: '12px', lineHeight: '1.2' }}>
                                        {u.bio || "No bio yet."}
                                    </p>

                                    <div className="d-flex gap-2 justify-content-center">
                                        <Button
                                            variant={isFollowing ? "outline-secondary" : "primary"}
                                            className={`flex-grow-1 rounded-pill fw-bold border-0 py-1 ${!isFollowing && 'bg-rose-gradient'}`}
                                            style={{ fontSize: '13px' }}
                                            onClick={() => handleFollow(u._id)}
                                        >
                                            {isFollowing ? "Following" : "Follow"}
                                        </Button>
                                        <Button
                                            variant="light"
                                            className="rounded-circle p-2 d-flex align-items-center justify-content-center"
                                            onClick={() => accessChat(u._id)}
                                            style={{ width: '34px', height: '34px' }}
                                        >
                                            <MessageSquare size={16} />
                                        </Button>
                                    </div>
                                </Card>
                            </Col>
                        );
                    })}
                    {!loading && users.length === 0 && (
                        <Col className="text-center py-5">
                            <p className="text-secondary">No users found.</p>
                        </Col>
                    )}
                </Row>
            </Container>

            <style>{`
                .bg-rose-gradient-border {
                    background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
                }
                .bg-rose-gradient {
                    background: linear-gradient(135deg, #6A1E55, #A64D79) !important;
                }
                .hover-lift:hover { transform: translateY(-5px); border-color: rgba(166, 77, 121, 0.5) !important; background: rgba(255,255,255,0.05) !important; }
                .transition-all { transition: all 0.3s ease; }
            `}</style>
        </div>
    );
};

export default DiscoverPage;
