import { Stack } from "react-bootstrap";
const ChatLoading = () => (
    <Stack gap={2}>{[...Array(8)].map((_, i) => (
        <div key={i} className="p-3 bg-light border rounded opacity-50" style={{ height: "40px" }} />
    ))}</Stack>
);
export default ChatLoading;
