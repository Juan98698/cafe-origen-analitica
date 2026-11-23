# Café Origen - Analítica de Ventas (v0.1)

Motor de procesamiento y analítica de datos comerciales para **Café Origen**, una tienda especializada en café colombiano y accesorios de preparación. Desarrollado en JavaScript puro sobre el entorno Node.js, bajo un enfoque de funciones puras, programación defensiva y formatos legibles para la toma de decisiones gerenciales.

---

## 📌 ¿Qué preguntas de negocio responde este motor?

1. **Ingresos y volumen total:** ¿Cuánto dinero total ha ingresado al negocio y cuántas unidades físicas de producto se han despachado?
2. **Ticket promedio:** ¿Cuál es el valor promedio de compra por cada factura o cliente efectivo?
3. **Venta destacada:** ¿Cuál fue la transacción récord del periodo, cuál fue su importe y en qué ciudad se realizó?
4. **Desempeño geográfico:** ¿Cuánto dinero recaudó cada ciudad (normalizando datos para evitar duplicidades por mayúsculas o espacios)?
5. **Inventario y demanda:** ¿Cuántas unidades se vendieron de cada producto del catálogo?
6. **Top 3 de productos estrella:** ¿Cuáles son los productos que más dinero aportaron a los ingresos globales (ordenados por valor monetario sin alterar los datos originales)?
7. **Análisis temporal por fecha:** ¿Cómo se comportaron las ventas en un día determinado, manejando de forma segura y sin errores (`NaN` o caídas) los días sin transacciones?

---

## 🚀 ¿Cómo ejecutar el proyecto?

Asegúrate de tener instalado [Node.js](https://nodejs.org/). Abre tu terminal en la raíz del proyecto y ejecuta:

### 1. Generar el reporte ejecutivo gerencial
Muestra en consola el informe consolidado con formato en pesos colombianos (`COP`), tablas alineadas y comparativa por fecha:
```bash
node src/reporte.js
```

### 2. Ejecutar la suite de pruebas y verificación
Valida que las funciones analíticas (ciclos tradicionales vs. métodos funcionales como `reduce`) arrojen resultados idénticos y consistentes:
```bash
node src/verificar.js
```

### 3. Exploración de datos crudos
Permite inspeccionar la estructura de los registros originales:
```bash
node src/explorar.js
```

---

## 📂 Estructura del Proyecto

* **`src/datos.js`**: Conjunto de datos con los registros de ventas de la tienda.
* **`src/analitica.js`**: Módulo central de funciones puras de procesamiento, cálculo de métricas y transformaciones.
* **`src/reporte.js`**: Script de presentación ejecutiva que formatea los datos en consola para la gerencia.
* **`src/verificar.js`**: Script de pruebas automatizadas que compara implementaciones imperativas y declarativas.
* **`src/explorar.js`**: Script de inspección inicial de datos.
* **`bitacora.md`**: Registro exhaustivo con el diccionario de datos, decisiones de calidad, preguntas funcionales y la documentación sistemática de depuración de errores.
