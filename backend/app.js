const express = require("express")
const route = require("./routes/route")
const cookieParser = require("cookie-parser")
const Authcontroller = require("./controllers/Authcontroller")
const authenticateToken = require("./config/authenticate")
const cors = require("cors");


const app = express()
app.use(cors());

app.use(express.json())
app.use(cookieParser());

app.post("/api/register", Authcontroller.register);
app.post("/api/login", Authcontroller.login);
app.post("/api/refresh", Authcontroller.refresh);
app.post("/api/logout", Authcontroller.logout);

app.use("/api", authenticateToken, route)

app.listen(process.env.PORT, () => {
    console.log(`The app is listening to port no: ${process.env.PORT}`)
})