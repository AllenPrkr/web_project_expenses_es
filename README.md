# Proyecto 5: Gestor de gastos

Aplicacion web para registrar gastos, asignar un presupuesto y consultar
estadisticas generales por categoria.

## Descripcion

Este proyecto convierte una pagina estatica en un gestor de gastos funcional con
JavaScript. La aplicacion permite visualizar una lista inicial de gastos, calcular
el total gastado, obtener el gasto promedio, mostrar el saldo disponible y
detectar la categoria con mayor gasto.

## Funcionalidades

- Asignar un presupuesto.
- Mostrar gastos totales.
- Calcular el gasto promedio.
- Calcular el saldo disponible.
- Cambiar el color del saldo segun su estado:
  - rojo cuando el saldo es negativo;
  - naranja cuando queda menos del 25% del presupuesto;
  - verde cuando el saldo es suficiente.
- Mostrar estadisticas por categoria.
- Detectar la categoria con mayor gasto.
- Agregar nuevos gastos desde una ventana emergente.
- Eliminar gastos de la lista.
- Guardar presupuesto y gastos en `localStorage`.
- Restablecer los datos con el boton "Borrar todo".

## Tecnologias utilizadas

- HTML
- CSS
- JavaScript
- Git y GitHub

## Estructura principal

```text
web_project_expenses_es/
├── blocks/
├── images/
├── pages/
├── scripts/
│   ├── calculations.js
│   ├── handle-html.js
│   └── index.js
├── vendor/
├── index.html
└── README.md
```

## Como ejecutar el proyecto

La forma recomendada es abrir el proyecto con un servidor local para evitar
restricciones del navegador al usar rutas `file://`.

Desde la carpeta del proyecto, ejecuta:

```bash
python -m http.server 5500 --bind 127.0.0.1
```

Luego abre en el navegador:

```text
http://127.0.0.1:5500/index.html
```

## Estado del proyecto

Proyecto completado. La logica principal fue implementada en
`scripts/calculations.js` y los scripts fueron enlazados en `index.html` en el
orden requerido:

```html
<script src="./scripts/calculations.js"></script>
<script src="./scripts/handle-html.js"></script>
<script src="./scripts/index.js"></script>
```
