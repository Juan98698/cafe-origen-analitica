const { ventas } = require("./datos.js");
const valorVenta = (venta) => venta.cantidad * venta.precio;

// Funcion total vendido
function totalVendido(ventas) {
  let acumulador = 0;
  for (const v of ventas) {
    if (v.cantidad > 0) {
      acumulador += valorVenta(v);
    }
  }
  return acumulador;
}

function totalVendidoM(ventas) {
  return ventas.reduce((acumulador, v) => {
    return v.cantidad > 0 ?
      acumulador + valorVenta(v) : acumulador;  //<-- Operador ternario
  }, 0); // <-- 0 es el valor inicial del acumulador

}

// Funcion unidades vendidas
function unidadesVendidas(ventas) {
  let acumulador = 0;
  for (const v of ventas) {
    if (v.cantidad > 0) {
      acumulador += v.cantidad;
    }
  }
  return acumulador;
}

function unidadesVendidasM(ventas){
  return ventas.reduce((acumulador, v) =>{
    return v.cantidad > 0 ? 
    acumulador + v.cantidad : acumulador;
  }, 0);
}

// Funcion venta mayor retornando el objeto completo
function ventaMayor(ventas) {
  if (ventas.length === 0) return null;
  let mayor = ventas[0];
  for (const v of ventas) {
    if (valorVenta(v) > valorVenta(mayor)) {
      mayor = v;
    }
  }
  return mayor;
}

// Funcion promedio ticket
function ticketPromedio(ventas) {
  let acumulador = 0;
  let contador = 0;
  for (const v of ventas) {
    if (v.cantidad > 0) {
      acumulador += valorVenta(v);
      contador++;
    }
  }
  if (contador === 0) return 0;
  return Math.round(acumulador / contador);
}

// Funcion ventas por ciudad
function ventasPorCiudad(ventas, ciudad) {
  let acumulador = 0;
  const ciudadBuscada = ciudad.trim().toLowerCase();
  for (const v of ventas) {
    if (v.cantidad > 0 && v.ciudad.trim().toLowerCase() === ciudadBuscada) {
      acumulador += valorVenta(v);
    }
  }
  return acumulador;
}

function ventasPorCiudadM(ventas, ciudad){
  const ciudadBuscada = ciudad.trim().toLowerCase();
return ventas.reduce((acumulador, v) =>{return v.ciudad.trim().toLowerCase() === ciudadBuscada && v.cantidad > 0 ?
  acumulador + valorVenta(v) : acumulador
},0);

}

function totalPorCiudad(ventas){
    const porCiudad = {};
    const normalizar = texto => texto.trim().toLowerCase();
    for (const v of ventas) {
    const ciudad = normalizar(v.ciudad);
    if (porCiudad[ciudad] === undefined) {
        porCiudad[ciudad] = 0;
    }
    porCiudad[ciudad] += valorVenta(v);
}
    return porCiudad;

}

function totalPorCiudadM(ventas){
const normalizar = texto => texto.trim().toLowerCase();
return ventas.reduce((porCiudad,v) => { const ciudad = normalizar(v.ciudad);
if (porCiudad[ciudad] === undefined) {
    porCiudad[ciudad] = 0;
}
porCiudad[ciudad] += valorVenta(v);
return porCiudad;
},{});

}



// ==========================================
// CASOS DE PRUEBA (Completo, 1 elemento, Vacío)
// ==========================================

/*const unElemento = [
  { id: 1, fecha: "2026-09-01", cliente: "C01", producto: "Origen Huila 500 g", ciudad: "Medellín", cantidad: 2, precio: 42000 }
];
const arregloVacio = [];

console.log("=== PRUEBAS totalVendido ===");
console.log("Arreglo completo:", totalVendido(ventas));
console.log("Un solo elemento:", totalVendido(unElemento));
console.log("Arreglo vacio:", totalVendido(arregloVacio));

console.log("\n=== PRUEBAS unidadesVendidas ===");
console.log("Arreglo completo:", unidadesVendidas(ventas));
console.log("Un solo elemento:", unidadesVendidas(unElemento));
console.log("Arreglo vacio:", unidadesVendidas(arregloVacio));

console.log("\n=== PRUEBAS ventaMayor ===");
console.log("Arreglo completo:", ventaMayor(ventas));
console.log("Un solo elemento:", ventaMayor(unElemento));
console.log("Arreglo vacio:", ventaMayor(arregloVacio));

console.log("\n=== PRUEBAS ticketPromedio ===");
console.log("Arreglo completo:", ticketPromedio(ventas));
console.log("Un solo elemento:", ticketPromedio(unElemento));
console.log("Arreglo vacio:", ticketPromedio(arregloVacio));

console.log("\n=== PRUEBAS ventasPorCiudad ===");
console.log("Arreglo completo (Medellin):", ventasPorCiudad(ventas, "Medellín"));
console.log("Un solo elemento (Medellin):", ventasPorCiudad(unElemento, "Medellín"));
console.log("Arreglo vacio (Medellin):", ventasPorCiudad(arregloVacio, "Medellín"));
*/

module.exports = {totalVendido, totalVendidoM, unidadesVendidas, unidadesVendidasM,
   ventaMayor, ticketPromedio, ventasPorCiudad, ventasPorCiudadM, valorVenta, totalPorCiudad, totalPorCiudadM
};


//console.log("Calculando total vendido usando metodo Reduce: ", totalVendidoM(ventas));
//console.log("Calculando unidades vendidas usando metodo Reduce: ", unidadesVendidasM(ventas));
//console.log("Calculando ventas por ciudad usando metodo Reduce: ", ventasPorCiudadM(ventas,"medellín"));
