const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const User = require("./models/User")
const app = express();

const secret = "sdasdasdsad"
const salt = bcrypt.genSaltSync(10);
app.use(cors({ credentials: true, origin: "http://localhost:5173" }))
app.use(express.json());
app.use(cookieParser())

mongoose.connect("mongodb+srv://blog:abcdmnopxyz@cluster0.zzaqtkt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    try {
        res.json({ requestData: { username, password } })
        const userDoc = await User.create({
            username, password: bcrypt.hashSync(password, salt),
        })
        res.json(userDoc)
    } catch (e) {
        res.status(400).json(e)
    }
})

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
        jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json("ok");
        })
    } else {
        res.status(400).json("Wrong Credentials");
    }
})


app.get("/profile", (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    })
    res.json(req.cookies)
})

app.post("/logout", (req, res) => {
    res.cookie("token", "").json("ok")
})
app.listen(4000)

// mongodb+srv://blog:abcdmnopxyz@cluster0.zzaqtkt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0