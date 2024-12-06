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
    let html = "";
    productosAmostrar.forEach(producto => {
        html += `
        <article data-id="${producto.id}">
            <h2>${producto.nombre}</h2>
            <p>${producto.descripicion}</p>
            <p>${producto.precio}</p>
        </article>
        `
        
    });

    let containerProductos = document.querySelector("#container_productos")
    containerProductos.innerHTML = html;

}

//Cuando carga la pagina se ejecuta la funcion que agarra el JSON y muestra los productos
document.addEventListener("DOMContentLoaded",mostrarProductos(productos));