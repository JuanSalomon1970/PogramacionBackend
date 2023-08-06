import fs from "fs"

export default class ProductManager {
    constructor(path) {
        this.path = path,

            this.products = [

            ]
    }

    getProduct = async () => {
        const listaProductos = await fs.promises.readFile(this.path, "utf-8")
        const analisisProductos = JSON.parse(listaProductos)
        return analisisProductos
    }

    generateId = async () => {
        const contador = this.products.length
        if (contador === 0) {
            return 1
        } else {
            return (this.products[contador - 1].id) + 1
        }
    }


    addProduct = async (title, description, price, image, code, stock) => {
        if (!title || !description || !price || !image || !code || !stock) {
            console.error("Complete todos los datos del producto")
            return
        } else {
            const codigoRepetido = this.products.find(element => element.code === code)
            if (!codigoRepetido) {
                console.error("El codigo del producto ingresado es repetido")
                return
            } else {
                const generadorIds = await this.generateId()
                const productoNuevo = {
                    id: generadorIds, title, description, price, image, code, stock
                }
                this.products.push(productoNuevo)
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
            }
        }
    }

    updateProduct = async (id, title, description, price, image, code, stock) => {
        if (!id || !title || !description || !price || !image || !code || !stock) {
            console.error("Ingrese todos los datos del producto para su actualizacion")
            return
        } else {
            const todosLosProductos = await this.getProduct()
            const coderepet = todosLosProductos.find(element => element.code === code)
            if (coderepet) {
                console.error("El codigo del producto es repetido")
                return
            } else {
                const listaActualProductos = await this.getProduct()
                const nuevaListaProductos = listaActualProductos.map(element => {
                    if (element.id === id) {
                        const actualizarProductos = {
                            ...element, title, description, price, image, code, stock
                        }
                        return actualizarProductos
                    } else {
                        return element
                    }
                })
                await fs.promises.writeFile(this.path, JSON.stringify(nuevaListaProductos, null, 2))
            }
        }

    }
    delateProduct = async (id) => {
        const todosLosProductos = await this.getProduct()
        const productoNoEncontrado = todosLosProductos.filter (element => element.id === id)
        await fs.promises.writeFile(this.path, JSON.stringify(productoNoEncontrado, null, 2))
    }

    getProductById = async(id) => {
        const todosLosProductos = await this.getProduct()
        const encontrado = todosLosProductos.find(element => element.id === id)
        return encontrado
    }

}


async function generator() {
    const productManager = new ProductManager("./path/productos.json");


    //const listado = await productManager.getProduct()

    const soloProducto = await productManager.getProductById(4)



    console.log(soloProducto)
}

generator()