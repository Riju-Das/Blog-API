const express = require("express")
const route = require("./routes/route")
const cookieParser = require("cookie-parser")
const Authcontroller = require("./controllers/Authcontroller")
const authenticateToken = require("./config/authenticate")
const cors = require("cors");


const app = express()
app.use(cors({
    origin: "http://localhost:5173", // or your frontend URL
    credentials: true
}));

app.use(express.json())
app.use(cookieParser());

app.use("/api", route)

app.listen(process.env.PORT, () => {
    console.log(`The app is listening to port no: ${process.env.PORT}`)
})