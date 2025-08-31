const express = require("express")
const route = require("./routes/route")
const cookieParser = require("cookie-parser")
const controller = require("./controllers/controller")
const authenticateToken = require("./config/authenticate")


const app = express()
app.use(cors());

app.use(express.json())
app.use(cookieParser());

app.post("/api/register" , controller.register);
app.post("/api/login" , controller.login);
app.post("/api/refresh", controller.refresh);
app.post("/api/logout", controller.logout);

app.use("/api", authenticateToken, route)

app.listen(process.env.PORT , ()=>{
    console.log(`The app is listening to port no: ${process.env.PORT}`)
})