import express from 'express';
import ProductManager from './productManager.js';
const manager = new ProductManager ("./path/productos.js")
const app = express();
const PORT = 8080;

app.get("/products", async(req,res) => {
    const {limit} = req.query
    const products = await manager.getProduct()
    if (limit) {
        const limitProducts = products.slice(0,limit)
        res.json({status:"Success", limitProducts})
    }else{
        res.json({status:"Success", products})
    }
}) 

app.get("/products/:pid", async(req,res) => {
    const {pid} = req.params
    const products = await manager.getProduct()
    const findProducts = products.find(element => element.id === parseInts(pid))
    console.log(findProducts)
    res.send({status:"Success",findProducts})

}) 

app.listen(PORT,() => {
    console.log("El servidor esta funcionando correctamente")
})