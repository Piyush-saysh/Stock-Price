// import axios from "axios";

// const getStockPrice = async (symbol) => {
//   const apiKey = process.env.FINNHUB_API_KEY;
//     if (!apiKey) {
//         console.error("API key is not defined");
//         return null;
//     }
//   const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`;
//     console.log("Fetching stock price from URL:", url);
//   try {
//     const response = await axios.get(url);
//     if (response.status !== 200) {
//       throw new Error(`Error fetching stock data: ${response.status}`);
//     }
//     return response.data.c; // current price
//   } catch (error) {
//     console.error("Stock API error:", error);
//     return null;
//   }
// };

// export default getStockPrice;
import axios from "axios";

const fetchQuote = async (symbol) => {
  const apiKey = process.env.FINNHUB_API_KEY;
  if (!apiKey) throw new Error("Missing FINNHUB_API_KEY");

  const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`;
  console.log(`🌐 Fetching: ${url}`);

  const { data, status } = await axios.get(url);
  if (status !== 200) throw new Error("Failed to fetch data");

  return data.c; // current price
};

export default fetchQuote;
