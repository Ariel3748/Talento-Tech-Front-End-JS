function mostrarProductos(productosAmostrar){
    var html = "";
    productosAmostrar.forEach(producto => {
        html += `
        <article>
        <img
          src="${producto.imagen}"
          alt="${producto.marca} ${producto.modelo}"
        />
        <h3>${producto.marca} ${producto.modelo}</h3>
        <ul>
          <li>Año: ${producto.año}</li>
          <li>Km: ${producto.kilometraje}</li>
          <li>Estado: ${producto.estado}</li>
        </ul>
        <a href="">
          <button class="pointer" >Ver mas..</button>
        </a>
      </article>        
        `
    })

    let productos = document.querySelector("#productos") 
    productos.innerHTML = html;
}

function traerDatosJSON(json){
    fetch(json)
        .then(respuesta => (respuesta.json()))
        .then((datos)=> (mostrarProductos(datos)))


}


document.addEventListener("DOMContentLoaded",traerDatosJSON("autos/Autos.txt"));
