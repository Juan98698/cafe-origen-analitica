
const ventas = require("./datos.js");



console.log("Cantidad de registros: ", ventas.length)
console.log("Primer Registro: ", ventas[0]);
console.log("Ultimo Registro: ", ventas[ventas.length - 1]);
console.log("Producto en la posicion 4: ", ventas[4].producto);
console.table(ventas);