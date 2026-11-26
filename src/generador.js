const { ventas } = require("./datos.js");
const ciudades = ["Medellín", "Bogotá", "Cali", "Pereira"];
const tablaDeProductos = [{ producto: "Origen Huila 500 g", precio: 42000 }, { producto: "Origen Nariño 250 g", precio: 26000 },
{ producto: "Prensa Francesa", precio: 95000 }, { producto: "Origen Sierra 500 g", precio: 45000 }, { producto: "Molino manual", precio: 120000 }];


function elementoAlAzar(arreglo) {
    const indice = Math.floor(Math.random() * arreglo.length);
    return arreglo[indice];

}
function generarVentas(n){
    const maxClientes = Math.max(1, Math.floor(n / 3));
    const ventas = [];
    for(let i = 1; i<= n; i ++){

        const item = elementoAlAzar(tablaDeProductos);
        const numCliente = Math.floor(Math.random() * maxClientes) + 1;
       const nuevaVenta = {
        id: i, fecha: "2026-11-25", cliente: "C" + numCliente,
        producto : item.producto, ciudad: elementoAlAzar(ciudades),
        cantidad: Math.floor(Math.random()*5) + 1, precio: item.precio};
            ventas.push(nuevaVenta);

    }
    return ventas;
}
console.log(generarVentas(3));
module.exports = { generarVentas };