// client.ts
import net from "node:net";

const HOST = "127.0.0.1"; // or your friend's IP (e.g. 192.168.1.5)
const PORT = 3000;

const client = net.createConnection({ host: HOST, port: PORT }, () => {
  console.log("Connected to server");

  // Send raw HTTP request
  const request = `GET /hello HTTP/1.1\r
Host: ${HOST}:${PORT}\r
Connection: close\r
\r
`;

  client.write(request);
});

client.on("data", (data) => {
  console.log("Response from server:\n");
  console.log(data.toString());
});

client.on("end", () => {
  console.log("Disconnected from server");
});

client.on("error", (err) => {
  console.error("Error:", err.message);
});