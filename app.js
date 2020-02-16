class Producto {
  constructor(nombre, precio, agno) {
    this.nombre = nombre;
    this.precio = precio;
    this.agno = agno;
  }
}

class UI {
  agregarProducto(producto) {
    const listaProducto = document.getElementById("lista-productos");
    const elemento = document.createElement("div");
    elemento.innerHTML = `
      <div class="card text-center mb-4" >
      <div class="card-body">
          <strong>Nombre Producto</strong>: ${producto.nombre}
          <strong>Precio Producto</strong>: ${producto.precio}
          <strong>Año Producto</strong>: ${producto.agno}
    <a href="#" class="btn btn-danger" name="borrar">Borrar</a>

      </div>
  </div>
      `;
    listaProducto.appendChild(elemento);
  }
  eliminarProducto(elemento) {
      if (elemento.name === "borrar") {
        //   con parentElement vamos subiendo de nivel hasta llegar al elemento padre mas superior... Comineza por el card-body, luego por el card y finalmente el div (esos son los 3 parentElement que utilizo)
         console.log
         (elemento.parentElement.parentElement.parentElement);
         elemento.parentElement.parentElement.parentElement.remove();
         this.mensajes("Producto eliminado satisfactoriamente","danger");
      }
  }
  mensajes(mensaje,claseCSS) {
    const div = document.createElement("div");
    div.className = `alert alert-${claseCSS} mt-4`;
    div.appendChild(document.createTextNode(mensaje));
    // Mostrando en el DOM 
    const contenedor = document.querySelector(".container");
    const app = document.querySelector("#App");
    // Se va a insertar dentro del contenedor el div que hemos creado pero antes de app
    contenedor.insertBefore(div,app);
    // Al cabo de 3 segundos, va a remover cualquier elemento que se encuentre en el DOM que contenga la clase CSS alert
    setTimeout(function(){
        document.querySelector(".alert").remove();
    },3000);
    
  }
  resetearFormulario() {
    document.getElementById("form-producto").reset();
  }
}

// Eventos del DOM
document
  .getElementById("form-producto")
  .addEventListener("submit", function(e) {
    //   alert("enviando formulario");
    const nombre = document.getElementById("nombre").value;
    const precio = document.getElementById("precio").value;
    const agno = document.getElementById("agno").value;

    console.log(nombre, precio, agno);

    console.log(new Producto(nombre, precio, agno));
    const producto = new Producto(nombre, precio, agno);
    const ui = new UI();
    if (nombre === '' || precio === '' || agno === '') {
        return ui.mensajes("Debe completar los campos","danger");
    }
    ui.agregarProducto(producto);
    ui.resetearFormulario();
    ui.mensajes("Producto agregado satisfactoriamente","success");
    //   Cancelar el comportamiento por defecto del formulario que de refrescar la pagina al enviar los datos
    e.preventDefault();
  });

  document.getElementById("lista-productos").addEventListener("click", function(e){
    //   alert("eliminando");
    // console.log(e.target);
    const ui = new UI();
    ui.eliminarProducto(e.target)
    
  });