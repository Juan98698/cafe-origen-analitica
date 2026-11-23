const { ventas } = require("./datos.js");
const { 
  totalVendido, totalVendidoM, 
  unidadesVendidas, unidadesVendidasM, 
  ventasPorCiudad, ventasPorCiudadM, ventaMayor, 
  ticketPromedio, valorVenta, totalPorCiudad,
   totalPorCiudadM, unidadesPorProducto, topProductosPorValor, ventasDelDia
} = require("./analitica.js");

const mayor = ventaMayor(ventas); //guardo la venta mayor en una variable
const montoMayor = valorVenta(mayor);// luego obtengo su valor en dinero

const formatoDinero = (monto) => `$ ${monto.toLocaleString("es-CO")}`;
console.log("\n===================================================== ");
console.log("===================RESUMEN GENERAL===================");
console.log("===================================================== \n");
console.log("• Total Vendido:", "\t", formatoDinero(totalVendido(ventas)));
console.log("• Unidades vendidas:", "\t", unidadesVendidasM(ventas), " unidades");
console.log("• Ticket promedio:", "\t", formatoDinero(ticketPromedio(ventas)));
console.log("• Venta mayor:", "\t","\t", formatoDinero(montoMayor), "-", mayor.producto, "en", mayor.ciudad);
console.log("\n===================================================== \n");
console.log("• Ventas por Ciudad:", "\n");
const ventasCiudad = totalPorCiudad(ventas);// g
const tablaCiudades = []; //creamos un arreglo vacio
// Recorremos el objeto y armamos la fila para la tabla
for (const ciudad in ventasCiudad) {
  tablaCiudades.push({
    Ciudad: ciudad,
    Total: formatoDinero(ventasCiudad[ciudad])
  });
}
//tabla con las columnas 'Ciudad' y 'Total' con el dinero formateado
console.table(tablaCiudades);
console.log("• Unidades vendidas por producto:\n");
const unidadesProducto = unidadesPorProducto(ventas);
const tablaProductos = [];

for(const unidad in unidadesProducto){
    tablaProductos.push({
        Producto: unidad,
        Unidades: unidadesProducto[unidad]

    });

}
console.table(tablaProductos);
console.log("• Top 3 de productos mas vendidos por valor:\n","\n", topProductosPorValor(ventas, 3));

console.log("\n=====================================================");
console.log("================ VENTAS POR FECHA ===================");
console.log("=====================================================\n");

function reportePorFecha(fecha){
    const ventasFecha = ventasDelDia(ventas, fecha);
    console.log("--- Reporte del dia: ", fecha, " ---\n");
    console.log("• Total vendido:\t", formatoDinero(totalVendido(ventasFecha)));
    console.log("• Unidades:\t\t", unidadesVendidasM(ventasFecha), " unidades" );
    console.log("• Ticket promedio:\t", formatoDinero(ticketPromedio(ventasFecha)));
    console.log("\n")
}

//  Día con ventas:
reportePorFecha("2026-09-01");

// Día sin ventas:
reportePorFecha("2026-09-15");