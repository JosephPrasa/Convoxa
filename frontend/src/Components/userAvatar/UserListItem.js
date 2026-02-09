import React from "react";
import { Card, Image, Button } from "react-bootstrap";

const UserListItem = ({ user, handleFunction, followHandler, currentUser }) => {
    const isFollowing = currentUser?.following?.includes(user._id);
    const isRequested = user.followRequests?.includes(currentUser?._id);

    return (
        <Card className="mb-2 p-2 border-0 shadow-sm transition-hover">
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3" onClick={handleFunction} style={{ cursor: "pointer", flexGrow: 1 }}>
                    <Image src={user.pic} roundedCircle width={40} height={40} style={{ objectFit: "cover" }} />
                    <div>
                        <div className="fw-bold">{user.name}</div>
                        <div className="text-muted small">{user.email}</div>
                    </div>
                </div>
                {currentUser?._id !== user._id && (
                    <Button
                        size="sm"
                        variant={isFollowing ? "outline-secondary" : isRequested ? "light" : "primary"}
                        className={`rounded-pill px-3 fw-bold ${!isFollowing && !isRequested ? 'bg-purple-gradient border-0' : ''}`}
                        onClick={(e) => { e.stopPropagation(); followHandler(user); }}
                        disabled={isFollowing || isRequested}
                    >
                        {isFollowing ? "Following" : isRequested ? "Requested" : user.isPublic ? "Follow" : "Request"}
                    </Button>
                )}
            </div>
        </Card>
    );
};
export default UserListItem;
