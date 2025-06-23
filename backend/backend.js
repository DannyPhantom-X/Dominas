const express = require('express');
let products;
let members;
const mongoose = require('mongoose');
const { v4: uuidv4} = require('uuid');
const cors = require('cors');
const dominasUri = mongoose.createConnection('mongodb+srv://Phantom:Dann33_dominas@dominas.jtnjo8o.mongodb.net/Dominas')
const cartUri = mongoose.createConnection('mongodb+srv://Phantom:Dann33_dominas@dominas.jtnjo8o.mongodb.net/Cart')
const orderUri = mongoose.createConnection('mongodb+srv://Phantom:Dann33_dominas@dominas.jtnjo8o.mongodb.net/Order')
const app = express();
app.use(cors())
app.use(express.json())
const productsSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4()
    },
    pastryName: String,
    price: Number,
    image: String
})
const membersSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4()
    },
    firstName: String,
    lastName: String,
    email: String,
    password: String
})
const cartSchema = new mongoose.Schema({
    _id: String,
    pastryName: String,
    price: Number,
    image: String,
    __v: Number,
    quantity: Number
})
const orderSchema = new mongoose.Schema({
    _id: String,
    pastryName: String,
    price: Number,
    image: String,
    __v: Number,
    quantity: Number,
    day: String,
    month: String,
    date: String,
    year: String,
    time: String
})

const productsCollection = dominasUri.model('products', productsSchema);
const membersCollection =  dominasUri.model('members', membersSchema);

app.get('/products', async (req, res) => {
    products = await productsCollection.find({})
    res.json(products)
})

app.get('/search', async (req, res) => {
    let { value } = req.query
    value = value.toLowerCase()
    console.log(value)
    products = await productsCollection.find({})
    let searchProduct = products.filter((product) => {
        if (product.pastryName.toLowerCase().includes(value)){
            console.log(product.pastryName.toLowerCase)
            return product;
        }
    })
    res.json(searchProduct)
})

app.post('/login', async (req, res) => {
    console.log(req.body)
    let actualMember = await membersCollection.findOne({email: req.body.email, password: req.body.password})
    console.log(actualMember)
    res.json(actualMember)
})
app.post('/signup', async (req, res) => {
    await membersCollection.create(req.body)
})
app.post('/admin/upload', async (req, res) => {
    console.log(req.body)
})
app.get('/admin/pastrylist', async (req, res) => {
    console.log('admin pastry')
    let adminProducts = await productsCollection.find({})
    res.json(adminProducts)
})
app.get('/:id/cart', async (req, res) => {
    const { id } = req.params
    const cartCollection = cartUri.model(`${id}`, cartSchema)
    let cart = await cartCollection.find({})
    res.json(cart)
})
app.post('/:id/cart', async (req, res) => {
    const { id } = req.params
    const cartCollection = cartUri.model(`${id}`, cartSchema)
    const result = await cartCollection.create(req.body)
    res.json(result)
})
app.post('/:id/cart/quantity', async (req, res) => {
    const { id } = req.params
    const cartCollection = cartUri.model(`${id}`, cartSchema)
    const result = await cartCollection.findOneAndUpdate({_id: req.body._id}, {$set: {quantity: req.body.quantity} , new: true})
    res.json(result)
})
app.post('/:id/order', async(req, res) => {
    const { id } = req.params
    const orderCollection = await orderUri.model(`${id}`, orderSchema)
    const cartItem = await orderCollection.findOne({_id: req.body._id})
    if (!cartItem) {
        console.log('doesnt exist')
        await orderCollection.create(req.body)
    }else{
        console.log('brrrrrrrrr')
        await orderCollection.findOneAndUpdate({_id: req.body._id}, {quantity: req.body.quantity})
    }
})
app.delete('/:id/cart', async (req, res) => {
    const { id } = req.params
    console.log('about to delete ')
    const cartCollection = await cartUri.model(`${id}`, cartSchema)
    const result = await cartCollection.findOneAndDelete({_id: req.body._id})
    res.json(result)
})
app.get('/products/guysss', (req, res) => {
    res.text('helloo')
})
async function connect() { 
    await dominasUri
    console.log(`Connected to Phantom's MongoDB`)
    await cartUri
    console.log(`Connected to Phantom's Cart`)
    await orderUri
    console.log(`Connected to Phantom's Order`)
    await app.listen(5030)
    console.log('This server is listening on port 5030....')
} 

connect()