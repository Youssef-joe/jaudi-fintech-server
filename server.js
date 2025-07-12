require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app")

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`)
})

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("DB is connected successfully")
    }).catch(err => console.error("DB connection error: ", err.message?  err.message :err))
