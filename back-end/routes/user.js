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
    req.session.Name = user.name;
    req.session.Username = user.username;
    req.session.Billingaddress = user.billingadresse;
    req.session.Homeaddress = user.homeadresse;
    req.session.Phonenumber = user.phone_number;
    req.session.Email = Email;
    req.session.Role = user.role;
    console.log(req.session.Role )
    
    console.log('Session after login:', req.session);


    
    res.send({ message: "Login successful", user: user.username  , user_id: req.session.id , username: req.session.Username, role: req.session.Role});

})


router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.clearCookie("connect.sid");
    res.send({message:"Logged out"});
    res.end();


})  

router.put('/update-profile', async (req, res) => {
  try {
    console.log('Received update request:', req.body); 
    const { name, email, phone_number } = req.body;

    if (!email) {
      return res.status(400).send({ message: 'Email is required.' });
    }
    const user_id = req.session.User_id
    const user = await User.findOneAndUpdate(
      { _id: user_id }, 
      { name, email, phone_number },
      { new: true } 
    );

    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }

    res.status(200).send({ message: 'Profile updated successfully.', user });
  } catch (error) {
    console.error('Error updating profile:', error.message);
    res.status(500).send({ message: 'Internal server error.' });
  }
});
router.put('/update-address', async (req, res) => {
  try {
    const { userId, homeadresse, billingadresse } = req.body;

    if (!userId || !homeadresse || !billingadresse) {
      return res.status(400).send({ message: 'All fields are required.' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { homeadresse, billingadresse }, 
      { new: true } 
    );

    if (!user) {
      return res.status(404).send({ message: 'User not found.' });
    }

    res.status(200).send({ message: 'Address updated successfully.', user });
  } catch (error) {
    console.error('Error updating address:', error.message);
    res.status(500).send({ message: 'Internal server error.' });
  }
});


router.get('/session-checker', (req, res) => {
    try {
        console.log(req.session.User_id)
      if (req.session.User_id) {
        res.status(200).send({
          message: "Session is active",
          user_id: req.session.User_id,
          email: req.session.Email,
          name: req.session.Name,
          username: req.session.Username,
          billingaddress: req.session.Billingaddress,
          homeaddress: req.session.Homeaddress,
          phonenumber: req.session.Phonenumber,
          role: req.session.Role

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


// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
});

// Add a new user
router.post('/', async (req, res) => {
  try {
      const { name, username, email, password, role, phone_number, homeadresse, billingadresse } = req.body;

      // Ensure all required fields are present
      if (!name || !username || !email || !password || !role || !phone_number) {
          return res.status(400).json({ message: 'All fields are required' });
      }

      // Check for existing user
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: 'User with this email already exists' });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      const newUser = new User({
          name,
          username,
          email,
          password: hashedPassword,
          role,
          phone_number,
          homeadresse,
          billingadresse,
      });

      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
  } catch (error) {
      console.error('Error in POST /api/users:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});


// Update an existing user
router.put('/:id', async (req, res) => {
    try {
        const { name, username, email, role, phone_number, homeadresse, billingadresse } = req.body;

        const updates = { name, username, email, role, phone_number, homeadresse, billingadresse };

        // Only hash password if it's being updated
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(req.body.password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});

  
module.exports = router;
