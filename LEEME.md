# WP Iruña 9802 · Masculino — web del equipo

Web sencilla (HTML + CSS + JS, sin instalar nada) con calendario, resultados, clasificación, crónicas y galería.

## Abrirla
Doble clic en `index.html`. Funciona sin internet, salvo las fuentes tipográficas.

Truco para probar: `index.html?hoy=2026-11-20` hace que la web crea que hoy es esa fecha.

## Actualizar datos
**Todo está en `data/datos.js`.** No hace falta tocar nada más.

### Meter un resultado
Busca el partido y cambia `resultado: null` por el marcador (local primero, visitante después):

```js
{ id: "p01", fecha: "2026-10-10", hora: "19:00", local: "iruna", visitante: "sestao",
  resultado: { local: 12, visitante: 8 },
  parciales: [[3,2],[4,1],[2,3],[3,2]],            // opcional
  goleadores: [{ nombre: "Iñaki", goles: 4 }],      // opcional
  stats: "https://enlace-a-las-estadisticas",       // opcional
  cronica: { titulo: "Estreno con victoria",        // opcional
             texto: "Primer párrafo.\n\nSegundo párrafo." } },
```

- `hora: "19:00"`: cuando se sepa la hora. Con hora, la cuenta atrás muestra días, horas y minutos.
- `piscina: "Piscinas de ..."`: opcional, muestra el lugar.
- Victorias, empates, derrotas, racha y goles se calculan solos.

### Poner un cartel a un partido
Copia la foto (optimizada, ~1200 px de ancho) a `img/carteles/` y añade al partido:

```js
cartel: { foto: "img/carteles/j04.jpg", encuadre: "50% 40%", lema: "¡Vamos Iruña!" }
```

`encuadre` (qué parte de la foto se ve) y `lema` son opcionales. Sin cartel, la ficha se ve como antes.

### Actualizar las estadísticas de los jugadores
En `plantilla`, suma a cada jugador lo de Clupik: `pj` (partidos jugados), `goles`, `penMarcados`, `penFallados`, `penCometidos` y `rojas`.
Las manzanadas se calculan solas (roja = 3, penalti fallado = 2, penalti cometido = 1).
La cara de cada jugador está en `img/plantilla/<id>.svg`.

### Actualizar la clasificación
En `clasificacion`, copia la tabla oficial **en orden de posición** y pon la fecha en `actualizada: "2026-10-12"`.
Ids de los equipos: `iruna, sestao, lauro, cdb, lautada, np, askartza, larraina, leioa, urgara, donosti, urbatb`.

## Dónde está publicada
En **https://wpiruna.github.io** (GitHub Pages, repositorio `wpiruna/wpiruna.github.io`).

Para publicar un cambio: guardar, hacer commit y `git push`. GitHub la actualiza sola en uno o dos minutos.

Antes de publicar, cambia la versión `?v=...` de los tres enlaces de `index.html` (`styles.css`, `datos.js`, `app.js`), por ejemplo a la fecha del día. Así los móviles y la app instalada descargan los archivos nuevos en vez de usar los que tenían guardados.

La carpeta `Recursos/` son los originales: no hace falta publicarla.
