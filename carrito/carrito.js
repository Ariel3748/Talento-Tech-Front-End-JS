const productos = [
    {
        "nombre" : "Termo" ,
        "descripicion": "Termo botella deportiva" ,
        "precio": 5000,
        "id": 1,

    },
    {
        "nombre" : "Termo matero" ,
        "descripicion": "Termo individual con mate" ,
        "precio": 7500,
        "id": 2,


    },
    {
        "nombre" : "Parlante" ,
        "descripicion": "Parlante portatil bluetooth" ,
        "precio": 11000,
        "id": 3,

    },
    {
        "nombre" : "Lentes de Sol" ,
        "descripicion": "Lentes de Sol Eivissa" ,
        "precio": 150000,
        "id": 4,

    },
    {
        "nombre" : "Aire Portatil" ,
        "descripicion": "Aire acondicionado portatil" ,
        "precio": 300000,
        "id": 5,

    }

];

function mostrarProductos(productosAmostrar){
    let html = "";              //Creo una variable vacia html que "borra" las cosas que tenga el html
    productosAmostrar.forEach(producto => {         //Recorro el JSON o el array del paramtero 
        html += `                                   
        <article data-id="${producto.id}">
            <h2>${producto.nombre}</h2>
            <p>${producto.descripicion}</p>
            <p>${producto.precio}</p>
            <button type="button" class="Agregar-item">Agregar Item</button>
        </article>
        `                           //para cada elemento del JSON creo un article con los datos del JSON y con += los va concatenando para que no se reemplcen
        
    });

    let containerProductos = document.querySelector("#container_productos") 
    containerProductos.innerHTML = html; //Agrego la variable html con los datos del JSON a la pagina

}

//Cuando carga la pagina se ejecuta la funcion que agarra el JSON y muestra los productos
document.addEventListener("DOMContentLoaded",mostrarProductos(productos));


//Obtengo Solamente el id, nombre y precio de el producto
function filtroDatosProducto(productoRecibido){
    const {id, nombre, precio} = productoRecibido
    const producto = {
        id: id,
        nombre : nombre,
        precio: precio,
    } 
    return(producto)
}


// Declaro un carrito nuevo o en caso de que ya haya uno lo levanto
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];



document.addEventListener("click", (event) => {             //Escucha el evento click en todo el documento
    if(event.target.classList.contains("Agregar-item")){    //Si a lo que hago click [(event es el click) y target es a que le hago click] contiene la clase "Agregar-item"
        const idConsulta = event.target.closest("article").dataset.id;  //Crea la variable id consulta y guarda el dataset con el tag id del elemento padre de donde fue efectuado el click
        const elemento = Object.values(productos).find(producto => producto.id === Number(idConsulta)); /*
        Transformo productos a un objeto array con (Object) y .values devuelve el valor de Productos; en este array busco con find() la cioncidencia 
        de producto.id y id consulta (que hay que pasarlo a numero porque el dom en el html lo tiene como string) y cuando encuentra la coincidencia
        devuelve el objeto producto
        */
       const producto = filtroDatosProducto(elemento)
       console.log(producto)
       console.log(carrito)

       //Agrego el producto al carrito
       carrito.push(producto)

       //Guardo el carrito en formato JSON dentro del local storage
        localStorage.setItem("carrito",JSON.stringify(carrito));
    }
})

function limpiarCarrito(carrito){
    carrito.length = 0
}

