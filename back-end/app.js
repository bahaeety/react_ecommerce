const express = require('express');
const session = require('express-session');
const user = require('./routes/user')
const produit = require('./routes/produits')
const panier = require('./routes/panier');

const cors = require('cors');
const connection = require('./database/mongoose')

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
    }
}));


app.use('/user', user); 
app.use('/produits', produit);
app.use('/panier', panier);



module.exports = app;                        
