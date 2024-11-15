const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../models/user');

router.post('/register',async (req, res) => {
    const { Username, Email, Tel, Name, Password } = req.body;
    
    const user = new User({
        name: Name,
        email: Email,
        username: Username,
        phone_number: Tel,
        password: Password
    });
    console.log(user);
    await user.save();
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
// profile picture : 
router.post('/image', upload.single('profile'), async (req, res) => {
    console.log(req.session)
    const user = await User.findOne({ _id: req.session.User_id });
  
    if (req.file) {
        const resizedImageBuffer = await sharp(req.file.buffer)
        .resize(40, 40)
        .png({ quality: 100 })
        .toBuffer();
      user.image = resizedImageBuffer.toString('base64');
      await user.save();
      res.json({ message: 'Profile image uploaded successfully' , image: user.image});
    } else {
      res.status(400).json({ message: 'No file uploaded' });
    }
  });
router.get('/image',async(req,res)=>{
    const user_id = req.session.User_id;
    if(!user_id) return res.json("no session found to get the profile picture")
    const user = await User.findOne({ _id: user_id });
    res.json({ image: user.image });
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
