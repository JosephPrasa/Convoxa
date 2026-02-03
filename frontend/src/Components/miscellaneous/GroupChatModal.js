import React, { useState } from "react";
import { Modal, Button, Form, Stack, Spinner } from "react-bootstrap";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import UserListItem from "../userAvatar/UserListItem";
import { X } from "lucide-react";

const GroupChatModal = ({ children }) => {
    const [show, setShow] = useState(false);
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user, chats, setChats } = ChatState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) return;
        try {
            setLoading(true);
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.get(`/api/user?search=${search}`, config);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            alert("Search failed");
            setLoading(false);
        }
    };

    const handleGroup = (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) return alert("User already added");
        setSelectedUsers([...selectedUsers, userToAdd]);
    };

    const handleDelete = (delUser) => {
        setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
    };

    const handleSubmit = async () => {
        if (!groupChatName || !selectedUsers) return alert("Fill all fields");
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.post(`/api/chat/group`, { name: groupChatName, users: JSON.stringify(selectedUsers.map((u) => u._id)) }, config);
            setChats([data, ...chats]);
            handleClose();
            alert("Group Created!");
        } catch (error) {
            alert("Group creation failed");
        }
    };

    return (
        <>
            <span onClick={handleShow}>{children}</span>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton className="border-0"><Modal.Title className="fw-bold">Create Group Chat</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3"><Form.Control placeholder="Chat Name" onChange={(e) => setGroupChatName(e.target.value)} /></Form.Group>
                    <Form.Group className="mb-3"><Form.Control placeholder="Add Users (e.g. John, Piyush)" onChange={(e) => handleSearch(e.target.value)} /></Form.Group>
                    <Stack direction="horizontal" gap={2} className="flex-wrap mb-3">
                        {selectedUsers.map((u) => (
                            <span key={u._id} className="badge bg-primary d-flex align-items-center gap-1 p-2 rounded-pill">
                                {u.name} <X size={14} style={{ cursor: "pointer" }} onClick={() => handleDelete(u)} />
                            </span>
                        ))}
                    </Stack>
                    <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                        {loading ? <Spinner className="d-block mx-auto" /> : searchResult?.map((u) => <UserListItem key={u._id} user={u} handleFunction={() => handleGroup(u)} />)}
                    </div>
                </Modal.Body>
                <Modal.Footer className="border-0"><Button variant="primary" className="w-100 py-2" onClick={handleSubmit}>Create Chat</Button></Modal.Footer>
            </Modal>
        </>
    );
};

export default GroupChatModal;
