import React, { useState } from "react";
import { Button, Offcanvas, Form, InputGroup, Nav, Navbar, Container, Dropdown, Image, Spinner } from "react-bootstrap";
import { Search, Bell, LogOut, User as UserIcon, Settings, Palette, HelpCircle, Shield, Zap } from "lucide-react";
import { ChatState } from "../../Context/ChatProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import UserListItem from "../userAvatar/UserListItem";
import ProfileModal from "./ProfileModal";

const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const [show, setShow] = useState(false);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const { user, setUser, setSelectedChat, chats, setChats, notification } = ChatState();
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (!search) return alert("Enter search term");
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/user?search=${search}`, { headers: { Authorization: `Bearer ${user.token}` } });
            setSearchResult(data);
            setLoading(false);
        } catch (error) {
            alert("Search failed");
            setLoading(false);
        }
    };

    const handleFollow = async (targetUser) => {
        try {
            const isFollowing = user.following?.includes(targetUser._id);
            const endpoint = isFollowing ? `/api/user/unfollow/${targetUser._id}` : `/api/user/follow/${targetUser._id}`;

            const { data } = await axios.put(endpoint, {}, {
                headers: { Authorization: `Bearer ${user.token}` }
            });

            const updatedUser = { ...user };
            if (isFollowing) {
                updatedUser.following = updatedUser.following.filter(id => id !== targetUser._id);
            } else if (data.status === "following") {
                updatedUser.following = [...(updatedUser.following || []), targetUser._id];
            }
            setUser(updatedUser);
            localStorage.setItem("userInfo", JSON.stringify(updatedUser));

            if (data.status === "requested") {
                setSearchResult(searchResult.map(u =>
                    u._id === targetUser._id
                        ? { ...u, followRequests: [...(u.followRequests || []), user._id] }
                        : u
                ));
            }

            alert(data.message);
        } catch (error) {
            alert(error.response?.data?.message || "Operation failed");
        }
    };

    const accessChat = async (userId) => {
        try {
            setLoadingChat(true);
            const { data } = await axios.post(`/api/chat`, { userId }, { headers: { "Content-type": "application/json", Authorization: `Bearer ${user.token}` } });
            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
            setSelectedChat(data);
            setLoadingChat(false);
            setShow(false);
        } catch (error) {
            alert("Chat fetch error");
            setLoadingChat(false);
        }
    };

    return (
        <>
            <Navbar bg="white" className="border-bottom shadow-sm">
                <Container fluid>
                    <Button variant="light" className="border rounded-pill px-3" onClick={() => setShow(true)}>
                        <Search size={16} /> <span className="d-none d-md-inline ms-2">Search User</span>
                    </Button>
                    <Navbar.Brand
                        className="fw-bold text-purple-gradient mx-auto"
                        style={{ fontSize: "1.5rem", cursor: "pointer" }}
                        onClick={() => navigate("/")}
                    >
                        CONVOXA
                    </Navbar.Brand>
                    <span className="text-muted d-none d-lg-block position-absolute start-50 translate-middle-x" style={{ fontSize: "0.9rem", fontWeight: "500", letterSpacing: "0.5px" }}>
                        {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })} <span className="mx-1">|</span> {time.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </span>
                    <Nav className="gap-2 align-items-center">
                        <Dropdown align="end">
                            <Dropdown.Toggle variant="light" className="border-0 bg-transparent">
                                <Bell size={20} className="text-muted" />
                                {notification.length > 0 && <span className="badge bg-purple-gradient rounded-circle position-absolute top-0 start-50 translate-middle-y" style={{ fontSize: "10px" }}>{notification.length}</span>}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="shadow border-0">
                                {!notification.length && <Dropdown.Item disabled>No Notifications</Dropdown.Item>}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown align="end">
                            <Dropdown.Toggle variant="light" className="border rounded-pill p-1">
                                <Image src={user.pic} roundedCircle width={28} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="shadow border-0">
                                <ProfileModal user={user}>
                                    <Dropdown.Item as="button"><UserIcon size={14} className="me-2" /> My Profile</Dropdown.Item>
                                </ProfileModal>
                                <Dropdown.Item><Bell size={14} className="me-2" /> Notifications</Dropdown.Item>
                                <Dropdown.Item><Palette size={14} className="me-2" /> Appearance</Dropdown.Item>
                                <Dropdown.Item><Shield size={14} className="me-2" /> Privacy & Security</Dropdown.Item>
                                <Dropdown.Item><Settings size={14} className="me-2" /> Settings</Dropdown.Item>
                                <Dropdown.Item className="text-purple-gradient fw-bold"><Zap size={14} className="me-2" /> Convoxa AI</Dropdown.Item>
                                <Dropdown.Item><HelpCircle size={14} className="me-2" /> Help & Support</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={() => { localStorage.removeItem("userInfo"); navigate("/"); }} className="text-danger">
                                    <LogOut size={14} className="me-2" /> Log Out
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Container>
            </Navbar>
            <Offcanvas show={show} onHide={() => setShow(false)}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className="fw-bold">Find Collaborators</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <InputGroup className="mb-3">
                        <Form.Control className="rounded-start-pill ps-3" placeholder="Search by name or email" onChange={(e) => setSearch(e.target.value)} />
                        <Button onClick={handleSearch} className="bg-purple-gradient border-0 rounded-end-pill px-4">Go</Button>
                    </InputGroup>
                    {loading ? (
                        <ChatLoading />
                    ) : (
                        searchResult?.map((u) => (
                            <UserListItem
                                key={u._id}
                                user={u}
                                handleFunction={() => accessChat(u._id)}
                                followHandler={handleFollow}
                                currentUser={user}
                            />
                        ))
                    )}
                    {loadingChat && <Spinner className="d-block mx-auto mt-3" />}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};
export default SideDrawer;
