const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../models/user');

router.post('/register', async (req, res) => {
    const { Username, Email, Tel, Name, Password, HomeAddress, BillingAddress } = req.body;
    const user = new User({
        name: Name,
        email: Email,
        username: Username,
        phone_number: Tel,
        password: Password,
        homeadresse: HomeAddress,
        billingadresse: BillingAddress
    });

    try {
                await user.save();
        console.log('User registered:', user);
        res.status(201).send({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send({ message: 'Error registering user', error });
    }
});


router.post('/login',async(req,res)=>{
    const {Email,Password} = req.body;
    const user = await User.findOne({email:Email});
    if(!user){
        return res.status(400).send({message:"User not found"});
    }
    const isMatch = await bcrypt.compare(Password,user.password);
    if(!isMatch){
        return res.status(400).send({message:"Invalid password"});
    }

    req.session.User_id = user._id
    req.session.Username = user.username

    
    res.send({ message: "Login successful", user: user.username  , user1: req.session.id , user2: req.session.Username});

})


router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.clearCookie("connect.sid");
    res.end();
    res.send({message:"Logged out"});

})  

router.get('/session-checker',(req,res)=>{
    if(req.session.User_id){
        res.send({message:"Session is active",user_id:req.session.User_id , username: req.session.Username})
        }
        else{
            res.send({message:"Session is not active",user_id:null} )
    }
})

module.exports = router;
