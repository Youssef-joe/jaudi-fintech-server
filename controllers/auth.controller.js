const User = require("./../models/User.js");
const jwt = require("jsonwebtoken");

let login = async (req,res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(401).json({message: "invalid email or password"});
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({message : "Invalid email or password"})
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
                region: user.region
            },
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        );
        res.json({token, user: {username: user.username,email: user.email, role: user.role, region: user.region}})

    } catch(err) {

        res.status(500).json({message : 'server error', error: err.message ? err.message : err})
        console.error("internal server error: ", err.message ? err.message : err);

    }
}

module.exports = {
    login
}