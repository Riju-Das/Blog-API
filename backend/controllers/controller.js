const db = require("../db/queries")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

require("dotenv").config()

function generateAccessToken(user) {
    return jwt.sign(
        { id: user.id, username: user.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
    );
}

function generateRefreshToken(user) {
    return jwt.sign(
        { id: user.id, username: user.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    );
}

async function register(req, res) {
    try {
        const { username, fullname, email, password } = req.body
        const existing = await db.findUserByUsername(username);

        if (existing) return res.status(400).json({ message: "user already exists" })

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await db.createUser(username, fullname, email, hashedPassword)

        res.json({ message: "user registered", user: { id: user.id, username: user.username } })
    }
    catch (err) {
        console.log("registration error ", err)
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function login(req, res) {
    try {
        const { username, password } = req.body

        const user = await db.findUserByUsername(username)

        if (!user) return res.status(400).json({ message: "Invalid Credentials" })

        const valid = await bcrypt.compare(password, user.password)
        if (!valid) return res.status(400).json({ message: "Inavlid Credentials" })

        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)

        await db.saveRefreshToken(user.id, refreshToken)

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "none"
        })

        res.json({ accessToken })
    }
    catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function refresh(req, res) {
    try {
        const token = req.cookies.refreshToken
        if (!token) return res.status(401).json({ message: "No refresh Token" });

        const userData = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET , (err, decoded)=>{
            if (err) return null;
            return decoded
        })
        if (!userData) return res.status(403).json({ message: "Invalid refresh token" });

        const user = await db.findUserByUsername(userData.username)

        if (!user || !user.refreshTokens.includes(token)) {
            return res.status(403).json({ message: "Refresh token revoked" });
        }
        const newAccessToken = generateAccessToken(user)
        res.json({ accessToken: newAccessToken });

    }
    catch (err) {
        console.error("Refresh error:", err);
        return res.status(403).json({ message: "Invalid or expired refresh token" });
    }

}

async function logout(req, res) {
    try {
        const token = req.cookies.refreshToken;
        res.clearCookie("refreshToken");

        if (!token) return res.json({ message: "Logged out" });

        const user = await db.findUserByRefreshToken(token);
        if (user) await db.removeRefreshToken(user.id, token);

        res.json({ message: "Logged out" });
        
    } catch (err) {
        console.error("Logout error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}



module.exports = {
    register,
    login,
    refresh,
    logout
}

