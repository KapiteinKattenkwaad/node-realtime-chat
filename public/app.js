const ws = new WebSocket(`ws://${window.location.host}`);
const messages = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const usernameInput = document.getElementById('usernameInput');
const sendButton = document.getElementById('sendButton');

ws.onopen = () => {
    console.log('Connected to the server');
};

ws.onmessage = (event) => {
    const messagesList = document.getElementById('messages');
    if (!messagesList) return;

    try {
        const { userName, message } = JSON.parse(event.data);
        const li = document.createElement('li');
        li.textContent = `${userName}: ${message}`;
        li.classList.add('list-disc');
        messagesList.appendChild(li);
      } catch (err) {
        console.error("Failed to parse incoming message:", err);
      }
  };

ws.onerror = (error) => {
    console.error('WebSocket error:', error);
};

ws.onclose = () => {
    console.log('Disconnected from the server');
};

sendButton.onclick = () => {
    const message = messageInput.value;
    const userName = usernameInput.value;

    const payload = {
        userName,
        message
      };

    ws.send(JSON.stringify(payload));
    messageInput.value = '';
};