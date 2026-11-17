const ventas = require("./datos.js");

const valorVenta = (venta) => venta.cantidad * venta.precio;

// Funcion total vendido
function totalVendido(ventas){
  let acumulador = 0;
  for(const v of ventas){
    if(v.cantidad > 0){
      acumulador += valorVenta(v);
    }
  }
  return acumulador;
}

// Funcion unidades vendidas
function unidadesVendidas(ventas){
  let acumulador = 0;
  for(const v of ventas){
    if(v.cantidad > 0){
      acumulador += v.cantidad;
    }
  }
  return acumulador;
}

// Funcion venta mayor retornando el objeto completo
function ventaMayor(ventas){
  if (ventas.length === 0) return null;
  let mayor = ventas[0];
  for(const v of ventas){
    if(valorVenta(v) > valorVenta(mayor)){
      mayor = v;
    }
  }
  return mayor;
}

// Funcion promedio ticket
function ticketPromedio(ventas){
  let acumulador = 0;
  let contador = 0;
  for(const v of ventas){
    if(v.cantidad > 0){
      acumulador += valorVenta(v);
      contador++;
    }
  }
  if (contador === 0) return 0;
  return Math.round(acumulador / contador);
}

// Funcion ventas por ciudad
function ventasPorCiudad(ventas, ciudad){
  let acumulador = 0;
  const ciudadBuscada = ciudad.trim().toLowerCase();
  for(const v of ventas){
    if(v.cantidad > 0 && v.ciudad.trim().toLowerCase() === ciudadBuscada){
      acumulador += valorVenta(v);
    }
  }
  return acumulador;
}

// ==========================================
// CASOS DE PRUEBA (Completo, 1 elemento, Vacío)
// ==========================================

const unElemento = [
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
