const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const saltRound = 10

//Register

router.post("/register", async (req, res) =>{
    const hashedPassword = await bcrypt.hash(req.body.password, saltRound)

    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword,
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
        const comparePass = await bcrypt.compare(req.body.password, user.password)

        const accessToken = jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin
        }, process.env.JWT_SEC, {expiresIn:"3d"})

        const {password, ...others} = user._doc;

        if(!user){
            res.status(401).json("User not Found")
        }else if(!comparePass){
            res.status(401).json("Wrong credentials!")
        }else{
            res.status(200).json({...others, accessToken});
        }

    }catch(err){
        res.status(500).json(err)
        console.log(err)
    }
})

module.exports = router;