document.addEventListener("DOMContentLoaded", () => {
    const carrito = [];
    const listaCarrito = document.getElementById("lista-carrito");
    const totalElemento = document.getElementById("total");
    const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

    // Función para actualizar el carrito en la interfaz
    function actualizarCarrito() {
        listaCarrito.innerHTML = "";
        let total = 0;

        carrito.forEach((producto, index) => {
            const li = document.createElement("li");
            li.textContent = `${producto.nombre} - $${producto.precio.toLocaleString()}`;
            
            // Botón para eliminar un producto del carrito
            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "X";
            btnEliminar.style.marginLeft = "10px";
            btnEliminar.style.cursor = "pointer";
            btnEliminar.style.background = "red";
            btnEliminar.style.color = "red";
            btnEliminar.style.border = "none";
            btnEliminar.style.padding = "3px 7px";
            btnEliminar.style.borderRadius = "3px";
            btnEliminar.addEventListener("click", () => {
                carrito.splice(index, 1);
                actualizarCarrito();
            });

            li.appendChild(btnEliminar);
            listaCarrito.appendChild(li);
            total += producto.precio;
        });

        totalElemento.textContent = `$${total.toLocaleString()}`;
    }

    // Evento para agregar productos al carrito
    document.querySelectorAll(".agregar-carrito").forEach(boton => {
        boton.addEventListener("click", (e) => {
            const producto = e.target.closest(".producto"); // Encuentra el contenedor del producto
            const id = producto.getAttribute("data-id");
            const nombre = producto.getAttribute("data-nombre");
            const precio = parseInt(producto.getAttribute("data-precio"));

            if (!id || !nombre || isNaN(precio)) {
                alert("Error al agregar el producto. Verifica los datos.");
                return;
            }

            carrito.push({ id, nombre, precio });
            actualizarCarrito();
        });
    });

    // Evento para vaciar el carrito
    vaciarCarritoBtn.addEventListener("click", () => {
        carrito.length = 0;
        actualizarCarrito();
    });
});