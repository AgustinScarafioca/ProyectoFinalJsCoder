if (document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}




// Funciones principales de carrito
function ready() {
    let removerCarrito = document.getElementsByClassName("botonRemover")
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

Insercion de objetos en el html. Surgio un error aqui, intente descubrir en primera instancia que sucedia y 
lo que sucedia era que el html insertado no reconocia los addEventListeners. Intente encontrar una solucion,
una posibilidad era utilizar insertAdjacentHTML. Sin embargo esto no funciono, 
dejo el codigo comentado para saber si se puede utilizar alguna solucion.



const divProductos = document.getElementById("divProductos")

fetch("./json/productos.json")
.then(promise => promise.json())
.then(data => {
    data.forEach(producto => {
        divProductos.insertAdjacentHTML("afterbegin", `
        <div class="itemProducto container card col-md-6 p-3">
            <span class="itemProducto-title">${producto.name}</span>
            <div class="itemProducto-details">
                <span class="itemProducto-price">$${producto.price}</span>
                <button class="btn btn-primary agregarItem__boton" type="button">Añadir al carrito</button>
            </div>
        </div>
        `)
    })
})
*/

//Carrito y productos

function compraClick(){
    Swal.fire("Gracias por su compra")
    let cartItems= document.getElementsByClassName("cart-items")[0]
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    actualizarCarrito()
}

function removerItemCarrito (e){
    let botonClick = e.target
    botonClick.parentElement.parentElement.remove()
    Toastify({
        text: "Producto eliminado",
        duration: 3000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
        background: "linear-gradient(to right, #34A0EA, #1261C0)",
        },
        onClick: function(){} // Callback after click
    }).showToast();
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
            Swal.fire("Este item ya se encuentra en el carrito")
            return
        }
    }
    let cartRowContenido = `
        <div class="cart-item cart-column">
            <span class="cart-item-title d-flex justify-content-start p-2">${title}</span>
        </div>
        <span class="precioCarrito cart-column d-flex justify-content-center p-2">${price}</span>
        <div class="cart-quantity cart-column d-flex justify-content-end p-2">
            <input class="cantidadCarrito__input" type="number" value="1">
            <button id="removerCarrito" class="btn btn-danger botonRemover" type="button">Quitar</button>
        </div>
        `
    cartRow.innerHTML = cartRowContenido
    cartItems.append(cartRow)
    cartRow.getElementsByClassName("botonRemover")[0].addEventListener("click", removerItemCarrito)
    cartRow.getElementsByClassName("cantidadCarrito__input")[0].addEventListener("change", cambioCantidad)
}

//Actualizador 
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


// Login

