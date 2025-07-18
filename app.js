const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({
    origin: "http://localhost:8080",
    cradentials: true
}));
app.use(express.json());

// here's the place for routes
app.use("/api/auth", require("./routes/auth.routes.js"));
app.use("/api/transactions", require("./routes/transactions.routes"));
app.use("/api/audit-logs", require("./routes/audit.routes.js"));
app.use("/api", require("./routes/rates.route.js"));

module.exports = app;
