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
    let agregarCarritoBoton = document.getElementsByClassName("agregarItem__boton")
    for (let i = 0; i < agregarCarritoBoton.length; i++){
        let boton = agregarCarritoBoton [i]
        boton.addEventListener("click", agregarCarritoClick)
    }
    document.getElementsByClassName("botonCompra")[0].addEventListener("click", compraClick)
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

function compraClick(){
    alert("Gracias por su compra")
    let cartItems= document.getElementsByClassName("cart-items")[0]
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    actualizarCarrito()
}

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

function agregarCarritoClick(e) {
    let boton = e.target
    let itemProducto = boton.parentElement.parentElement
    let title = itemProducto.getElementsByClassName("itemProducto-title")[0].innerText
    let price = itemProducto.getElementsByClassName("itemProducto-price")[0].innerText
    // let img = itemProducto.getEelemtsByClassName("itemProducto-img")[0].src

    agregarAlCarrito(title, price)
    actualizarCarrito()
}

function agregarAlCarrito(title, price){
    let cartRow = document.createElement("div")
    cartRow.classList.add("cart-row")
    let cartItems = document.getElementsByClassName("cart-items")[0]
    let cartItemsNames = cartItems.getElementsByClassName("cart-item-title")
    for (let i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title){
            alert("Este item ya esta en el carrito")
            return
        }
    }
    let cartRowContenido = `
        <div class="cart-item cart-column">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="precioCarrito cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cantidadCarrito__input" type="number" value="1">
            <button id="removerCarrito" class="btn btn-danger botonRemover" type="button">Quitar</button>
        </div>
        `
    cartRow.innerHTML = cartRowContenido
    cartItems.append(cartRow)
    cartRow.getElementsByClassName("botonRemover")[0].addEventListener("click", removerItemCarrito)
    cartRow.getElementsByClassName("cantidadCarrito__input")[0].addEventListener("change", cambioCantidad)
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