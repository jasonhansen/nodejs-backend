const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://jackhansen29:YAKoqT7IbG0ExxyV@cluster0.fp0ldns.mongodb.net/products_test?retryWrites=true&w=majority&appName=Cluster0'

const createProduct = async(req, res, next) => {
    const newProduct = {
        name: req.body.name,
        price: req.body.price
    }
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db();
        const result = await db.collection('products').insertOne(newProduct);
    } catch(err) {
        return res.json({message: 'Could not store data'});
    } 
    
    client.close()
    res.json(newProduct)
}

const getProducts = async(req, res, next) => {
    const client = new MongoClient(url);

    let products;
    try {
        await client.connect();
        const db = client.db();
        products = await db.collection('products').find().toArray();
    } catch(err) {
        return res.json({message: 'Could not retrieve products.'})
    }
    client.close();
    res.json(products)
}

exports.createProduct = createProduct;
exports.getProducts = getProducts;