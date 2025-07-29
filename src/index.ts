const express = require('express');
const http = require('http');
const { Server } = require('ws');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.static(path.join(__dirname, '../public')));

const server = http.createServer(app);

const wss = new Server({ server });

const clients = [];

wss.on('connection', function connection(ws) {
    console.log("WS connection arrived");

    clients.push(ws);

    ws.on('message', function incoming(payload) {
        const parsed = JSON.parse(payload.toString());
        const { userName, message } = parsed;

        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                const data = JSON.stringify({ userName, message });
                ws.send(data);
            }
        });
    });

    ws.on('close', () => {
        const index = clients.indexOf(ws);
        if (index > -1) {
            clients.splice(index, 1);
        }
    });

    ws.send(JSON.stringify({ userName: "Server", message: "Welcome to the chat!" }));
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});