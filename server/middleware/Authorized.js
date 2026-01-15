const moment = require("moment")
const jwt = require("jsonwebtoken")
const accessTokenSchema = require("../models/AccessTokens")
const AuthService = require("../services/AuthService")

const authorized = async (req, res, next) => {

    const { accessCookie } = req.cookies;
    const token = accessCookie ? accessCookie.split('Bearer ')[1] : null

    if (!token) {
        return res && res.json ? res.json({ auth: false, message: "No token provided.", status: "error" }) : next(new Error("No token provided."))
    }
    const tokenRecord = await accessTokenSchema.findOne({ token: token })
    if (!tokenRecord) {
        return res && res.json ? res.json({ auth: false, message: "No valid token record.", status: "error" }) : next(new Error("No valid token record."))
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            console.log(err)
            return res && res.json ? res.json({ auth: false, message: "Invalid token.", status: "error" }) : next(err)
        }
        let todayDate = moment()
        if (moment(tokenRecord.expireDate).diff(todayDate, "hours") < 10) {
            const newToken = await AuthService.createToken({ userId: tokenRecord.userId, username: tokenRecord.username })
            res.cookie('accessCookie', `Bearer ${newToken}`, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 1 }) // 1d
            console.log("refreshed token")
        }
        req.userId = decoded.userId
        req.username = decoded.username
        next()
    })
}

module.exports = authorized