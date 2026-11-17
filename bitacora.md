# Bitácora del Proyecto: Café Origen Analítica

Registro de decisiones de arquitectura, diseño, calidad de datos y análisis del sistema de ventas.

---

## Diccionario de datos

A continuación se describe cada una de las propiedades presentes en el conjunto de datos de ventas (`src/datos.js`):

| Propiedad | Tipo de Dato | Significado / Descripción | Ejemplo |
| :--- | :--- | :--- | :--- |
| `id` | `number` (Entero positivo) | Identificador único numérico de la transacción o registro de venta. | `1` |
| `fecha` | `string` (Formato ISO `AAAA-MM-DD`) | Fecha en la cual se llevó a cabo la transacción comercial. | `"2026-09-01"` |
| `cliente` | `string` (Alfanumérico) | Código identificador único del cliente que realizó la compra. | `"C01"` |
| `producto` | `string` (Texto descriptivo) | Nombre y presentación del producto comercializado (café de especialidad con gramaje o accesorios de preparación). | `"Origen Huila 500 g"` |
| `ciudad` | `string` (Texto) | Ciudad de Colombia donde se registró o despachó la venta. | `"Medellín"` |
| `cantidad` | `number` (Entero) | Número de unidades adquiridas del producto en la transacción. | `2` |
| `precio` | `number` (Numérico) | Precio unitario de venta del producto expresado en pesos colombianos (COP). | `42000` |

---

## Casos borde detectados

Durante la inspección del conjunto de datos se identificaron los siguientes problemas de calidad de datos:

### 1. Inconsistencia de formato en Ciudades (Capitalización / Mayúsculas y Minúsculas)
* **Problema:** En el registro con `id: 5`, la ciudad está registrada en minúsculas (`"medellín"`), a diferencia de los registros `id: 1`, `id: 4` e `id: 11` donde aparece capitalizada (`"Medellín"`).
* **Impacto:** En JavaScript la comparación de strings distingue entre mayúsculas y minúsculas (`"Medellín" !== "medellín"`). Si se agrupan o totalizan las ventas por ciudad, Medellín se contabilizaría erróneamente como dos ciudades diferentes, sesgando los análisis regionales.
* **Decisión:** Implementar una normalización previa al procesamiento y agregación de datos, estandarizando el texto (por ejemplo, convirtiendo a formato capitalizado o aplicando `.trim().toLowerCase()` para comparaciones uniformes).

### 2. Cantidades no válidas (Transacciones con cantidad cero)
* **Problema:** En el registro con `id: 8`, la propiedad `cantidad` tiene un valor de `0` (`producto: "Origen Huila 500 g"`, `precio: 42000`).
* **Impacto:** Una venta con cantidad cero no representa un intercambio comercial efectivo ni genera ingresos reales ($0 \times 42000 = 0$). Además, distorsiona métricas operativas como el volumen de productos vendidos, el promedio de unidades por pedido y los promedios de ventas.
* **Decisión:** Excluir o filtrar los registros con `cantidad <= 0` al calcular métricas financieras y operativas (ingresos totales, unidades vendidas, ticket promedio). Estos registros se clasificarán como transacciones no concretadas, canceladas o errores de captura.

### 3. Calidad en Clientes (Clientes inactivos vs. recurrentes)
* **Problema:** El cliente `"C06"` figura únicamente en el registro `id: 8`, cuya cantidad vendida fue `0`. A su vez, existen clientes recurrentes (`"C01"`, `"C02"`, `"C03"`) y clientes de una sola compra.
* **Impacto:** Si se incluye a `"C06"` en el conteo de clientes compradores activos, se infla la base real de clientes efectivos del negocio. Además, si se analiza la frecuencia de compra sin validar transacciones efectivas, las métricas de retención y valor de vida del cliente (LTV) resultan inexactas.
* **Decisión:** Validar que solo se consideren como "clientes activos/compradores" aquellos que posean transacciones válidas (`cantidad > 0`). Para los análisis de recurrencia y clientes únicos, utilizar estructuras de datos únicas (`Set` o agregaciones agrupadas por cliente) que midan el comportamiento real de compra.

---

## Decisiones de diseño frente al arreglo vacío (`[]`)

Para asegurar que las funciones sean tolerantes a fallos (defensivas) cuando reciben un arreglo vacío (`[]`), decidí los siguientes retornos:

1. **`totalVendido([])` -> retorna `0`**:
   * Si no hay transacciones para sumar, el dinero total recaudado en ventas es $0. El acumulador inicia en 0 y el ciclo simplemente no se ejecuta.
2. **`unidadesVendidas([])` -> retorna `0`**:
   * Sin ventas en la lista, el total de unidades físicas despachadas es 0.
3. **`ventaMayor([])` -> retorna `null`**:
   * No se puede devolver un objeto de venta porque no existe ninguno en la lista. Si intentara acceder a `ventas[0]` daría un error (`undefined`). Por eso coloco una validación inicial: `if (ventas.length === 0) return null;`, lo que representa explícitamente la ausencia de una venta mayor.
4. **`ticketPromedio([])` -> retorna `0`**:
   * Si el arreglo está vacío, no hay ventas válidas (`contador = 0`). Para evitar una indeterminación matemática (división por cero `0 / 0 = NaN`), incluyo `if (contador === 0) return 0;`.
5. **`ventasPorCiudad([], ciudad)` -> retorna `0`**:
   * En una lista sin datos no se generó ninguna venta para la ciudad consultada, por lo que el monto acumulado debe ser 0.

---

## Tablas de traza manual de ejecución

Para comprobar que las funciones operan de forma correcta, realicé la verificación manual paso a paso de dos funciones y comparé los resultados con la ejecución en consola de Node.js.

### Traza 1: Función `unidadesVendidas(ventas)`

* **Entrada:** Arreglo completo `ventas` (12 registros).
* **Estado inicial:** `acumulador = 0`

| Paso (Iteración) | `id` | `producto` | `cantidad` | Condición (`cantidad > 0`) | Operación (`acumulador += cantidad`) | `acumulador` resultante |
| :---: | :---: | :--- | :---: | :---: | :--- | :---: |
| 1 | 1 | Origen Huila 500 g | 2 | Sí (2 > 0) | 0 + 2 | 2 |
| 2 | 2 | Origen Nariño 250 g | 1 | Sí (1 > 0) | 2 + 1 | 3 |
| 3 | 3 | Prensa francesa | 1 | Sí (1 > 0) | 3 + 1 | 4 |
| 4 | 4 | Origen Huila 500 g | 1 | Sí (1 > 0) | 4 + 1 | 5 |
| 5 | 5 | Origen Sierra 500 g | 3 | Sí (3 > 0) | 5 + 3 | 8 |
| 6 | 6 | Origen Nariño 250 g | 2 | Sí (2 > 0) | 8 + 2 | 10 |
| 7 | 7 | Molino manual | 1 | Sí (1 > 0) | 10 + 1 | 11 |
| 8 | 8 | Origen Huila 500 g | 0 | **No (0 > 0 es falso)** | Se ignora | 11 |
| 9 | 9 | Origen Sierra 500 g | 2 | Sí (2 > 0) | 11 + 2 | 13 |
| 10 | 10 | Origen Huila 500 g | 4 | Sí (4 > 0) | 13 + 4 | 17 |
| 11 | 11 | Prensa francesa | 1 | Sí (1 > 0) | 17 + 1 | 18 |
| 12 | 12 | Origen Nariño 250 g | 3 | Sí (3 > 0) | 18 + 3 | **21** |

* **Resultado manual:** `21` unidades.
* **Resultado del programa en Node.js:** `21`.
* **Conclusión:** Ambos resultados coinciden. Se verifica además que el caso borde con cantidad 0 (`id: 8`) fue ignorado correctamente sin alterar la cuenta.

---

### Traza 2: Función `ventasPorCiudad(ventas, "Medellín")`

* **Entrada:** Arreglo completo `ventas`, `ciudad = "Medellín"`.
* **Normalización previa:** `ciudadBuscada = "medellín"`.
* **Estado inicial:** `acumulador = 0`

| Paso | `id` | `ciudad` en datos | Normalizada (`.trim().toLowerCase()`) | ¿Coincide y `cant > 0`? | Subtotal venta (`cant * precio`) | `acumulador` resultante |
| :---: | :---: | :--- | :--- | :---: | :--- | :---: |
| 1 | 1 | `"Medellín"` | `"medellín"` | **Sí** | 2 * 42.000 = 84.000 | 84.000 |
| 2 | 2 | `"Bogotá"` | `"bogotá"` | No | - | 84.000 |
| 3 | 3 | `"Cali"` | `"cali"` | No | - | 84.000 |
| 4 | 4 | `"Medellín"` | `"medellín"` | **Sí** | 1 * 42.000 = 42.000 | 126.000 |
| 5 | 5 | `"medellín"` | `"medellín"` | **Sí** | 3 * 45.000 = 135.000 | 261.000 |
| 6 | 6 | `"Bogotá"` | `"bogotá"` | No | - | 261.000 |
| 7 | 7 | `"Bogotá"` | `"bogotá"` | No | - | 261.000 |
| 8 | 8 | `"Cali"` | `"cali"` | No | - | 261.000 |
| 9 | 9 | `"Cali"` | `"cali"` | No | - | 261.000 |
| 10 | 10 | `"Pereira"` | `"pereira"` | No | - | 261.000 |
| 11 | 11 | `"Medellín"` | `"medellín"` | **Sí** | 1 * 95.000 = 95.000 | **356.000** |
| 12 | 12 | `"Bogotá"` | `"bogotá"` | No | - | 356.000 |

* **Resultado manual:** `$356.000`.
* **Resultado del programa en Node.js:** `356000`.
* **Conclusión:** Ambos resultados coinciden. Queda comprobado que la normalización funcionó con éxito, ya que el registro `id: 5` (que venía en minúscula `"medellín"`) fue sumado junto a los registros capitalizados (`id: 1`, `4` y `11`).
