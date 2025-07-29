const express = require('express');
const http = require('http');
const { Server } = require('ws');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3005;
app.use(express.static(path.join(__dirname, 'public')));
const server = http.createServer(app);
const wss = new Server({ server });
wss.on('connection', function connection(ws) {
    console.log("WS connection arrived");
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        ws.send(`Echo: ${message}`);
    });
    ws.send('Welcome to the chat!');
});
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
