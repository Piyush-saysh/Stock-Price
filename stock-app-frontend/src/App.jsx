import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND_URL);

function App() {
  const [inputSymbol, setInputSymbol] = useState("");
  const [symbols, setSymbols] = useState(["AAPL"]);
  const [stockData, setStockData] = useState({});

  const subscribe = (symbol) => {
    symbol = symbol.toUpperCase();
    if (!symbol || symbols.includes(symbol)) return;

    setSymbols((prev) => [...prev, symbol]);
    setStockData((prev) => ({
      ...prev,
      [symbol]: { price: null, loading: true },
    }));

    socket.emit("subscribeToStock", symbol);
  };

  useEffect(() => {
    symbols.forEach((symbol) => {
      socket.emit("subscribeToStock", symbol);
      setStockData((prev) => ({
        ...prev,
        [symbol]: { price: null, loading: true },
      }));
    });

    const onData = (data) => {
      const { symbol, price } = data;
      setStockData((prev) => ({
        ...prev,
        [symbol]: { price, loading: false },
      }));
    };

    socket.on("stockData", onData);

    return () => {
      socket.off("stockData", onData);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-900 text-white py-10 px-4">
      <h1 className="text-4xl mb-6 font-bold">📊 Stock Prices</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={inputSymbol}
          onChange={(e) => setInputSymbol(e.target.value.toUpperCase())}
          className="px-4 py-2 bg-gray-800 border border-gray-600 text-white rounded"
          placeholder="Enter stock symbol"
        />
        <button
          onClick={() => {
            subscribe(inputSymbol);
            setInputSymbol("");
          }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition duration-200"
        >
          Add
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl">
        {symbols.map((symbol) => {
          const data = stockData[symbol];
          return (
            <div
              key={symbol}
              className="bg-gray-800 p-4 rounded shadow flex flex-col items-center justify-center"
            >
              <div className="text-xl font-bold">{symbol}</div>
              <div className="text-lg mt-2">
                {data?.loading ? (
                  <span className="text-yellow-400">Loading...</span>
                ) : (
                  <span className="text-green-400">${data?.price}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
