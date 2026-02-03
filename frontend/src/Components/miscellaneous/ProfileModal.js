import React, { useState } from "react";
import { Modal, Button, Image } from "react-bootstrap";
import { Eye } from "lucide-react";

const ProfileModal = ({ user, children }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            {children ? <span onClick={handleShow}>{children}</span> : <Button variant="light" onClick={handleShow}><Eye size={18} /></Button>}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton className="border-0"><Modal.Title className="w-100 text-center fw-bold fs-3">{user.name}</Modal.Title></Modal.Header>
                <Modal.Body className="text-center py-4">
                    <Image src={user.pic} roundedCircle width={150} height={150} className="mb-4 shadow-sm border p-1" />
                    <div className="fs-5 text-muted">Email: {user.email}</div>
                </Modal.Body>
                <Modal.Footer className="border-0 justify-content-center"><Button variant="secondary" onClick={handleClose}>Close</Button></Modal.Footer>
            </Modal>
        </>
    );
};
export default ProfileModal;
