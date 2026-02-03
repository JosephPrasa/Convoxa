import React, { useState } from "react";
import { Modal, Button, Form, Stack, Spinner } from "react-bootstrap";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import UserListItem from "../userAvatar/UserListItem";
import { X } from "lucide-react";

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages, children }) => {
    const [show, setShow] = useState(false);
    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameloading, setRenameLoading] = useState(false);

    const { selectedChat, setSelectedChat, user } = ChatState();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleRemove = async (u1) => {
        if (selectedChat.groupAdmin._id !== user._id && u1._id !== user._id) return alert("Only admins can remove someone!");
        try {
            setLoading(true);
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.put(`/api/chat/groupremove`, { chatId: selectedChat._id, userId: u1._id }, config);
            u1._id === user._id ? setSelectedChat() : setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            fetchMessages();
            setLoading(false);
        } catch (error) {
            alert("Removal failed");
            setLoading(false);
        }
    };

    const handleRename = async () => {
        if (!groupChatName) return;
        try {
            setRenameLoading(true);
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data } = await axios.put(`/api/chat/rename`, { chatId: selectedChat._id, chatName: groupChatName }, config);
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setRenameLoading(false);
        } catch (error) {
            alert("Rename failed");
            setRenameLoading(false);
        }
        setGroupChatName("");
    };

    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) return;
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

    const handleAddUser = async (u1) => {
        if (selectedChat.users.find((u) => u._id === u1._id)) return alert("User already in group");
        if (selectedChat.groupAdmin._id !== user._id) return alert("Only admins can add someone!");
        try {
            setLoading(true);
            const { data } = await axios.put(`/api/chat/groupadd`, { chatId: selectedChat._id, userId: u1._id }, { headers: { Authorization: `Bearer ${user.token}` } });
            setSelectedChat(data);
            setFetchAgain(!fetchAgain);
            setLoading(false);
        } catch (error) {
            alert("Addition failed");
            setLoading(false);
        }
    };

    return (
        <>
            <span onClick={handleShow}>{children}</span>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton className="border-0"><Modal.Title className="fw-bold">{selectedChat.chatName}</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Stack direction="horizontal" gap={1} className="flex-wrap mb-3">
                        {selectedChat.users.map((u) => (
                            <span key={u._id} className="badge bg-primary d-flex align-items-center gap-1 p-2 rounded-pill">
                                {u.name} {u._id !== user._id && <X size={14} style={{ cursor: "pointer" }} onClick={() => handleRemove(u)} />}
                            </span>
                        ))}
                    </Stack>
                    <Form className="d-flex gap-2 mb-3">
                        <Form.Control placeholder="Rename group" value={groupChatName} onChange={(e) => setGroupChatName(e.target.value)} />
                        <Button variant="primary" disabled={renameloading} onClick={handleRename}>{renameloading ? <Spinner size="sm" /> : "Update"}</Button>
                    </Form>
                    <Form.Control className="mb-3" placeholder="Add user to group" onChange={(e) => handleSearch(e.target.value)} />
                    <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                        {loading ? <Spinner className="d-block mx-auto" /> : searchResult?.map((u) => <UserListItem key={u._id} user={u} handleFunction={() => handleAddUser(u)} />)}
                    </div>
                </Modal.Body>
                <Modal.Footer className="border-0"><Button variant="danger" className="w-100" onClick={() => handleRemove(user)}>Leave Group</Button></Modal.Footer>
            </Modal>
        </>
    );
};
export default UpdateGroupChatModal;
