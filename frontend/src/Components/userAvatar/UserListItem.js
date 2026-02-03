import React from "react";
import { Card, Image } from "react-bootstrap";
const UserListItem = ({ user, handleFunction }) => (
    <Card onClick={handleFunction} className="mb-2 p-2 border-0 shadow-sm" style={{ cursor: "pointer" }}>
        <div className="d-flex align-items-center gap-3">
            <Image src={user.pic} roundedCircle width={32} />
            <div><div className="fw-bold">{user.name}</div><div className="text-muted small">{user.email}</div></div>
        </div>
    </Card>
);
export default UserListItem;
