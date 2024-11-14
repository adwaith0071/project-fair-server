const users = require('../Modals/userModal')
const jwt = require('jsonwebtoken')



exports.userRegister = async (req, res) => {
    try {
        const { email, username, password } = req.body
        if (!email || !username || !password) {
            res.status(406).json("invalid Data")

        }
        else {
            const newUser = new users({ email, username, password, profile: "", github: "", linkedin: "" })
            await newUser.save()
            res.status(200).json(newUser)
        }


    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)



    }
}


exports.userLogin = async (req, res) => {
    try {

        const { email, password } = req.body
        const existing = await users.findOne({ email, password })
        if (existing) {
            const token = jwt.sign({ userId: existing._id }, process.env.SECRET_KEY)
            res.status(200).json({ token, username: existing.username, github: existing.github, linkedin: existing.linkedin, profile: existing.profile })
        }
        else {
            res.status(406).json("Invalid Email/Password")
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)



    }

}


exports.profileAdd = async (req, res) => {
    try {
        const userId = req.payload
        if (req.file) {
            var profile = req.file.filename
            var { username, github, linkedin } = req.body
        }
        else {
            var { profile, username, github, linkedin } = req.body
        }
        const result = await users.findByIdAndUpdate(userId, {
            username, github, linkedin, profile
        })
        res.status(200).json(result)
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)



    }


}
