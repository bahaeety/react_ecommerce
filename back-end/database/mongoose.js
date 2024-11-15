const mongoose = require ('mongoose');
const connection = mongoose.connect('mongodb://localhost:27017/react_ecommerce').then(()=>{
    console.log('Connected to MongoDB')
} ).catch((e)=>{
    console.log('Error connecting to MongoDB', e)
})
module.exports = connection;