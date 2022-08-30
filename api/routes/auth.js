const router = require("express").Router();
const User = require("../models/User")
const cryptojs = require("crypto-js")
const jwt = require("jsonwebtoken")

//Register

router.post("/register", async (req, res) =>{
    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:cryptojs.AES.encrypt(CryptoJS.enc.Utf8.parse(req.body.password), process.env.PASS_SEC),
    })

    try{

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }catch(err){
        res.status(500).json(err)
    }
})

//LOGIN
router.post("/login", async (req,res)=>{
    try{

        const user = await User.findOne({username:req.body.username});
        !user && res.status(401).json("Wrong credentials!")

        const hashedPass = cryptojs.AES.decrypt(user.password, process.env.PASS_SEC)

        const originalPassword = hashedPass.toString(cryptojs.enc.Utf8)
        originalPassword !== req.body.password && res.status(401).json("Wrong credentials!")

        const accessToken = jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin
        }, process.env.JWT_SEC, {expiresIn:"3d"})

        const {password, ...others} = user._doc;

        res.status(200).json({...others, accessToken});

    }catch(err){
        res.status(500).json(err)
        console.log(err)
    }
})

module.exports = router;