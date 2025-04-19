import stockService from "./stockService.js";

const activeIntervals = new Map();

const handleStockSubscription = (socket) => {
  socket.on("subscribeToStock", (symbol) => {
    console.log(`📡 Subscribed to ${symbol}`);
    clearInterval(activeIntervals.get(socket.id)); 

    const interval = setInterval(async () => {
      console.log(`🔄 Fetching price for ${symbol}`);
      const price = await stockService(symbol);
      socket.emit("stockData", { symbol, price });
    }, 1000);

    activeIntervals.set(socket.id, interval);
  });

  socket.on("disconnect", () => {
    console.log(`❌ Client ${socket.id} disconnected`);
    clearInterval(activeIntervals.get(socket.id));
    activeIntervals.delete(socket.id);
  });
};

export default handleStockSubscription;
