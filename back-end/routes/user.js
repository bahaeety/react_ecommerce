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

 
    req.session.User_id = user._id;
    req.session.Username = user.username;
    req.session.Billingaddress = user.billingadresse;
    req.session.Homeaddress = user.homeadresse;
    req.session.Phonenumber = user.phone_number;
    req.session.Email = Email;
    
    console.log('Session after login:', req.session);


    
    res.send({ message: "Login successful", user: user.username  , user_id: req.session.id , username: req.session.Username});

})


router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.clearCookie("connect.sid");
    res.send({message:"Logged out"});
    res.end();


})  
router.get('/session-checker', (req, res) => {
    try {
        console.log(req.session.User_id)
      if (req.session.User_id) {
        res.status(200).send({
          message: "Session is active",
          user_id: req.session.User_id,
          email: req.session.Email,
          username: req.session.Username,
          billingaddress: req.session.Billingaddress,
          homeaddress: req.session.Homeaddress,
          phonenumber: req.session.Phonenumber

        });
      } else {
        res.status(401).send({
          message: "Session is not active",
          user_id: null,
          username: null,
        });
      }
    } catch (err) {
      console.error("Error in session checker:", err.message);
      res.status(500).send({
        message: "Internal server error",
      });
    }
  });
  
module.exports = router;
