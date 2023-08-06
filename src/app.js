import express from 'express';
import ProductManager from './productManager.js';
const manager = new ProductManager ("./path/productos.json")

const app = express();   
const PORT = 8080;

app.get("/productos", async(req,res) => {
    const {limite} = req.query
    const products = await manager.getProduct()
    if (limite) {
        const limiteProductos = products.slice(0,limite)
        res.json({status:"Success", limiteProductos})
    }else{
        res.json({status:"Success", products})
    } 
}) 

app.get("/productos/:pid", async(req,res) => {
    const {pid} = req.params
    const productos = await manager.getProduct()
    const encontrarProductos = productos.find(element => element.id === parseInt(pid))
    console.log(encontrarProductos)
    res.send({status:"Success", encontrarProductos})

}) 

app.listen(PORT,() => {
    console.log("El servidor esta funcionando correctamente")
})