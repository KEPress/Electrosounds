const bcrypt = require('bcryptjs')

const data = {

  products: [
        {
            title: 'Nike Shirt',
            slug: 'nike-shirt',
            category: ['Shirts'],
            image: `/images/p1.jpg`,
            price: 120,
            stock: 10,
            brand: 'Nike',
            rating: 4.5,
            reviews: 10,
            details: 'Brand Name Shirt'
        },

        {
            title: 'Puma Shoes',
            slug: 'puma-shoes',
            category: ['Shoes'],
            image: `/images/p2.jpg`,
            price: 200,
            stock: 15,
            brand: 'Puma',
            rating: 5.5,
            reviews: 5,
            details: 'Brand Name Shoes'
        },

        {
            title: 'Champion Slim Pants',
            slug: 'champion-slim-pants',
            category: ['Pants'],
            image: `/images/p3.jpg`,
            price: 250,
            stock: 0,
            brand: 'Champion',
            rating: 5.5,
            reviews: 12,
            details: `Men's Sweat Pants`
        },

        {
            title: 'Adidas Fit Pants',
            slug: 'adidas-fit-pants',
            category: ['Pants'],
            image: `/images/p4.jpg`,
            price: 65,
            stock: 5,
            brand: 'Puma',
            rating: 4.5,
            reviews: 10,
            details: 'high quality product'
        }
    ],

    users: [
        {
            name: 'Paul',
            surname: 'Estrada',
            email: 'kepressltd@admin.com',
            password: bcrypt.hashSync('Tester'),
            profile: `/images/hey.png`,
            isAdmin: true
        },

        {
            name: 'Jonn',
            surname: 'Doe',
            email: 'jdoe@gmail.com',
            password: bcrypt.hashSync('Tester123'),
            isAdmin: false
        }
    ]
}

//use this to export data 
module.exports = data