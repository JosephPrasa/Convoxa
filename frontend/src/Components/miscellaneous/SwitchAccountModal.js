import React from "react";
import { Modal } from "react-bootstrap";
import Login from "../Authentication/Login";
import { ChatState } from "../../Context/ChatProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";

const SwitchAccountModal = ({ show, handleClose }) => {
    const { theme } = ChatState();

    return (
        <Modal show={show} onHide={handleClose} centered className="switch-account-modal">
            <Modal.Header closeButton closeVariant="white" className="border-0 pb-0">
                <Modal.Title className="fw-bold text-white w-100 text-center" style={{ marginLeft: "25px" }}>Switch Accounts</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4">
                <div className="p-2">
                    <GoogleOAuthProvider clientId="701224993949-sqd5rpvd9m3vq6mb4btcmce9pinlkmup.apps.googleusercontent.com">
                        <Login setTab={() => { }} />
                    </GoogleOAuthProvider>
                </div>
            </Modal.Body>

            <style>{`
                .switch-account-modal .modal-content {
                    background: linear-gradient(135deg, #1A1A1D 0%, #3B1C32 100%);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 15px;
                }
                .switch-account-modal .modal-header .btn-close {
                    z-index: 10;
                }
            `}</style>
        </Modal>
    );
};

export default SwitchAccountModal;
