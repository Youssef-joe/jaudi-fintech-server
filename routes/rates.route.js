const express = require("express");
const router = express.Router();

let cache = {};
const CACHE_TTL = 60 * 1000; // 1 minute

router.get("/rates", (req, res) => {
  const { from, to } = req.query;
  const key = `${from}_${to}`;
  const now = Date.now();

  if (cache[key] && now - cache[key].timestamp < CACHE_TTL) {
    return res.json({ rate: cache[key].rate, cached: true });
  }

  if (from === "USD" && to === "USDC") {
    const rate = 1.0;
    cache[key] = { rate, timestamp: now };
    return res.json({ rate, cached: false });
  }

  return res.status(400).json({ message: "Unsupported currency pair" });
});

module.exports = router;
