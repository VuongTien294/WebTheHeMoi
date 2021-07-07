const User = require('../model/user')
const jwt = require('jsonwebtoken')
var nodemailer = require('nodemailer');
// const { use } = require('../../../../NodeShop/routes/userRouter')


exports.create_user = (req, res) => {
    User.create({
        name: req.body.name,
        age: req.body.age,
        role: req.body.role,
        username: req.body.username,
        password: req.body.password,
        address: req.body.address,
        gender: req.body.gender,
        phone: req.body.phone,
        email: req.body.email
    }, (err, result) => {
        if (err) res.send(err)
        res.send(result)
    })
}

exports.update_user = async (req, res) => {
    const updateUser = {
        name: req.body.name,
        age: req.body.age,
        role: req.body.role,
        username: req.body.username,
        password: req.body.password,
        address: req.body.address,
        gender: req.body.gender,
        phone: req.body.phone,
        email: req.body.email
    };
    await User.findByIdAndUpdate(req.params.id, updateUser, (err, result) => {
        if (err) res.send(err)
        res.send("update succesful !")
    })
}

exports.delete_user = (req, res) => {
    User.findByIdAndDelete(req.params.id, (error, result) => {
        if (error) res.send(err)
        res.send("deleted succesful !")
    })
}

exports.get_all_user = (req, res) => {
    User.find({}, (err, result) => {
        if (err) res.send(err)
        res.send(result)
    })
}

exports.get_a_user = (req, res) => {
    console.log("id", req.params.id)
    User.findById(req.params.id, (err, result) => {
        if (err) res.send(err)
        res.send(result)
    })
}

exports.get_a_user_by_username = async (req, res) => {
    const username = req.body.username

    const user = await User.findOne({ username })
    if (user != null) {
        res.send(user)
    }
    res.send("Ko co user")
}


exports.login = async (req, res) => {
    try {
        // const {username, password} = req.body;
        console.log(req.body)
        const username = req.body.username
        const password = req.body.password
        const user = await User.findOne({ username })

        if (!user) return res.status(400).json({ msg: "User does not exist." })

        if (password != user.password) return res.status(400).json({ msg: "incorect password" })

        // If login success , create access token and refresh token
        const accessToken = createAccessToken({ id: user._id })
        const refreshToken = createRefreshToken({ id: user._id })

        res.cookie('refreshtoken', refreshToken, {
            httpOnly: true,
            path: '/user/refresh_token',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
        })

        res.json({ accessToken })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

exports.refreshToken = (req, res) => {
    try {
        const rf_token = req.cookies.refreshtoken;
        if (!rf_token) return res.status(400).json({ msg: "Please Login or Register" })

        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(400).json({ msg: "Please Login or Register" })

            const accessToken = createAccessToken({ id: user.id })

            res.json({ accessToken })
        })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }

}

exports.logout = async (req, res) => {
    try {
        res.clearCookie('refreshtoken', { path: '/user/refresh_token' })
        return res.json({ msg: "Logged out" })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

exports.sendEmail = async (req, res) => {
    const billId=req.body.billId
    const email = req.body.email

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'vuongtien2942000@gmail.com',
            pass: 'vuongtien294'
        }
    });

    var mailOptions = {
        from: 'vuongtien2942000@gmail.com',
        to: email,
        subject: 'Cam on ban da mua hang cua Shop!',
        text: 'Bill Id(Order Id) cua ban do la :'+billId
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}





const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' })
}

const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}
