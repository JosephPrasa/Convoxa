import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Paperclip } from "lucide-react";
import { ChatState } from "../../Context/ChatProvider";

const ReportProblemModal = ({ show, handleClose }) => {
    const { theme } = ChatState();

    return (
        <Modal show={show} onHide={handleClose} centered className="report-modal">
            <Modal.Header closeButton closeVariant={theme === "light" ? undefined : "white"} className="border-secondary">
                <Modal.Title className={`fw-bold ${theme === "light" ? "text-dark" : "text-white"}`}>Report a problem</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="Please include as much info as possible..."
                            className={`border-secondary ${theme === "light" ? "bg-white text-dark" : "bg-black text-white"}`}
                            style={{ resize: "none" }}
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-between align-items-center">
                        <Button variant="secondary" className="d-flex align-items-center gap-2 bg-transparent border-secondary text-secondary hover-white">
                            <Paperclip size={18} />
                            Add file
                        </Button>
                        <Button className="bg-primary border-0 fw-bold px-4">
                            Send report
                        </Button>
                    </div>
                </Form>
                <div className="mt-3 text-secondary small">
                    Your convoxa username and browser information will be automatically included in your report.
                </div>
            </Modal.Body>

            <style>{`
                .report-modal .modal-content {
                    background: ${theme === "light" ? "#fff" : "var(--charcoal)"};
                    border: 1px solid var(--glass-border);
                    color: ${theme === "light" ? "#000" : "var(--text-primary)"};
                    border-radius: 15px;
                }
                .hover-white:hover {
                    color: ${theme === "light" ? "#000" : "#fff"} !important;
                    background: ${theme === "light" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.1)"} !important;
                }
            `}</style>
        </Modal>
    );
};

export default ReportProblemModal;
