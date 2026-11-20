const { ventas } = require("./datos.js");
const { 
  totalVendido, totalVendidoM, 
  unidadesVendidas, unidadesVendidasM, 
  ventasPorCiudad, ventasPorCiudadM, ventaMayor, 
  ticketPromedio, valorVenta, totalPorCiudad, totalPorCiudadM
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

console.log(totalPorCiudad(ventas));
console.log(totalPorCiudadM(ventas));