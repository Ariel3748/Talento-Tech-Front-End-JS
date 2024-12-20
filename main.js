function mostrarProductos(productosAmostrar){
    var html = "";
    productosAmostrar.forEach(producto => {
        html += `
        <article data-id="${producto.id}">
        <img
          src="${producto.imagen}"
          alt="${producto.marca} ${producto.modelo}"
        />
        <h3>${producto.marca} ${producto.modelo}</h3>
        <ul>
          <li>Año: ${producto.año}</li>
          <li>Km: ${producto.kilometraje}</li>
          <li>Estado: ${producto.estado}</li>
          <li>Precio: ${producto.precio}$USD</li> 
        </ul>
          <button class="pointer" >Ver mas..</button>
          <button class="Agregar_Item" >Agregar al carrito</button>
      </article>        
        `
    })

    const productos = document.querySelector("#productos") 
    productos.innerHTML += html;
}

function traerDatosJSON(json){
    fetch(json)
        .then(respuesta => (respuesta.json()))
        .then((datos)=> (mostrarProductos(datos)))
}


function filtroDatosProducto(producto){
    const {id, marca, modelo, precio} = producto
    var productoFiltrado = {
      id: id,
      marca: marca,
      modelo: modelo,
      precio: precio,
      cantidad : 1,
      
    }

  return(productoFiltrado)
}

document.addEventListener("DOMContentLoaded",traerDatosJSON("autos/Autos.txt"));


// Declaro un carrito nuevo o en caso de que ya haya uno lo levanto
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];


function agregarAlCarrito(elementoAagregar){

  const productoExistente = carrito.find(auto => auto.id == elementoAagregar.id);

  if (productoExistente) {
      productoExistente.cantidad += elementoAagregar.cantidad;
  }
  else(carrito.push(elementoAagregar))
}

document.addEventListener("click", (event) => {
  if(event.target.classList.contains("Sumar_Item")){
    const productoClickeado = event.target.closest("tr").dataset.id; 
    const elemento = carrito.find(auto => auto.id == productoClickeado)
    if(elemento){
      elemento.cantidad += 1
    }
  }
  if(event.target.classList.contains("Restar_Item")){
    const productoClickeado = event.target.closest("tr").dataset.id; 
    const elementoArestar = carrito.find(auto => auto.id == productoClickeado)
    if(elementoArestar.cantidad !== 1){
        elementoArestar.cantidad -= 1
    }
    else{
      const index = carrito.indexOf(elementoArestar);
      carrito.splice(index , 1)
    }
    }
    localStorage.setItem("carrito",JSON.stringify(carrito));
    document.querySelector("#items").innerHTML = ""
    actualizarCarrito(carrito)

})

fetch("autos/Autos.txt")
  .then(respuesta => (respuesta.json()))
  .then((datos)=> (document.addEventListener("click", (event) =>{
    if(event.target.classList.contains("Agregar_Item")){
      const idConsulta = event.target.closest("article").dataset.id;
      const elemento = (datos).find(auto => auto.id == idConsulta)
      const producto = filtroDatosProducto(elemento)

      console.log(producto)
      agregarAlCarrito(producto)

       //Guardo el carrito en formato JSON dentro del local storage
       localStorage.setItem("carrito",JSON.stringify(carrito));

    }
})))



function limpiarCarrito(carrito){
    carrito.length = 0
}




function actualizarCarrito(carrito){
    Object.values(carrito).forEach(item => {
        const htmlcarrito = `
            <tr data-id="${item.id}">
            <td>${item.marca}</td>
            <td>${item.modelo}</td>
            <td>${item.precio}</td>
            <td><button class = "Sumar_Item" >Agregar</button>${item.cantidad}<button class = "Restar_Item">Quitar</button></td>    
        `
        const items = document.querySelector("#items")
        items.innerHTML += htmlcarrito;
});


}

addEventListener("DOMContentLoaded",actualizarCarrito(carrito))

