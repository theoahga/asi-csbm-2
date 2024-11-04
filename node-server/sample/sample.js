// Connect to server with user_id
const socket = io("http://localhost:3000", {
    query: {
        user_id: "12345"
    }
});

// Send a message to another user (if "all" all user receive it )
function sendMessage(recipient_id, message) {
    socket.emit("receivemessage", { recipient_id, message });
}

// Listen for incoming messages
socket.on("sendmessage", ({ sender_id, message }) => {
    console.log(`Message from ${sender_id}: ${message}`);
});
