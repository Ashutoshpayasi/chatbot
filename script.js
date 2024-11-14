// Bot responses
const botResponses = [
    "Hello! How can I help you today?",
    "That's interesting! Tell me more.",
    "I understand what you mean.",
    "Thanks for sharing that with me!",
    "Let me think about that for a moment...",
    "That's a great question!",
    "I'm here to help you with anything you need.",
    "Could you elaborate on that?",
    "I appreciate your patience.",
    "That's a unique perspective!"
];

// DOM elements
const chatArea = document.getElementById('chat');
const userInput = document.getElementById('user');
const sendButton = document.getElementById('send');
const mediaInput = document.getElementById('media');

// Send message function
function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;
    addMessage(message, 'user-message');
    userInput.value = '';
    setTimeout(() => {
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        addMessage(randomResponse, 'bot-message');
    }, 1000);
}

// Add message to chat
function addMessage(message, className) {
    const messageContainer = document.createElement('div');
    messageContainer.className = 'message-container';

    const messageElement = document.createElement('div');
    messageElement.className = `message ${className}`;
    messageElement.textContent = message;

    messageContainer.appendChild(messageElement);
    chatArea.appendChild(messageContainer);
    chatArea.scrollTop = chatArea.scrollHeight;
}

// Handle media upload
function handleMediaUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const messageContainer = document.createElement('div');
            messageContainer.className = 'message-container';

            const messageElement = document.createElement('div');
            messageElement.className = 'message user-message';

            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.className = 'media-content';
                messageElement.appendChild(img);
            }

            messageContainer.appendChild(messageElement);
            chatArea.appendChild(messageContainer);
            chatArea.scrollTop = chatArea.scrollHeight;
        };
        reader.readAsDataURL(file);

        // Bot response to media
        setTimeout(() => {
            addMessage("I received your image!", 'bot-message');
        }, 1000);
    }
}

// Event listeners
sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
mediaInput.addEventListener('change', handleMediaUpload);

// Initial bot greeting
setTimeout(() => {
    addMessage("Hi! I'm your chatbot assistant. How can I help you today?", 'bot-message');
}, 500);