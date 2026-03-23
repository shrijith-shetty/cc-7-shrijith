// server.ts
import net from "node:net";

const PORT = 3000;

const server = net.createServer((socket) => {
  socket.on("data", (chunk) => {
    const request = chunk.toString();

    console.log("Raw Request:\n", request);

    const [requestLine] = request.split("\r\n");
    const [method, path] = requestLine.split(" ");

    if (method !== "GET") {
      socket.write(
        "HTTP/1.1 405 Method Not Allowed\r\nContent-Length: 0\r\n\r\n"
      );
      socket.end();
      return;
    }

    // Routing
    if (path === "/") {
      const body = "Hello from Node net server!";
      socket.write(
        `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${body.length}\r\n\r\n${body}`
      );
    } else if (path === "/hello") {
      const body = "Hello Route!";
      socket.write(
        `HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${body.length}\r\n\r\n${body}`
      );
    } else {
      const body = "Not Found";
      socket.write(
        `HTTP/1.1 404 Not Found\r\nContent-Type: text/plain\r\nContent-Length: ${body.length}\r\n\r\n${body}`
      );
    }

    socket.end();
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});