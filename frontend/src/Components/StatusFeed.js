import React, { useState, useEffect } from "react";
import { Card, Image, Modal, Form, Button } from "react-bootstrap";
import { Plus, Send } from "lucide-react";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";

const StatusFeed = () => {
    const [statuses, setStatuses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newStatus, setNewStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = ChatState();

    const fetchStatuses = React.useCallback(async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get("/api/status", config);
            setStatuses(data);
        } catch (error) {
            console.error("Error fetching statuses", error);
        }
    }, [user.token]);

    useEffect(() => {
        if (user) fetchStatuses();
    }, [user, fetchStatuses]);

    const [selectedStatus, setSelectedStatus] = useState(null);
    const [image, setImage] = useState("");

    const postDetails = (pics) => {
        setLoading(true);
        if (pics === undefined) {
            alert("Please Select an Image!");
            return;
        }
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
                    setImage(data.url.toString());
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        } else {
            alert("Please Select an Image!");
            setLoading(false);
        }
    };

    const handleCreateStatus = async () => {
        if (!newStatus && !image) return;
        try {
            setLoading(true);
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            await axios.post("/api/status", {
                content: image || newStatus,
                type: image ? "image" : "text",
                caption: image ? newStatus : ""
            }, config);
            setNewStatus("");
            setImage("");
            setShowModal(false);
            fetchStatuses();
            setLoading(false);
        } catch (error) {
            console.error("Error creating status", error);
            setLoading(false);
        }
    };

    const handleViewStatus = async (status) => {
        setSelectedStatus(status);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            await axios.put(`/api/status/${status._id}/view`, {}, config);
        } catch (error) {
            console.error("Error viewing status", error);
        }
    };

    return (
        <Card className="border-0 shadow-sm rounded-4 mb-4 overflow-hidden" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <Card.Body className="p-3 d-flex gap-4 overflow-auto no-scrollbar">
                {/* Add Status */}
                <div className="text-center cursor-pointer" style={{ minWidth: "66px" }} onClick={() => setShowModal(true)}>
                    <div className="position-relative d-inline-block">
                        <div className="bg-dark p-0.5 rounded-circle border border-secondary" style={{ width: "66px", height: "66px" }}>
                            <Image src={user.pic} roundedCircle className="w-100 h-100" style={{ objectFit: "cover", opacity: 0.7 }} />
                        </div>
                        <div className="position-absolute bottom-0 end-0 bg-primary rounded-circle border border-dark p-1 d-flex align-items-center justify-content-center" style={{ width: "22px", height: "22px" }}>
                            <Plus size={14} className="text-white" />
                        </div>
                    </div>
                    <p className="small mb-0 text-white opacity-75 mt-1" style={{ fontSize: "11px" }}>Your Story</p>
                </div>

                {statuses.map(status => (
                    <div key={status._id} className="text-center cursor-pointer" style={{ minWidth: "66px" }} onClick={() => handleViewStatus(status)}>
                        <div className="bg-rose-gradient-border p-0.5 rounded-circle">
                            <div className="bg-dark p-0.5 rounded-circle">
                                <Image src={status.user.pic} roundedCircle width={62} height={62} style={{ objectFit: "cover" }} />
                            </div>
                        </div>
                        <p className="small mb-0 text-white opacity-75 mt-1 text-truncate" style={{ fontSize: "11px", maxWidth: "66px" }}>{status.user.name}</p>
                    </div>
                ))}
            </Card.Body>

            {/* Create Status Modal */}
            <Modal show={showModal} onHide={() => { setShowModal(false); setImage(""); setNewStatus(""); }} centered contentClassName="bg-dark text-white border-secondary rounded-4">
                <Modal.Header closeButton closeVariant="white" className="border-secondary">
                    <Modal.Title className="fs-5 fw-bold">Create Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={(e) => postDetails(e.target.files[0])}
                            className="bg-dark border-secondary text-white shadow-none mb-2"
                        />
                        {image && <Image src={image} className="w-100 mb-2 rounded" style={{ maxHeight: "200px", objectFit: "contain" }} />}
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder={image ? "Add a caption..." : "What's on your mind?"}
                            className="bg-dark border-secondary text-white shadow-none"
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer className="border-0">
                    <Button
                        className="bg-rose-gradient border-0 rounded-pill px-4 fw-bold"
                        onClick={handleCreateStatus}
                        disabled={loading || (!newStatus && !image)}
                    >
                        {loading ? "Posting..." : <><Send size={18} className="me-2" /> Share Status</>}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* View Status Modal */}
            <Modal show={!!selectedStatus} onHide={() => setSelectedStatus(null)} centered contentClassName="bg-black text-white border-0 rounded-0" fullscreen>
                <Modal.Header closeButton closeVariant="white" className="border-0 position-absolute top-0 end-0 z-index-10"></Modal.Header>
                <Modal.Body className="p-0 d-flex flex-column align-items-center justify-content-center h-100 bg-black">
                    {selectedStatus && (
                        <div className="position-relative w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                            <div className="position-absolute top-0 start-0 w-100 p-3 d-flex align-items-center gap-3 bg-gradient-top">
                                <Image src={selectedStatus.user.pic} roundedCircle width={40} height={40} />
                                <div>
                                    <p className="m-0 fw-bold">{selectedStatus.user.name}</p>
                                    <p className="m-0 opacity-50 small">{new Date(selectedStatus.createdAt).toLocaleTimeString()}</p>
                                </div>
                            </div>

                            {selectedStatus.type === "image" ? (
                                <Image src={selectedStatus.content} className="mw-100 mh-100" style={{ objectFit: "contain" }} />
                            ) : (
                                <div className="p-5 text-center fs-2 fw-bold" style={{ wordBreak: "break-word" }}>
                                    {selectedStatus.content}
                                </div>
                            )}

                            {selectedStatus.caption && (
                                <div className="position-absolute bottom-0 w-100 p-4 text-center bg-gradient-bottom">
                                    <p className="m-0">{selectedStatus.caption}</p>
                                </div>
                            )}
                        </div>
                    )}
                </Modal.Body>
            </Modal>

            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .bg-rose-gradient-border {
                    background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
                }
                .bg-rose-gradient {
                    background: linear-gradient(135deg, #6A1E55, #A64D79) !important;
                }
                .bg-gradient-top {
                    background: linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%);
                }
                .bg-gradient-bottom {
                    background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%);
                }
            `}</style>
        </Card>
    );
};

export default StatusFeed;
