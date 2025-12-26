const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { Userauthentication } = require("../Middleware/auth");
const { UserModel } = require("../db");

require("dotenv").config();
const JWT_KEY = process.env.JWT_KEY;

userRouter.post("/signup", async (req, res) => {
    //input validation
    const zodSchema = z.object({
        username: z.string().max(20),
        email: z.string().max(20).email(),
        password: z.string().regex(/[a-z]/, "Password must contain one lowercase character")
            .regex(/[A-Z]/, "Password must contain one uppercase character")
            .regex(/[^A-Z0-9a-z]/, "Password must contain one special character")
    })

    const parsedObj = zodSchema.safeParse(req.body);
    if (!parsedObj.success) {
        res.json({
            errordetails: parsedObj.error
        })
        return;
    }

    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await UserModel.create({
            username: username,
            email: email,
            password: hashedPassword
        })
        res.json({
            message: "You have signed up successfully."
        })
    } catch (err) {
        res.json({
            message: "A user with this email already exists."
        })
    }
})

userRouter.post("/signin", async (req, res) => {
    const { username, email, password } = req.body;
    const userFound = await UserModel.findOne({
        email: email,
        username: username
    })

    if (!userFound) {
        res.json({
            message: "Wrong credentials"
        })
        return;
    }

    const hashedPassword = bcrypt.compare(password, userFound.password);
    if (!hashedPassword) {
        res.json({
            message: "Wrong password"
        })
        return
    }

    const token = jwt.sign({
        "userId": userFound._id
    }, JWT_KEY);

    res.json({
        token: token,
        okmessage: "Ok you are logged in."
    })
})

userRouter.get("/check-auth", Userauthentication, (req, res) => {
    res.json({ status: "ok" });
});

userRouter.get("/signout", Userauthentication, (req, res) => {
    res.json({
        message: "Ok you are logged out."
    })
})

userRouter.get("/profile", Userauthentication, async (req, res) => {
    const userId = req.user.userId;
    const profileInfo = await UserModel.findById(userId).select('-password');
    res.status(200).json({
        profile_info: profileInfo
    })
})

userRouter.delete("/account", Userauthentication, async (req, res) => {
    const userId = req.user.userId;
    await UserModel.deleteOne({ _id: userId });
    res.json({
        message: "Your account is deleted."
    })
})

module.exports = { userRouter }
