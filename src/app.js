import express from 'express';
import ProductManager from './productManager.js';
const manager = new ProductManager ("./path/productos.js")
const app = express();
const PORT = 8080;

app.get("/products", async(req,res) => {
    const {limite} = req.query
    const products = await manager.getProduct()
    if (limite) {
        const limiteProductos = products.slice(0,limite)
        res.json({status:"Success", limiteProductos})
    }else{
        res.json({status:"Success", products})
    }
}) 

app.get("/products/:pid", async(req,res) => {
    const {pid} = req.params
    const productos = await manager.getProduct()
    const encontrarProductos = productos.find(element => element.id === parseInts(pid))
    console.log(encontrarProductos)
    res.send({status:"Success",encontrarProducts})

}) 

app.listen(PORT,() => {
    console.log("El servidor esta funcionando correctamente")
})