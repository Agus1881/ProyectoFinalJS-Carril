const productosjson = "./productos.json"
let productos = []

// obtener informacion de los productos

fetch(productosjson)
    .then(response => response.json())
    .then(data => {
        productos = data
        render(productos)
        renderCarrito()
    })
    .catch(error => {
        console.error("Error", error)
    })


let carrito = []

let carritoJSON = JSON.parse(localStorage.getItem("carrito"))

if (carritoJSON) {
    carrito = carritoJSON
}

// Crear Cards

function render(Array) {

    let contenedor = document.getElementById("cartaProducto")
    contenedor.innerHTML = ""
    Array.forEach(producto => {
        let carta = document.createElement("div")
        carta.className = "carta"
        carta.innerHTML = `
    <h3>${producto.nombre}<h3>
    <img src=./img/${producto.imagen}>
    <p>$${producto.precio}<p>
    <div><button class="boton" id=${producto.id}>Comprar<div>

    `
        contenedor.appendChild(carta)
        let botonCarrito = document.getElementById(producto.id)
        botonCarrito.addEventListener("click", añadirCarrito)
    })
}

// Filtrar Productos

let botonfiltro = document.getElementsByClassName("filtro")
for (const botones of botonfiltro) {
    botones.addEventListener("click", filtrar)
}

function filtrar(event) {
    let filtrado = productos.filter(producto => producto.categoria === event.target.value)
    render(filtrado)
}

let restablecer = document.getElementById("restablecer")
restablecer.addEventListener("click", restablecerFiltrado)

function restablecerFiltrado() {
    render(productos)
}

// Agregar productos y renderizar carrito

function añadirCarrito(event) {
    let productoCarrito = productos.find(producto => producto.id === Number(event.target.id))
    let productoExistente = carrito.find(item => item.id === productoCarrito.id)

    if (productoExistente) {
        productoExistente.cantidad += 1
    }
    else {
        carrito.push({
            id: productoCarrito.id,
            nombre: productoCarrito.nombre,
            precio: productoCarrito.precio,
            cantidad: 1
        })
    }


    renderCarrito()
    localStorage.setItem("carrito", JSON.stringify(carrito))
    Toastify({
        text: "Añadido al carrito!",
        className: "notificacion",
        duration: 2000,
        close: true,
        gravity: "bottom"
        }).showToast();
}

function renderCarrito() {
    let carritoFinal = document.getElementById("carritoVisible")
    carritoFinal.innerHTML = ""
    carrito.forEach(producto => {

        carritoFinal.innerHTML += `<p class="productoEnCarrito">${producto.nombre} $${producto.precio} Cantidad: ${producto.cantidad}`
    })
}


let botonMostrarCarrito = document.getElementById("idBotonCarrito")
botonMostrarCarrito.addEventListener("click", mostrarCarrito)

function mostrarCarrito() {
    let contenedorPadre = document.getElementById("contenedorPadre")
    let carritoVisible = document.getElementById("carritoVisible")
    contenedorPadre.classList.toggle("alternarCarrito")
    carritoVisible.classList.toggle("alternarCarrito")
}

let finalizar = document.getElementById("finalizar")
finalizar.addEventListener("click", finalizarCompra)

// Finalizar la compra

function finalizarCompra() {
    localStorage.clear()
    carrito = []
    renderCarrito()

    Swal.fire({
        icon: 'success',
        title: 'Listo!',
        text: 'Compra Realizada!',
        confirmButtonText: 'Continuar',
      })
}





