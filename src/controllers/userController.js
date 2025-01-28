const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "CARAPI"

const signup = async (req, res) => {

    const { username, email, password } = req.body;
    try {
        const exixtingUser = await userModel.findOne({ email: email })

        if (exixtingUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await userModel.create({
            email: email,
            password: hashedPassword,
            username: username
        })

        const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY)

        res.status(201).json({ user: result, token: token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

const signin = async (req, res) => {

    const { email, password } = req.body;
    try {
        const exixtingUser = await userModel.findOne({ email: email })

        if (!exixtingUser) {
            return res.status(404).json({ message: "User not found" })
        }

        const matchPassword = await bcrypt.compare(password, exixtingUser.password)

        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const token = jwt.sign({ email: exixtingUser.email, id: exixtingUser._id }, SECRET_KEY)

        res.status(200).json({ user: exixtingUser, token: token })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
}

module.exports = { signup, signin }