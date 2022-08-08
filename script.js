if (document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}

function ready() {
    let removerCarrito = document.getElementsByClassName("botonRemover")
    console.log(removerCarrito)
    for (let i = 0; i < removerCarrito.length; i++) {
        let boton = removerCarrito[i]
        boton.addEventListener("click", removerItemCarrito)
    }
    let cantidadInput= document.getElementsByClassName("cantidadCarrito__input")
    for (let i = 0; i < cantidadInput.length; i++) {
        let input = cantidadInput [i]
        input.addEventListener("change", cambioCantidad)
    }  
}

/* 
//Objetos productos
class Producto{
    constructor (name, id, precio, stock,){
    this.name =  name;
    this.id = id;
    this.precio = precio
    this.stock = stock;
    }
}

const producto1= new Producto ("Sauron", 1, 1500, 5)
const producto2= new Producto ("Frodo Bolson", 2, 2000, 5)
const producto3= new Producto ("Smaug", 3, 1800, 3)
const producto4= new Producto ("Stormtrooper", 4, 800, 25)
const producto5= new Producto ("Darth Vader", 5, 1200, 10)
const producto6= new Producto ("Han Solo", 6, 1400, 15 )

const productos = [producto1, producto2, producto3, producto4, producto5, producto6]

console.log(productos) */

//Carrito y productos


function removerItemCarrito (e){
    let botonClick = e.target
    botonClick.parentElement.parentElement.remove()
    actualizarCarrito()
}

function cambioCantidad(e) {
    let input = e.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    actualizarCarrito()
}

function actualizarCarrito(){
    let contenedorCarrito = document.getElementsByClassName("cart-items")[0]
    let cartRows = contenedorCarrito.getElementsByClassName("cart-row")
    let total = 0
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows [i]
        let precioElemento = cartRow.getElementsByClassName("precioCarrito")[0]
        let cantidadElemento = cartRow.getElementsByClassName("cantidadCarrito__input")[0]
        let precio = parseFloat(precioElemento.innerText.replace("$", ""))
        let cantidad = cantidadElemento.value 
        total = total + (precio * cantidad)
    }
    total = Math.round(total *100)/ 100
    document.getElementsByClassName("precioTotalCarrito")[0].innerText = "$" + total
}