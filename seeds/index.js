const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground');

const db = mongoose.connection;

mongoose.connect('mongodb://localhost:27017/yelp-camp').then(result =>{
    console.log('mongoose Connected!');
}).catch(err => console.log(err));


const sample = array => array[Math.floor(Math.random()* array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    

    for(let i = 0; i<500; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20)+ 10;
        const camp =  new Campground({
          author: '61a538dd88eb0742978d70fb',
          location: `${cities[random1000].city}, ${cities[random1000].state}`,
          title: `${sample(descriptors)} ${sample(places)}`,
          description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus magnam alias at aut quam voluptas rem dolorum voluptates tenetur, iure dolores doloribus. Cumque nihil voluptas iste incidunt iure facere aperiam.',
          price,
          geometry: {
            type: "Point",
            coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude,
            ]
        },
          images: [
            {
                url: 'https://res.cloudinary.com/dwiut99dm/image/upload/v1638396143/YelpCamp/ethan-unzicker-wwXmpJWVHf0-unsplash_tuepur.jpg',
                filename: 'YelpCamp/ethan-unzicker-wwXmpJWVHf0-unsplash_tuepur'
            },
            {
                url: 'https://res.cloudinary.com/dwiut99dm/image/upload/v1638396154/YelpCamp/christopher-paul-high-TWICuN3QRAQ-unsplash_pe71ld.jpg',
                filename: 'YelpCamp/christopher-paul-high-TWICuN3QRAQ-unsplash_pe71ld'
            }
        ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})