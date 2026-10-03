/*
 * DATOS DE LA TEMPORADA 2026/27 — WP Iruña 9802 · 1ª Masculina
 * ---------------------------------------------------------------
 * Este es el ÚNICO archivo que hay que tocar para actualizar la web.
 * Lee LEEME.md para ver ejemplos.
 *
 * Partido:
 *   id          identificador único (no cambiar)
 *   fecha       "AAAA-MM-DD"
 *   hora        "HH:MM" o null si no se sabe
 *   franja      texto opcional si no hay hora exacta ("Mañana", "Tarde")
 *   local       id del equipo local (ver EQUIPOS)
 *   visitante   id del equipo visitante
 *   piscina     texto opcional con el lugar
 *   resultado   null si no se ha jugado, o { local: 12, visitante: 9 }
 *   parciales   opcional: [[3,2],[4,1],[2,3],[3,3]]  (local, visitante por cuarto)
 *   goleadores  opcional: [{ nombre: "Jon", goles: 3 }]
 *   stats       opcional: enlace a las estadísticas del partido
 *   cronica     opcional: { titulo: "...", texto: "párrafo 1\n\npárrafo 2" }
 *   nota        opcional: aviso que se muestra en la ficha
 *   cartel      opcional: cartel de la ficha con foto
 *               { foto: "img/carteles/j01.jpg", encuadre: "50% 40%", lema: "¡A llenar la grada!" }
 *               encuadre y lema son opcionales (lema por defecto según casa/fuera)
 *
 * Equipo: escudo = ruta a su logo (img/escudos/<id>.png). Sin escudo se muestran sus siglas.
 */

window.DATOS = {
  temporada: "2026/27",
  competicion: "1ª División Masculina",
  nosotros: "iruna",

  equipos: {
    iruna:     { nombre: "WP Iruña 9802",           corto: "Iruña",      sigla: "IRU" },
    sestao:    { nombre: "Sestao",                  corto: "Sestao",     sigla: "SES", escudo: "img/escudos/sestao.png" },
    lauro:     { nombre: "Lauro",                   corto: "Lauro",      sigla: "LAU", escudo: "img/escudos/lauro.png" },
    cdb:       { nombre: "Club Deportivo Bilbao",   corto: "C.D. Bilbao", sigla: "CDB", escudo: "img/escudos/cdb.png" },
    lautada:   { nombre: "Lautada",                 corto: "Lautada",    sigla: "LTD", escudo: "img/escudos/lautada.png" },
    np:        { nombre: "Náutica de Portugalete",  corto: "Portugalete", sigla: "NPO", escudo: "img/escudos/np.png" },
    askartza:  { nombre: "Askartza",                corto: "Askartza",   sigla: "ASK", escudo: "img/escudos/askartza.png" },
    larraina:  { nombre: "Larraina",                corto: "Larraina",   sigla: "LAR", escudo: "img/escudos/larraina.png" },
    leioa:     { nombre: "Leioa",                   corto: "Leioa",      sigla: "LEI", escudo: "img/escudos/leioa.png" },
    urgara:    { nombre: "Urgara",                  corto: "Urgara",     sigla: "URG", escudo: "img/escudos/urgara.png" },
    donosti:   { nombre: "Donosti",                 corto: "Donosti",    sigla: "DON", escudo: "img/escudos/donosti.png" },
    urbatb:    { nombre: "Urbat B",                 corto: "Urbat B",    sigla: "URB", escudo: "img/escudos/urbatb.png" }
  },

  /*
   * PISCINAS — destino del enlace a Google Maps ("Cómo llegar") de cada piscina.
   * La clave es el nombre tal cual aparece en `piscina` o en `lugar`.
   * Valor: coordenadas "lat,lng" (sacadas de Clupik) o una dirección de texto.
   */
  /*
   * PLANTILLA Y ESTADÍSTICAS — se copian de Clupik después de cada partido.
   *   pj partidos jugados · goles · penMarcados · penFallados · penCometidos
   *   rojas (tarjetas rojas)
   * Las manzanadas se calculan solas: roja = 3, penalti fallado = 2, penalti cometido = 1.
   * Cara de cada jugador: img/plantilla/<id>.svg (cabezones de los Iruña Toons).
   */
  plantilla: [
    { id: "larry",    apodo: "Larry",    dorsal:  1, portero: true, pj: 0, goles: 0, penMarcados: 0, penFallados: 0, penCometidos: 0, rojas: 0 },
    { id: "angel",    apodo: "Ángel",    dorsal:  2, pj: 0, goles: 0, penMarcados: 0, penFallados: 0, penCometidos: 0, rojas: 0 },
    { id: "beor",     apodo: "Beor",     dorsal:  3, pj: 0, goles: 0, penMarcados: 0, penFallados: 0, penCometidos: 0, rojas: 0 },
    { id: "juli2",    apodo: "Juli II",  dorsal:  4, pj: 0, goles: 0, penMarcados: 0, penFallados: 0, penCometidos: 0, rojas: 0 },
    { id: "aritz",    apodo: "Aritz",    dorsal:  5, pj: 0, goles: 0, penMarcados: 0, penFallados: 0, penCometidos: 0, rojas: 0 },
    { id: "iker",     apodo: "Iker",     dorsal:  6, pj: 0, goles: 0, penMarcados: 0, penFallados: 0, penCometidos: 0, rojas: 0 },
    { id: "tainta",   apodo: "Tainta",   dorsal:  7, pj: 0, goles: 0, penMarcados: 0, penFallados: 0, penCometidos: 0, rojas: 0 },
    { id: "iglesias", apodo: "Iglesias", dorsal:  8, pj: 0, goles: 0, penMarcados: 0, penFallados: 0, penCometidos: 0, rojas: 0 },
    { id: "eguilaz",  apodo: "Eguilaz",  dorsal:  9, pj: 0, goles: 0, penMarcados: 0, penFallados: 0, penCometidos: 0, rojas: 0 },
    { id: "julen",    apodo: "Julen",    dorsal: 10, pj: 0, goles: 0, penMarcados: 0, penFallados: 0, penCometidos: 0, rojas: 0 },
    { id: "reclu",    apodo: "Reclu",    dorsal: 11, pj: 0, goles: 0, penMarcados: 0, penFallados: 0, penCometidos: 0, rojas: 0 },
    { id: "rafa",     apodo: "Rafa",     dorsal: 12, pj: 0, goles: 0, penMarcados: 0, penFallados: 0, penCometidos: 0, rojas: 0 },
    { id: "juli1",    apodo: "Juli I",   dorsal: 13, pj: 0, goles: 0, penMarcados: 0, penFallados: 0, penCometidos: 0, rojas: 0 },
    { id: "bartu",    apodo: "Bartu",    dorsal: 14, pj: 0, goles: 0, penMarcados: 0, penFallados: 0, penCometidos: 0, rojas: 0 },
    { id: "labairu",  apodo: "Labairu",  dorsal: 15, pj: 0, goles: 0, penMarcados: 0, penFallados: 0, penCometidos: 0, rojas: 0 },
    { id: "borja",    apodo: "Borja",    dorsal: 16, pj: 0, goles: 0, penMarcados: 0, penFallados: 0, penCometidos: 0, rojas: 0 },
    { id: "murua",    apodo: "Murua",    dorsal: 17, pj: 0, goles: 0, penMarcados: 0, penFallados: 0, penCometidos: 0, rojas: 0 },
    { id: "txema",    apodo: "Txema",    dorsal: 18, pj: 0, goles: 0, penMarcados: 0, penFallados: 0, penCometidos: 0, rojas: 0 }
  ],

  piscinas: {
    "UPNA":                             "42.7967038,-1.6295517",
    "Behekosoloa Kiroldegia":           "Lauro Ikastola, Loiu",
    "Claret Askartza Kiroldegia":       "Polideportivo Claret Askartza, Sarriena Auzoa 173, Leioa",
    "Complejo Deportivo Mendizorrotza": "42.83164559999999,-2.7215201",
    "Sakoneta Kiroldegia":              "43.3247191,-2.9881035",
    "Orbea Kiroldegia":                 "43.1873424,-2.4630009",
    "Club Deportivo Bilbao":            "43.264712,-2.934510999999999",
    "Polideportivo Las Llanas":         "Polideportivo Las Llanas, Alameda las Llanas 12, Sestao",
    "P.M. Muelle de Txurruka":          "43.32620180000001,-3.0217049000000316",
    "C.D. Larraina":                    "42.81713389999999,-1.6551422",
    "Azken Portu Kiroldegia":           "43.34144320000001,-1.7763287999999875",
    "Altza Kiroldegia":                 "43.3184398,-1.9276579"
  },

  partidos: [
    // ---------- 1ª VUELTA ----------
    { id: "p01", fecha: "2026-10-10", hora: "15:00", local: "iruna",    visitante: "sestao",   piscina: "UPNA", resultado: null,
      cartel: { foto: "img/carteles/j01.jpg", encuadre: "45% 45%", lema: "¡A por ellos!" } },
    { id: "p02", fecha: "2026-10-18", hora: "15:00", local: "lauro",    visitante: "iruna",    piscina: "Behekosoloa Kiroldegia", resultado: null,
      cartel: { foto: "img/carteles/j02.jpg", encuadre: "35% 40%" } },
    { id: "p03", fecha: "2026-10-25", hora: "11:00", local: "iruna",    visitante: "cdb",      piscina: "UPNA", resultado: null,
      cartel: { foto: "img/carteles/j03-manzanos.jpg", encuadre: "50% 30%", lema: "No seáis manzanos\ny no os confiéis" } },
    { id: "p04", fecha: "2026-10-31", hora: null, local: "lautada",  visitante: "iruna",    piscina: "Complejo Deportivo Mendizorrotza", resultado: null,
      cartel: { foto: "img/carteles/j04.jpg", encuadre: "15% 50%" } },
    { id: "p05", fecha: "2026-11-08", hora: "10:30", local: "iruna",    visitante: "np",       piscina: "UPNA", resultado: null,
      cartel: { foto: "img/carteles/j05.jpg", encuadre: "52% 30%" } },
    { id: "p06", fecha: "2026-10-18", hora: "10:30", local: "askartza", visitante: "iruna",    piscina: "Claret Askartza Kiroldegia", resultado: null,
      cartel: { foto: "img/carteles/j06.jpg", encuadre: "25% 50%" } },
    { id: "p07", fecha: "2026-11-22", hora: "11:00", local: "iruna",    visitante: "larraina", piscina: "UPNA", resultado: null },
    { id: "p08", fecha: "2027-02-13", hora: "13:30", local: "leioa",    visitante: "iruna",    piscina: "Sakoneta Kiroldegia", resultado: null },
    { id: "p09", fecha: "2026-12-06", hora: "11:00", local: "iruna",    visitante: "urgara",   piscina: "UPNA", resultado: null },
    { id: "p10", fecha: "2026-12-13", hora: "11:00", local: "iruna",    visitante: "donosti",  piscina: "UPNA", resultado: null },
    { id: "p11", fecha: "2026-12-19", hora: null, local: "urbatb",   visitante: "iruna",    piscina: "Orbea Kiroldegia", resultado: null },

    // ---------- 2ª VUELTA ----------
    { id: "p12", fecha: "2027-01-09", hora: null, franja: "Mañana", local: "cdb",    visitante: "iruna", piscina: "Club Deportivo Bilbao", resultado: null,
      nota: "Adelantado del 30 de enero. Doble jornada en Bizkaia: Bilbao por la mañana y Sestao por la tarde." },
    { id: "p13", fecha: "2027-01-09", hora: null, franja: "Tarde",  local: "sestao", visitante: "iruna", piscina: "Polideportivo Las Llanas", resultado: null,
      nota: "Adelantado del 16 de enero. Doble jornada en Bizkaia: Bilbao por la mañana y Sestao por la tarde." },
    { id: "p14", fecha: "2027-01-24", hora: "11:00", local: "iruna",    visitante: "lauro",    piscina: "UPNA", resultado: null },
    { id: "p15", fecha: "2027-02-07", hora: "11:00", local: "iruna",    visitante: "lautada",  piscina: "UPNA", resultado: null },
    { id: "p16", fecha: "2027-02-13", hora: "18:00", local: "np",       visitante: "iruna",    piscina: "P.M. Muelle de Txurruka", resultado: null },
    { id: "p17", fecha: "2027-02-21", hora: "11:00", local: "iruna",    visitante: "askartza", piscina: "UPNA", resultado: null },
    { id: "p18", fecha: "2027-02-27", hora: null, local: "larraina", visitante: "iruna",    piscina: "C.D. Larraina", resultado: null },
    { id: "p19", fecha: "2026-11-14", hora: "15:45", local: "iruna",    visitante: "leioa",    piscina: "UPNA", resultado: null },
    { id: "p20", fecha: "2027-03-13", hora: null, local: "urgara",   visitante: "iruna",    piscina: "Azken Portu Kiroldegia", resultado: null },
    { id: "p21", fecha: "2027-03-20", hora: null, local: "donosti",  visitante: "iruna",    piscina: "Altza Kiroldegia", resultado: null },
    { id: "p22", fecha: "2027-04-11", hora: "11:00", local: "iruna",    visitante: "urbatb",   piscina: "UPNA", resultado: null }
  ],

  /*
   * JORNADAS — todos los partidos de la liga, copiados de Clupik (1ª vuelta leída el 30/09/2026, 2ª vuelta el 01/10/2026).
   * Cada jornada: n (número), fecha (la de la liga) y partidos.
   *   { id: "p05" }  → nuestro partido: se toma de la lista de arriba (no repetir datos).
   *   Otros partidos: { local, visitante, lugar, fecha, hora, resultado: { local: 10, visitante: 7 } }
   *   (fecha: solo si no es la de la jornada; lugar, hora y resultado pueden ir a null)
   */
  jornadas: [
    { n: 1, fecha: "2026-10-10", partidos: [
      { local: "leioa",   visitante: "lauro",   lugar: "Sakoneta Kiroldegia", hora: "13:25", resultado: null },
      { id: "p01" },
      { local: "askartza", visitante: "lautada", lugar: "Claret Askartza Kiroldegia", hora: "16:00", resultado: null },
      { local: "np",      visitante: "urgara",  lugar: "P.M. Muelle de Txurruka", hora: "17:00", resultado: null },
      { local: "donosti", visitante: "urbatb",  lugar: "Altza Kiroldegia", hora: "20:00", resultado: null },
      { local: "larraina", visitante: "cdb",     lugar: "C.D. Larraina", hora: null, resultado: null }
    ] },
    { n: 2, fecha: "2026-10-17", partidos: [
      { local: "cdb",     visitante: "leioa",   lugar: "Club Deportivo Bilbao", fecha: "2026-10-16", hora: "21:00", resultado: null },
      { id: "p02" },
      { local: "sestao",  visitante: "donosti", lugar: "Polideportivo Las Llanas", fecha: "2027-01-23", hora: null, resultado: null },
      { local: "urgara",  visitante: "urbatb",  lugar: "Azken Portu Kiroldegia", hora: null, resultado: null },
      { local: "np",      visitante: "askartza", lugar: "P.M. Muelle de Txurruka", hora: null, resultado: null },
      { local: "lautada", visitante: "larraina", lugar: "Complejo Deportivo Mendizorrotza", hora: null, resultado: null }
    ] },
    { n: 3, fecha: "2026-10-24", partidos: [
      { local: "urbatb",  visitante: "sestao",  lugar: "Orbea Kiroldegia", fecha: "2026-10-23", hora: "21:15", resultado: null },
      { id: "p03" },
      { local: "askartza", visitante: "urgara",  lugar: "Claret Askartza Kiroldegia", hora: null, resultado: null },
      { local: "larraina", visitante: "np",      lugar: "C.D. Larraina", hora: null, resultado: null },
      { local: "leioa",   visitante: "lautada", lugar: "Sakoneta Kiroldegia", hora: null, resultado: null },
      { local: "donosti", visitante: "lauro",   lugar: "Altza Kiroldegia", hora: null, resultado: null }
    ] },
    { n: 4, fecha: "2026-10-31", partidos: [
      { local: "urgara",  visitante: "sestao",  lugar: "Azken Portu Kiroldegia", hora: "16:15", resultado: null },
      { local: "askartza", visitante: "larraina", lugar: "Claret Askartza Kiroldegia", hora: null, resultado: null },
      { local: "cdb",     visitante: "donosti", lugar: "Club Deportivo Bilbao", hora: null, resultado: null },
      { local: "np",      visitante: "leioa",   lugar: "P.M. Muelle de Txurruka", hora: null, resultado: null },
      { local: "lauro",   visitante: "urbatb",  lugar: "Behekosoloa Kiroldegia", hora: null, resultado: null },
      { id: "p04" }
    ] },
    { n: 5, fecha: "2026-11-07", partidos: [
      { local: "sestao",  visitante: "lauro",   lugar: "Polideportivo Las Llanas", hora: "20:15", resultado: null },
      { id: "p05" },
      { local: "larraina", visitante: "urgara",  lugar: "C.D. Larraina", hora: null, resultado: null },
      { local: "leioa",   visitante: "askartza", lugar: "Sakoneta Kiroldegia", hora: null, resultado: null },
      { local: "urbatb",  visitante: "cdb",     lugar: "Orbea Kiroldegia", hora: null, resultado: null },
      { local: "donosti", visitante: "lautada", lugar: "Altza Kiroldegia", hora: null, resultado: null }
    ] },
    { n: 6, fecha: "2026-11-14", partidos: [
      { id: "p06" },
      { local: "cdb",     visitante: "sestao",  lugar: "Club Deportivo Bilbao", hora: null, resultado: null },
      { local: "larraina", visitante: "leioa",   lugar: "C.D. Larraina", hora: null, resultado: null },
      { local: "urgara",  visitante: "lauro",   lugar: "Azken Portu Kiroldegia", hora: null, resultado: null },
      { local: "np",      visitante: "donosti", lugar: "P.M. Muelle de Txurruka", hora: null, resultado: null },
      { local: "lautada", visitante: "urbatb",  lugar: "Complejo Deportivo Mendizorrotza", hora: null, resultado: null }
    ] },
    { n: 7, fecha: "2026-11-21", partidos: [
      { local: "sestao",  visitante: "lautada", lugar: "Polideportivo Las Llanas", hora: "20:15", resultado: null },
      { id: "p07" },
      { local: "lauro",   visitante: "cdb",     lugar: "Behekosoloa Kiroldegia", hora: null, resultado: null },
      { local: "leioa",   visitante: "urgara",  lugar: "Sakoneta Kiroldegia", hora: null, resultado: null },
      { local: "urbatb",  visitante: "np",      lugar: "Orbea Kiroldegia", hora: null, resultado: null },
      { local: "donosti", visitante: "askartza", lugar: "Altza Kiroldegia", hora: null, resultado: null }
    ] },
    { n: 8, fecha: "2026-11-28", partidos: [
      { local: "askartza", visitante: "urbatb",  lugar: "Claret Askartza Kiroldegia", hora: null, resultado: null },
      { local: "larraina", visitante: "donosti", lugar: "C.D. Larraina", hora: null, resultado: null },
      { local: "urgara",  visitante: "cdb",     lugar: "Azken Portu Kiroldegia", hora: null, resultado: null },
      { local: "np",      visitante: "sestao",  lugar: "P.M. Muelle de Txurruka", hora: null, resultado: null },
      { local: "lautada", visitante: "lauro",   lugar: "Complejo Deportivo Mendizorrotza", hora: null, resultado: null },
      { id: "p08" }
    ] },
    { n: 9, fecha: "2026-12-05", partidos: [
      { id: "p09" },
      { local: "sestao",  visitante: "askartza", lugar: "Polideportivo Las Llanas", fecha: "2027-01-10", hora: "12:00", resultado: null },
      { local: "cdb",     visitante: "lautada", lugar: "Club Deportivo Bilbao", hora: null, resultado: null },
      { local: "lauro",   visitante: "np",      lugar: "Behekosoloa Kiroldegia", hora: null, resultado: null },
      { local: "urbatb",  visitante: "larraina", lugar: "Orbea Kiroldegia", hora: null, resultado: null },
      { local: "donosti", visitante: "leioa",   lugar: "Altza Kiroldegia", hora: null, resultado: null }
    ] },
    { n: 10, fecha: "2026-12-12", partidos: [
      { id: "p10" },
      { local: "askartza", visitante: "lauro",   lugar: "Claret Askartza Kiroldegia", hora: null, resultado: null },
      { local: "larraina", visitante: "sestao",  lugar: "C.D. Larraina", hora: null, resultado: null },
      { local: "urgara",  visitante: "lautada", lugar: "Azken Portu Kiroldegia", hora: null, resultado: null },
      { local: "np",      visitante: "cdb",     lugar: "P.M. Muelle de Txurruka", hora: null, resultado: null },
      { local: "leioa",   visitante: "urbatb",  lugar: "Sakoneta Kiroldegia", hora: null, resultado: null }
    ] },
    { n: 11, fecha: "2026-12-19", partidos: [
      { local: "sestao",  visitante: "leioa",   lugar: "Polideportivo Las Llanas", hora: "20:15", resultado: null },
      { local: "cdb",     visitante: "askartza", lugar: "Club Deportivo Bilbao", hora: null, resultado: null },
      { local: "lauro",   visitante: "larraina", lugar: "Behekosoloa Kiroldegia", hora: null, resultado: null },
      { local: "lautada", visitante: "np",      lugar: "Complejo Deportivo Mendizorrotza", hora: null, resultado: null },
      { id: "p11" },
      { local: "donosti", visitante: "urgara",  lugar: "Altza Kiroldegia", hora: null, resultado: null }
    ] },
    { n: 12, fecha: "2027-01-16", partidos: [
      { id: "p13" },
      { local: "cdb",     visitante: "larraina", lugar: "Club Deportivo Bilbao", hora: null, resultado: null },
      { local: "urgara",  visitante: "np",      lugar: "Azken Portu Kiroldegia", hora: null, resultado: null },
      { local: "lauro",   visitante: "leioa",   lugar: "Behekosoloa Kiroldegia", hora: null, resultado: null },
      { local: "lautada", visitante: "askartza", lugar: "Complejo Deportivo Mendizorrotza", hora: null, resultado: null },
      { local: "urbatb",  visitante: "donosti", lugar: "Orbea Kiroldegia", hora: null, resultado: null }
    ] },
    { n: 13, fecha: "2027-01-23", partidos: [
      { local: "donosti", visitante: "sestao",  lugar: "Altza Kiroldegia", fecha: "2026-10-17", hora: null, resultado: null },
      { local: "askartza", visitante: "np",      lugar: "Claret Askartza Kiroldegia", hora: null, resultado: null },
      { local: "larraina", visitante: "lautada", lugar: "C.D. Larraina", hora: null, resultado: null },
      { local: "leioa",   visitante: "cdb",     lugar: "Sakoneta Kiroldegia", hora: null, resultado: null },
      { local: "urbatb",  visitante: "urgara",  lugar: "Orbea Kiroldegia", hora: null, resultado: null },
      { id: "p14" }
    ] },
    { n: 14, fecha: "2027-01-30", partidos: [
      { id: "p12" },
      { local: "urgara",  visitante: "askartza", lugar: "Azken Portu Kiroldegia", hora: null, resultado: null },
      { local: "sestao",  visitante: "urbatb",  lugar: "Polideportivo Las Llanas", hora: null, resultado: null },
      { local: "np",      visitante: "larraina", lugar: "P.M. Muelle de Txurruka", hora: null, resultado: null },
      { local: "lauro",   visitante: "donosti", lugar: "Behekosoloa Kiroldegia", hora: null, resultado: null },
      { local: "lautada", visitante: "leioa",   lugar: "Complejo Deportivo Mendizorrotza", hora: null, resultado: null }
    ] },
    { n: 15, fecha: "2027-02-06", partidos: [
      { local: "larraina", visitante: "askartza", lugar: "C.D. Larraina", hora: null, resultado: null },
      { local: "sestao",  visitante: "urgara",  lugar: "Polideportivo Las Llanas", hora: null, resultado: null },
      { local: "leioa",   visitante: "np",      lugar: "Sakoneta Kiroldegia", hora: null, resultado: null },
      { local: "urbatb",  visitante: "lauro",   lugar: "Orbea Kiroldegia", hora: null, resultado: null },
      { local: "donosti", visitante: "cdb",     lugar: "Altza Kiroldegia", hora: null, resultado: null },
      { id: "p15" }
    ] },
    { n: 16, fecha: "2027-02-13", partidos: [
      { local: "askartza", visitante: "leioa",   lugar: "Claret Askartza Kiroldegia", hora: null, resultado: null },
      { local: "cdb",     visitante: "urbatb",  lugar: "Club Deportivo Bilbao", hora: null, resultado: null },
      { local: "urgara",  visitante: "larraina", lugar: "Azken Portu Kiroldegia", hora: null, resultado: null },
      { id: "p16" },
      { local: "lauro",   visitante: "sestao",  lugar: "Behekosoloa Kiroldegia", hora: null, resultado: null },
      { local: "lautada", visitante: "donosti", lugar: "Complejo Deportivo Mendizorrotza", hora: null, resultado: null }
    ] },
    { n: 17, fecha: "2027-02-20", partidos: [
      { local: "sestao",  visitante: "cdb",     lugar: "Polideportivo Las Llanas", hora: null, resultado: null },
      { local: "lauro",   visitante: "urgara",  lugar: "Behekosoloa Kiroldegia", hora: null, resultado: null },
      { local: "leioa",   visitante: "larraina", lugar: "Sakoneta Kiroldegia", hora: null, resultado: null },
      { local: "urbatb",  visitante: "lautada", lugar: "Orbea Kiroldegia", hora: null, resultado: null },
      { local: "donosti", visitante: "np",      lugar: "Altza Kiroldegia", hora: null, resultado: null },
      { id: "p17" }
    ] },
    { n: 18, fecha: "2027-02-27", partidos: [
      { local: "askartza", visitante: "donosti", lugar: "Claret Askartza Kiroldegia", hora: null, resultado: null },
      { local: "cdb",     visitante: "lauro",   lugar: "Club Deportivo Bilbao", hora: null, resultado: null },
      { id: "p18" },
      { local: "urgara",  visitante: "leioa",   lugar: "Azken Portu Kiroldegia", hora: null, resultado: null },
      { local: "np",      visitante: "urbatb",  lugar: "P.M. Muelle de Txurruka", hora: null, resultado: null },
      { local: "lautada", visitante: "sestao",  lugar: "Complejo Deportivo Mendizorrotza", hora: null, resultado: null }
    ] },
    { n: 19, fecha: "2027-03-06", partidos: [
      { local: "cdb",     visitante: "urgara",  lugar: "Club Deportivo Bilbao", hora: null, resultado: null },
      { local: "sestao",  visitante: "np",      lugar: "Polideportivo Las Llanas", hora: null, resultado: null },
      { local: "lauro",   visitante: "lautada", lugar: "Behekosoloa Kiroldegia", hora: null, resultado: null },
      { local: "urbatb",  visitante: "askartza", lugar: "Orbea Kiroldegia", hora: null, resultado: null },
      { local: "donosti", visitante: "larraina", lugar: "Altza Kiroldegia", hora: null, resultado: null },
      { id: "p19" }
    ] },
    { n: 20, fecha: "2027-03-13", partidos: [
      { local: "askartza", visitante: "sestao",  lugar: "Claret Askartza Kiroldegia", hora: null, resultado: null },
      { local: "larraina", visitante: "urbatb",  lugar: "C.D. Larraina", hora: null, resultado: null },
      { id: "p20" },
      { local: "np",      visitante: "lauro",   lugar: "P.M. Muelle de Txurruka", hora: null, resultado: null },
      { local: "lautada", visitante: "cdb",     lugar: "Complejo Deportivo Mendizorrotza", hora: null, resultado: null },
      { local: "leioa",   visitante: "donosti", lugar: "Sakoneta Kiroldegia", hora: null, resultado: null }
    ] },
    { n: 21, fecha: "2027-03-20", partidos: [
      { local: "cdb",     visitante: "np",      lugar: "Club Deportivo Bilbao", hora: null, resultado: null },
      { local: "sestao",  visitante: "larraina", lugar: "Polideportivo Las Llanas", hora: null, resultado: null },
      { local: "lauro",   visitante: "askartza", lugar: "Behekosoloa Kiroldegia", hora: null, resultado: null },
      { local: "lautada", visitante: "urgara",  lugar: "Complejo Deportivo Mendizorrotza", hora: null, resultado: null },
      { local: "urbatb",  visitante: "leioa",   lugar: "Orbea Kiroldegia", hora: null, resultado: null },
      { id: "p21" }
    ] },
    { n: 22, fecha: "2027-04-10", partidos: [
      { local: "askartza", visitante: "cdb",     lugar: "Claret Askartza Kiroldegia", hora: null, resultado: null },
      { local: "larraina", visitante: "lauro",   lugar: "C.D. Larraina", hora: null, resultado: null },
      { local: "urgara",  visitante: "donosti", lugar: "Azken Portu Kiroldegia", hora: null, resultado: null },
      { local: "np",      visitante: "lautada", lugar: "P.M. Muelle de Txurruka", hora: null, resultado: null },
      { local: "leioa",   visitante: "sestao",  lugar: "Sakoneta Kiroldegia", hora: null, resultado: null },
      { id: "p22" }
    ] }
  ],

  /*
   * CLASIFICACIÓN — se copia a mano de la tabla oficial.
   * Ordena las filas por posición. pj, g, e, p, gf, gc, pts.
   */
  clasificacion: {
    actualizada: null, // p. ej. "2026-10-12"
    filas: [
      { equipo: "iruna",    pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 },
      { equipo: "askartza", pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 },
      { equipo: "cdb",      pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 },
      { equipo: "donosti",  pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 },
      { equipo: "larraina", pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 },
      { equipo: "lauro",    pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 },
      { equipo: "lautada",  pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 },
      { equipo: "leioa",    pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 },
      { equipo: "np",       pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 },
      { equipo: "sestao",   pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 },
      { equipo: "urbatb",   pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 },
      { equipo: "urgara",   pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }
    ]
  }
};
