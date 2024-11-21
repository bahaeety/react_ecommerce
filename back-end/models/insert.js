const mongoose = require('../database/mongoose'); // Adjust the path as needed
const Product = require('./produit'); // Adjust the path as needed

const seedProducts = async () => {
    try {
        const products = [
            {
                name: 'Heavy Duty Paper Shopping Bags - Case',
                category: 'Eco-Friendly',
                image: 'https://cdn11.bigcommerce.com/s-66baa/images/stencil/500x659/products/2159/8211/DURO_87124__33809.1680667231.jpg?c=2',
                price: 127.99,
            },
            {
                name: 'Poly Bag',
                category: 'Eco-Friendly',
                image: 'https://cdn11.bigcommerce.com/s-66baa/images/stencil/500x659/products/2251/8452/3lb_Poly_Bag__03366.1717386742.jpg?c=2',
                price: 23.99,
            },
            {
                name: 'Heavy Duty Paper Shopping Bags - Case',
                category: 'Eco-Friendly',
                image: 'https://cdn11.bigcommerce.com/s-66baa/images/stencil/500x659/products/1821/7228/basket_liners__43716.1490998588.jpg?c=2',
                price: 77.00,
            },
            {
                name: 'Heavy Duty Paper Shopping Bags - Case',
                category: 'Eco-Friendly',
                image: 'https://cdn11.bigcommerce.com/s-66baa/images/stencil/500x659/products/2264/8478/Foil_Wrap__41687.1719278965.jpg?c=2',
                price: 73.00,
            },
            {
                name: '1lb Poly Bag',
                category: 'Eco-Friendly',
                image: 'https://cdn11.bigcommerce.com/s-66baa/images/stencil/500x659/products/2235/8422/1lb_Poly_Bag__12219.1716924178.jpg?c=2',
                price: 65.75,
            },
            {
                name: '2lb Poly Bag',
                category: 'Eco-Friendly',
                image: 'https://cdn11.bigcommerce.com/s-66baa/images/stencil/500x659/products/2236/8423/2lb_Poly_Bag__34636.1716924537.jpg?c=2',
                price: 66.75,
            }
            
        ];

        await Product.insertMany(products);
        console.log('Products inserted successfully!');
        process.exit();
    } catch (error) {
        console.error('Error inserting products:', error);
        process.exit(1); 
    }
};

seedProducts();
