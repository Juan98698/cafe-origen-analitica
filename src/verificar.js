const { ventas } = require("./datos.js");
const { 
  totalVendido, totalVendidoM, 
  unidadesVendidas, unidadesVendidasM, 
  ventasPorCiudad, ventasPorCiudadM, ventaMayor, 
  ticketPromedio, valorVenta, totalPorCiudad,
   totalPorCiudadM, unidadesPorProducto, topProductosPorValor
} = require("./analitica.js");

const cicloTotalVendido = totalVendido(ventas);
const metodoTotalVendido = totalVendidoM(ventas);

console.log(cicloTotalVendido === metodoTotalVendido ? "OK" : "DIFERENTE");

const cicloUnidadesVendidas = unidadesVendidas(ventas);
const metodoUnidadesVendidas = unidadesVendidasM(ventas);

console.log(cicloUnidadesVendidas === metodoUnidadesVendidas ? "OK" : "DIFERENTE");

const cicloVentasPorCiudad = ventasPorCiudad(ventas, "Bogotá");
const metodoVentasPorCiudad = ventasPorCiudadM(ventas, "Bogotá");

console.log(cicloVentasPorCiudad === metodoVentasPorCiudad ? "OK" : "DIFERENTE");

const cicloTotalPorCiudad = JSON.stringify(totalPorCiudad(ventas));
const metodoTotalPorCiudad = JSON.stringify(totalPorCiudadM(ventas));

console.log(cicloTotalPorCiudad === metodoTotalPorCiudad ? "OK" : "DIFERENTE");

const unidadesProd = unidadesPorProducto(ventas);
console.log(unidadesProd && unidadesProd["Origen Huila 500 g"] === 7 ? "OK" : "DIFERENTE");

const top3 = topProductosPorValor(ventas, 3);
console.log(Array.isArray(top3) && top3.length === 3 && top3[0] === "Origen Huila 500 g" ? "OK" : "DIFERENTE");