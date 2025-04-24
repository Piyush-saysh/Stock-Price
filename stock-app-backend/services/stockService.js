import axios from "axios";

const fetchQuote = async (symbol) => {
  const apiKey = process.env.FINNHUB_API_KEY;
  if (!apiKey) throw new Error("Missing FINNHUB_API_KEY");

  const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`;
  console.log(`🌐 Fetching: ${url}`);

  const { data, status } = await axios.get(url);
  if (status !== 200) throw new Error("Failed to fetch data");

  return data.c; 
};

export default fetchQuote;
