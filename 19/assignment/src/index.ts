import { WebSocketServer } from "ws";
import { v4 as uuidv4 } from "uuid";
import http from "http";

const server = http.createServer(function (request: any, response: any) {
  console.log(new Date() + " Received request for " + request.url);
  response.end("hi there");
});

const wss = new WebSocketServer({ server });

const users: {
  [key: string]: {
    room: string;
    ws: any;
  };
} = {};

wss.on("connection", async function connection(ws) {
  const id = uuidv4();

  ws.on("error", console.error);

  ws.on("message", (message) => {});
});
