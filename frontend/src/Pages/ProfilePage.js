import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Image, Button, Badge } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { MessageSquare, UserPlus, UserCheck, MapPin, Link as LinkIcon, Calendar } from "lucide-react";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import Sidebar from "../Components/miscellaneous/Sidebar";

const ProfilePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user, setSelectedChat, chats, setChats } = ChatState();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                // Assuming we can get a single user's details via the same allUsers search or a specific route
                // For MVP, we'll try to find the user in the allUsers search if a specific GET /api/user/:id doesn't exist
                const { data } = await axios.get(`/api/user?search=${id}`, config);
                const foundUser = data.find(u => u._id === id);
                setProfile(foundUser);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching profile", error);
                setLoading(false);
            }
        };

        if (user && id) fetchProfile();
    }, [id, user]);

    const handleFollow = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            await axios.put(`/api/user/follow/${profile._id}`, {}, config);
            // Refresh profile
            const { data } = await axios.get(`/api/user?search=${id}`, config);
            setProfile(data.find(u => u._id === id));
        } catch (error) {
            console.error("Error following user", error);
        }
    };

    const accessChat = async () => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post(`/api/chat`, { userId: profile._id }, config);

            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
            setSelectedChat(data);
            navigate("/chats");
        } catch (error) {
            alert(error.response?.data?.message || "Error accessing chat");
        }
    };

    if (loading) return <div className="text-center py-5 text-white">Loading...</div>;
    if (!profile) return <div className="text-center py-5 text-white">User not found</div>;

    const isFollowing = user.following?.includes(profile._id) || profile.followers?.includes(user._id);

    return (
        <div style={{ background: "linear-gradient(135deg, #1A1A1D 0%, #3B1C32 100%)", minHeight: "100vh", color: "white" }}>
            <Sidebar user={user} />

            <Container className="ms-lg-auto me-lg-0 pe-lg-5" style={{ maxWidth: "935px", paddingTop: "50px" }}>
                <Row className="mb-5">
                    <Col md={4} className="text-center mb-4 mb-md-0">
                        <div className="bg-rose-gradient-border p-1 rounded-circle d-inline-block shadow-lg">
                            <div className="bg-dark p-1 rounded-circle">
                                <Image src={profile.pic} roundedCircle width={150} height={150} style={{ objectFit: 'cover' }} />
                            </div>
                        </div>
                    </Col>
                    <Col md={8}>
                        <div className="d-flex align-items-center gap-4 mb-3 flex-wrap">
                            <h2 className="fw-light mb-0">{profile.username || profile.name.split(' ')[0].toLowerCase()}</h2>
                            <div className="d-flex gap-2">
                                <Button
                                    variant={isFollowing ? "outline-light" : "primary"}
                                    className={`rounded-3 fw-bold border-0 px-4 ${!isFollowing && 'bg-rose-gradient'}`}
                                    onClick={handleFollow}
                                >
                                    {isFollowing ? "Following" : "Follow"}
                                </Button>
                                <Button variant="outline-light" className="rounded-3 fw-bold" onClick={accessChat}>Message</Button>
                            </div>
                        </div>

                        <div className="d-flex gap-4 mb-4">
                            <span><strong className="text-white">{profile.posts?.length || 0}</strong> posts</span>
                            <span><strong className="text-white">{profile.followers?.length || 0}</strong> followers</span>
                            <span><strong className="text-white">{profile.following?.length || 0}</strong> following</span>
                        </div>

                        <div className="mb-3">
                            <h6 className="fw-bold mb-1">{profile.name}</h6>
                            <p className="mb-0 text-light opacity-90" style={{ whiteSpace: 'pre-wrap' }}>{profile.bio || "No bio available."}</p>
                        </div>

                        {profile.interests && profile.interests.length > 0 && (
                            <div className="d-flex flex-wrap gap-2">
                                {profile.interests.map((interest, i) => (
                                    <Badge key={i} bg="secondary" className="bg-opacity-25 rounded-pill px-3 py-2 fw-normal" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                                        {interest}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </Col>
                </Row>

                <hr className="opacity-10 mb-5" />

                <div className="text-center py-5 bg-dark bg-opacity-25 rounded-4 border border-secondary border-dashed">
                    <div className="mb-3 opacity-25">
                        <Image src="https://img.icons8.com/ios/100/ffffff/camera.png" width={50} />
                    </div>
                    <h4 className="fw-bold opacity-50">No Posts Yet</h4>
                </div>
            </Container>

            <style>{`
                .bg-rose-gradient-border {
                    background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
                }
                .bg-rose-gradient {
                    background: linear-gradient(135deg, #6A1E55, #A64D79) !important;
                }
            `}</style>
        </div>
    );
};

export default ProfilePage;
