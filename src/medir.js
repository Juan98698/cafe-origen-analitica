const { generarVentas } = require("./generador.js");
const { ventas } = require("./datos.js");
const valorVenta = (venta) => venta.cantidad * venta.precio;

const contador = { operaciones: 0 };

function totalVendidoInstrumentada(ventas, contador) {
  let acumulador = 0;
  contador.operaciones = 0;
  for (const v of ventas) {
    contador.operaciones ++;
    if (v.cantidad > 0) {
      acumulador += valorVenta(v);
    }
  }
  return acumulador;
}

function totalVendidoMInstrumentada(ventas, contador) {
    contador.operaciones = 0;
  return ventas.reduce((acumulador, v) => {
    contador.operaciones ++;
    return v.cantidad > 0 ?
      acumulador + valorVenta(v) : acumulador;  //<-- Operador ternario
  }, 0); // <-- 0 es el valor inicial del acumulador

}

function ventaMayorInstrumentada(ventas, contador) {
    contador.operaciones = 0;
  if (ventas.length === 0) return null;
  let mayor = ventas[0];
  for (const v of ventas) {
    contador.operaciones ++;
    if (valorVenta(v) > valorVenta(mayor)) {
      mayor = v;
    }
  }
  return mayor;
}

function totalPorCiudadInstrumentada(ventas, contador){
    contador.operaciones = 0;
    const porCiudad = {};
    const normalizar = texto => texto.trim().toLowerCase();
    for (const v of ventas) {
        contador.operaciones ++;
    const ciudad = normalizar(v.ciudad);
    if (porCiudad[ciudad] === undefined) {
        porCiudad[ciudad] = 0;
    }
    porCiudad[ciudad] += valorVenta(v);
}
    return porCiudad;

}

function totalPorCiudadMInstrumentada(ventas, contador){
    contador.operaciones = 0;
const normalizar = texto => texto.trim().toLowerCase();
return ventas.reduce((porCiudad,v) => { const ciudad = normalizar(v.ciudad);
if (porCiudad[ciudad] === undefined) {
    porCiudad[ciudad] = 0;
}
contador.operaciones ++;
porCiudad[ciudad] += valorVenta(v);
return porCiudad;
},{});

}

function primeraVentaInstrumentada(ventas, contador) {
    contador.operaciones = 0;
  contador.operaciones++; // Solo hace 1 operación directa
  return ventas.length > 0 ? ventas[0] : null;
}

const tamanos = [100, 1000, 10000, 100000];
const resultados = [];

for (const n of tamanos) {

    const datos = generarVentas(n);

    primeraVentaInstrumentada(datos, contador);
    const opsPrimera = contador.operaciones;    
    // 3. PROBAMOS LA SEGUNDA FUNCIÓN:
    totalVendidoInstrumentada(datos, contador);
    const opsTotal = contador.operaciones;
    // 4. PROBAMOS LA TERCERA FUNCIÓN:
    ventaMayorInstrumentada(datos, contador);
    const opsMayor = contador.operaciones;   

    // 5. PROBAMOS LA CUARTA FUNCIÓN:
    totalPorCiudadInstrumentada(datos, contador);
    const opsCiudad = contador.operaciones;  

    // 6. GUARDAMOS LA FILA PARA LA TABLA:
    resultados.push({
        "Tamaño (n)": n,
        "primeraVenta": opsPrimera,
        "totalVendido": opsTotal,
        "ventaMayor": opsMayor,
        "totalPorCiudad": opsCiudad
    });
}

// 7. CUANDO TERMINA EL CICLO, MOSTRAMOS LA TABLA:
console.table(resultados);