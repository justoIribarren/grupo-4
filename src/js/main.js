import { Productos } from "./productos.js";

const productos = document.getElementById("product-table");
const carritoProductos = document.getElementById("carritoProductos");
const vaciarCarrito = document.getElementById("vaciarCarrito");
const total = document.getElementById("total");
const verCarrito = document.getElementById("verCarrito");

let arrayProductos = [...Object.entries(Productos)];
let carrito = [];

if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

const crearCarta = () => {
    productos.innerHTML = "";
    arrayProductos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("item");
        div.innerHTML = `
                        <figure>
                            <img src = ${producto[1].url}>
                        </figure>
                        <div class="infoProducto">
                            <p >${producto[1].nombre}</p>
                            <p class="precio">$${producto[1].precio}</p>
                            
                            <button class = "btn btn-primary" id = "boton${producto[1].id}">Agregar al Carrito</button>
                        </div>    
                     `
        productos.appendChild(div);

        const boton = document.getElementById(`boton${producto[1].id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto[1].id);
        })
    })
}

crearCarta()

filtro.addEventListener("change", () => {
    filtrar();
})

const filtrar = () => {
    const filtro = document.getElementById("filtro").value;
    if(filtro == "Precio: Menor a Mayor") arrayProductos.sort((a, b) => a[1].precio - b[1].precio)
    else if(filtro == "Precio: Mayor a Menor") arrayProductos.sort((a, b) => b[1].precio - a[1].precio)
    else arrayProductos = [...Object.entries(Productos)];

    crearCarta()
}


const agregarAlCarrito = (id) => {
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if(productoEnCarrito){
        productoEnCarrito.cantidad++;
        mostrarCarrito();
    }else{
        const producto = arrayProductos.find(producto => producto[1].id === id);
        carrito.push(producto[1]);
    }
    
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const eliminarProducto = (id) => {
    const productoEliminado = carrito.find(producto => producto.id === id);
    if(productoEliminado.cantidad > 1){
        productoEliminado.cantidad--;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
    }else{
        const indice = carrito.indexOf(productoEliminado);
        carrito.splice(indice, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
    }
}

const sumarProducto = (id) => {
    const productoSumado = carrito.find(producto => producto.id === id);
    productoSumado.cantidad++;
    mostrarCarrito();
}

vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})

const eliminarTodoElCarrito = () => {
    carrito = [];
    carritoProductos.innerHTML = "";
    total.innerHTML = 0;
    arrayProductos.forEach(producto => {
        producto[1].cantidad = 1;
    })
    localStorage.clear();
}

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})


const mostrarCarrito = () => {
    carritoProductos.innerHTML = "";
    carrito.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("cart-item");
        card.innerHTML = `
                        <figure>
                            <img src = "${producto.url}" class = "card-img-top imgProductos" alt = "${producto.nombre}">
                        </figure>

                        <div>
                            <p>${producto.nombre}</p>
                            <p>$${producto.precio}</p>
                            <div class = "cantidad">
                                <button class = "btn btn-success" id = "sumar${producto.id}">+</button>
                                <p>${producto.cantidad}</p>
                                <button class = "btn btn-danger" id = "eliminar${producto.id}">-</button>
                            </div>
                        </div>
                        `
        carritoProductos.appendChild(card);

        const botonEliminar = document.getElementById(`eliminar${producto.id}`);
        botonEliminar.addEventListener("click", () => {
            eliminarProducto(producto.id);
        })

        const botonSumar = document.getElementById(`sumar${producto.id}`);
        botonSumar.addEventListener("click", () => {
            sumarProducto(producto.id);
        })
    })
    calcularTotal();
}

const calcularTotal = () => {
    let precioTotal = 0;
    carrito.forEach(producto => {
        precioTotal += (producto.precio * producto.cantidad);
    });

    total.innerHTML = precioTotal;
}
 