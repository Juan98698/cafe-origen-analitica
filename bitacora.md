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
