import React, { useState } from "react";
import { Modal, Button, Image, Form, Badge } from "react-bootstrap";
import { Eye, Shield, ShieldOff } from "lucide-react";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";

const ProfileModal = ({ user, children }) => {
    const [show, setShow] = useState(false);
    const { user: currentUser, setUser } = ChatState();

    const [name, setName] = useState(user.name);
    const [bio, setBio] = useState(user.bio || "Hey there! I'm using Convoxa.");
    const [status, setStatus] = useState(user.status || "Online");
    const [loading, setLoading] = useState(false);

    const isOwnProfile = currentUser?._id === user?._id;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handlePrivacyToggle = async () => {
        try {
            const { data } = await axios.put(
                "/api/user/privacy",
                {},
                { headers: { Authorization: `Bearer ${currentUser.token}` } }
            );
            const updatedUser = { ...currentUser, isPublic: data.isPublic };
            setUser(updatedUser);
            localStorage.setItem("userInfo", JSON.stringify(updatedUser));
        } catch (error) {
            alert("Failed to update privacy");
        }
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            const { data } = await axios.put(
                "/api/user/profile",
                { name, bio, status },
                { headers: { Authorization: `Bearer ${currentUser.token}` } }
            );
            const updatedUser = { ...currentUser, ...data };
            setUser(updatedUser);
            localStorage.setItem("userInfo", JSON.stringify(updatedUser));
            setLoading(false);
            handleClose();
        } catch (error) {
            alert("Failed to update profile");
            setLoading(false);
        }
    };

    return (
        <>
            {children ? <span onClick={handleShow}>{children}</span> : <Button variant="light" onClick={handleShow}><Eye size={18} /></Button>}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton className="border-0">
                    <Modal.Title className="w-100 text-center fw-bold fs-3">
                        {isOwnProfile ? "Edit My Profile" : user.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center py-4">
                    <Image src={user.pic} roundedCircle width={150} height={150} className="mb-4 shadow-sm border p-1" />

                    {isOwnProfile ? (
                        <Form className="text-start px-3">
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold small text-muted">NAME</Form.Label>
                                <Form.Control value={name} onChange={(e) => setName(e.target.value)} className="rounded-3 border-0 bg-light" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold small text-muted">BIO</Form.Label>
                                <Form.Control as="textarea" rows={3} value={bio} onChange={(e) => setBio(e.target.value)} className="rounded-3 border-0 bg-light" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="fw-bold small text-muted">AVAILABILITY STATUS</Form.Label>
                                <Form.Select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-3 border-0 bg-light">
                                    <option>Online</option>
                                    <option>Away</option>
                                    <option>Busy</option>
                                </Form.Select>
                            </Form.Group>

                            <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded-3 mt-4">
                                <div className="d-flex align-items-center gap-2">
                                    {user.isPublic ? <Shield size={18} className="text-success" /> : <ShieldOff size={18} className="text-warning" />}
                                    <span className="fw-semibold small">{user.isPublic ? "Public Account" : "Private Account"}</span>
                                </div>
                                <Form.Check
                                    type="switch"
                                    id="privacy-switch"
                                    checked={!user.isPublic}
                                    onChange={handlePrivacyToggle}
                                />
                            </div>
                        </Form>
                    ) : (
                        <>
                            <div className="fs-5 text-muted mb-2">{user.email}</div>
                            <div className="p-3 bg-light rounded-3 mx-4 mb-3">
                                <div className="small fw-bold text-purple-gradient mb-1">BIO</div>
                                <div className="text-dark small">{user.bio || "No bio available"}</div>
                            </div>
                            <Badge bg={user.status === "Online" ? "success" : user.status === "Away" ? "warning" : "danger"} className="rounded-pill px-3">
                                {user.status || "Online"}
                            </Badge>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer className="border-0 justify-content-center">
                    {isOwnProfile ? (
                        <div className="d-flex gap-2">
                            <Button variant="light" className="rounded-pill px-4" onClick={handleClose}>Cancel</Button>
                            <Button className="bg-purple-gradient border-0 rounded-pill px-4 shadow-sm fw-bold" onClick={handleSave} disabled={loading}>
                                {loading ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    ) : (
                        <Button variant="secondary" onClick={handleClose} className="rounded-pill px-4">Close</Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default ProfileModal;
