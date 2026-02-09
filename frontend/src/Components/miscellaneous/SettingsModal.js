import React from "react";
import { Modal, Button, Form, ListGroup } from "react-bootstrap";
import { Settings, Moon, Lock, Shield, LogOut, ChevronRight } from "lucide-react";
import { ChatState } from "../../Context/ChatProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SettingsModal = ({ show, handleClose }) => {
    const { user, setUser } = ChatState();
    const navigate = useNavigate();

    const [editMode, setEditMode] = React.useState(false);
    const [name, setName] = React.useState(user?.name || "");
    const [bio, setBio] = React.useState(user?.bio || "");
    const [interests, setInterests] = React.useState(user?.interests?.join(", ") || "");
    const [pic, setPic] = React.useState(user?.pic || "");
    const [loading, setLoading] = React.useState(false);

    const postDetails = (pics) => {
        setLoading(true);
        if (pics === undefined) return;
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chat-app");
            data.append("cloud_name", "piyushkumar");
            fetch("https://api.cloudinary.com/v1_1/piyushkumar/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setPic(data.url.toString());
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        }
    };

    const updateProfile = async () => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.put(
                "/api/user/profile",
                { name, bio, pic, interests: interests.split(",").map(i => i.trim()) },
                config
            );
            setUser(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            setEditMode(false);
            setLoading(false);
        } catch (error) {
            console.error("Error updating profile", error);
            setLoading(false);
        }
    };

    const togglePrivacy = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.put("/api/user/privacy", {}, config);
            const updatedUser = { ...user, isPublic: data.isPublic };
            setUser(updatedUser);
            localStorage.setItem("userInfo", JSON.stringify(updatedUser));
        } catch (error) {
            console.error("Error toggling privacy", error);
        }
    };

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate("/");
    };

    return (
        <Modal show={show} onHide={handleClose} centered className="settings-modal">
            <Modal.Header closeButton closeVariant="white" className="bg-dark border-secondary">
                <Modal.Title className="text-white d-flex align-items-center gap-2">
                    {editMode ? (
                        <div className="d-flex align-items-center gap-2">
                            <Button variant="link" className="text-white p-0" onClick={() => setEditMode(false)}><ChevronRight style={{ transform: 'rotate(180deg)' }} /></Button>
                            Edit Profile
                        </div>
                    ) : (
                        <><Settings size={20} /> Settings</>
                    )}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-dark p-0">
                {editMode ? (
                    <div className="p-4">
                        <Form>
                            <div className="text-center mb-4">
                                <div className="position-relative d-inline-block">
                                    <img src={pic} alt="profile" width={100} height={100} className="rounded-circle border border-secondary" style={{ objectFit: 'cover' }} />
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => postDetails(e.target.files[0])}
                                        className="position-absolute top-0 start-0 w-100 h-100 opacity-0 cursor-pointer"
                                    />
                                    <div className="mt-2 small text-rose cursor-pointer">Change Photo</div>
                                </div>
                            </div>
                            <Form.Group className="mb-3">
                                <Form.Label className="text-secondary small">Name</Form.Label>
                                <Form.Control className="bg-black border-secondary text-white" value={name} onChange={(e) => setName(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="text-secondary small">Bio</Form.Label>
                                <Form.Control as="textarea" rows={3} className="bg-black border-secondary text-white" value={bio} onChange={(e) => setBio(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label className="text-secondary small">Interests (comma separated)</Form.Label>
                                <Form.Control className="bg-black border-secondary text-white" value={interests} onChange={(e) => setInterests(e.target.value)} />
                            </Form.Group>
                            <Button className="bg-rose-gradient w-100 border-0 rounded-pill fw-bold mt-3" onClick={updateProfile} disabled={loading}>
                                {loading ? "Saving..." : "Save Changes"}
                            </Button>
                        </Form>
                    </div>
                ) : (
                    <ListGroup variant="flush">
                        <ListGroup.Item className="bg-transparent border-secondary text-white py-3 px-4 d-flex align-items-center justify-content-between cursor-pointer hover-bg-light" onClick={() => setEditMode(true)}>
                            <div className="d-flex align-items-center gap-3">
                                <div className="bg-secondary bg-opacity-25 p-2 rounded-circle">
                                    <Settings size={20} className="text-white" />
                                </div>
                                <p className="mb-0 fw-medium">Edit Profile</p>
                            </div>
                            <ChevronRight size={18} className="text-secondary" />
                        </ListGroup.Item>

                        <ListGroup.Item className="bg-transparent border-secondary text-white py-3 px-4 d-flex align-items-center justify-content-between cursor-pointer hover-bg-light">
                            <div className="d-flex align-items-center gap-3">
                                <Moon size={20} className="text-secondary" />
                                <div>
                                    <p className="mb-0 fw-medium">Appearance</p>
                                    <small className="text-secondary">Dark Mode</small>
                                </div>
                            </div>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                defaultChecked
                                className="custom-switch"
                            />
                        </ListGroup.Item>

                        <ListGroup.Item className="bg-transparent border-secondary text-white py-3 px-4 d-flex align-items-center justify-content-between cursor-pointer hover-bg-light" onClick={togglePrivacy}>
                            <div className="d-flex align-items-center gap-3">
                                <Lock size={20} className="text-secondary" />
                                <div>
                                    <p className="mb-0 fw-medium">Privacy</p>
                                    <small className="text-secondary">{user?.isPublic ? "Public Account" : "Private Account"}</small>
                                </div>
                            </div>
                            <ChevronRight size={18} className="text-secondary" />
                        </ListGroup.Item>

                        <ListGroup.Item className="bg-transparent border-secondary text-white py-3 px-4 d-flex align-items-center gap-3 cursor-pointer hover-bg-light">
                            <Shield size={20} className="text-secondary" />
                            <div>
                                <p className="mb-0 fw-medium">Security</p>
                                <small className="text-secondary">Password and authentication</small>
                            </div>
                        </ListGroup.Item>

                        <ListGroup.Item className="bg-transparent border-0 text-danger py-3 px-4 d-flex align-items-center gap-3 cursor-pointer hover-bg-light" onClick={logoutHandler}>
                            <LogOut size={20} />
                            <p className="mb-0 fw-bold">Log out</p>
                        </ListGroup.Item>
                    </ListGroup>
                )}
            </Modal.Body>

            <style jsx>{`
                .settings-modal .modal-content {
                    background: #1A1A1D;
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 15px;
                    overflow: hidden;
                }
                .hover-bg-light:hover {
                    background: rgba(255,255,255,0.05) !important;
                }
                .cursor-pointer { cursor: pointer; }
                .text-rose { color: #A64D79; }
                .bg-rose-gradient {
                    background: linear-gradient(135deg, #1A1A1D 0%, #3B1C32 50%, #6A1E55 100%) !important;
                }
            `}</style>
        </Modal>
    );
};

export default SettingsModal;
