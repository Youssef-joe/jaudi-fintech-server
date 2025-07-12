const express = require("express")
const cors = require("cors")
const app = express();

app.use(cors());
app.use(express.json());


// here's the place for routes
app.use("/auth", require("./routes/auth.routes.js"))
app.use('/transactions', require('./routes/transactions.routes'));
app.use('/audit-logs', require("./routes/audit.routes.js"))





module.exports = app
