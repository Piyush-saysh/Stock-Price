// import express from "express";
// import http from "http";
// import { Server } from "socket.io";
// import cors from "cors";
// import stockService from "./services/stockService.js";
// import dotenv from "dotenv";
// dotenv.config();

// const app = express();
// app.use(cors());
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log("Client connected");

//   socket.on("subscribeToStock", async (symbol) => {
//     setInterval(async () => {
//       console.log(`Fetching price for ${symbol}`);
//       const price = await stockService(symbol);

//       socket.emit("stockData", { symbol, price });
//     }, 3000); // every 3s
//   });
// });

// server.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`);
// });

import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import handleStockSubscription from "./services/stockHandler.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
});

app.use(cors());

io.on("connection", (socket) => {
  console.log("✅ Client connected:", socket.id);
  handleStockSubscription(socket);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
