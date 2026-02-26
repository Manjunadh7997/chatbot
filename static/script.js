document.getElementById('chat-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const inputField = document.getElementById('user-input');
    const chatWindow = document.getElementById('chat-window');
    const message = inputField.value;

    // Append User Message
    chatWindow.innerHTML += `<div class="user-message mb-2 text-end"><strong>You:</strong> ${message}</div>`;
    inputField.value = '';

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();
        
        // Append Bot Message
        if (data.response) {
            chatWindow.innerHTML += `<div class="bot-message mb-2"><strong>AI:</strong> ${data.response}</div>`;
        } else {
            chatWindow.innerHTML += `<div class="text-danger">Error: ${data.error}</div>`;
        }
        
        chatWindow.scrollTop = chatWindow.scrollHeight;
    } catch (err) {
        console.error("Failed to send message:", err);
    }
});