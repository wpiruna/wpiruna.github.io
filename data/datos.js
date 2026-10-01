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

  partidos: [
    // ---------- 1ª VUELTA ----------
    { id: "p01", fecha: "2026-10-10", hora: "15:00", local: "iruna",    visitante: "sestao",   piscina: "UPNA", resultado: null,
      cartel: { foto: "img/carteles/j01.jpg", encuadre: "45% 45%", lema: "¡A por ellos!" } },
    { id: "p02", fecha: "2026-10-18", hora: "15:00", local: "lauro",    visitante: "iruna",    resultado: null,
      cartel: { foto: "img/carteles/j02.jpg", encuadre: "35% 40%" } },
    { id: "p03", fecha: "2026-10-25", hora: "11:00", local: "iruna",    visitante: "cdb",      piscina: "UPNA", resultado: null,
      cartel: { foto: "img/carteles/j03-manzanos.jpg", encuadre: "50% 30%", lema: "No seáis manzanos\ny no os confiéis" } },
    { id: "p04", fecha: "2026-10-31", hora: null, local: "lautada",  visitante: "iruna",    resultado: null,
      cartel: { foto: "img/carteles/j04.jpg", encuadre: "15% 50%" } },
    { id: "p05", fecha: "2026-11-08", hora: "10:30", local: "iruna",    visitante: "np",       piscina: "UPNA", resultado: null,
      cartel: { foto: "img/carteles/j05.jpg", encuadre: "52% 30%" } },
    { id: "p06", fecha: "2026-10-18", hora: "10:30", local: "askartza", visitante: "iruna",    resultado: null,
      cartel: { foto: "img/carteles/j06.jpg", encuadre: "25% 50%" } },
    { id: "p07", fecha: "2026-11-22", hora: "11:00", local: "iruna",    visitante: "larraina", piscina: "UPNA", resultado: null },
    { id: "p08", fecha: "2026-11-28", hora: null, local: "leioa",    visitante: "iruna",    resultado: null },
    { id: "p09", fecha: "2026-12-06", hora: "11:00", local: "iruna",    visitante: "urgara",   piscina: "UPNA", resultado: null },
    { id: "p10", fecha: "2026-12-13", hora: "11:00", local: "iruna",    visitante: "donosti",  piscina: "UPNA", resultado: null },
    { id: "p11", fecha: "2026-12-19", hora: null, local: "urbatb",   visitante: "iruna",    resultado: null },

    // ---------- 2ª VUELTA ----------
    { id: "p12", fecha: "2027-01-09", hora: null, franja: "Mañana", local: "cdb",    visitante: "iruna", resultado: null,
      nota: "Adelantado del 30 de enero. Doble jornada en Bizkaia: Bilbao por la mañana y Sestao por la tarde." },
    { id: "p13", fecha: "2027-01-09", hora: null, franja: "Tarde",  local: "sestao", visitante: "iruna", resultado: null,
      nota: "Adelantado del 16 de enero. Doble jornada en Bizkaia: Bilbao por la mañana y Sestao por la tarde." },
    { id: "p14", fecha: "2027-01-24", hora: "11:00", local: "iruna",    visitante: "lauro",    piscina: "UPNA", resultado: null },
    { id: "p15", fecha: "2027-02-07", hora: "11:00", local: "iruna",    visitante: "lautada",  piscina: "UPNA", resultado: null },
    { id: "p16", fecha: "2027-02-13", hora: null, local: "np",       visitante: "iruna",    resultado: null },
    { id: "p17", fecha: "2027-02-21", hora: "11:00", local: "iruna",    visitante: "askartza", piscina: "UPNA", resultado: null },
    { id: "p18", fecha: "2027-02-27", hora: null, local: "larraina", visitante: "iruna",    resultado: null },
    { id: "p19", fecha: "2026-11-15", hora: "11:00", local: "iruna",    visitante: "leioa",    piscina: "UPNA", resultado: null },
    { id: "p20", fecha: "2027-03-13", hora: null, local: "urgara",   visitante: "iruna",    resultado: null },
    { id: "p21", fecha: "2027-03-20", hora: null, local: "donosti",  visitante: "iruna",    resultado: null },
    { id: "p22", fecha: "2027-04-11", hora: "11:00", local: "iruna",    visitante: "urbatb",   piscina: "UPNA", resultado: null }
  ],

  /*
   * JORNADAS — todos los partidos de la liga, copiados de Clupik (1ª vuelta leída el 30/09/2026).
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
    { n: 12, fecha: "2027-01-16", partidos: [{ id: "p13" }] },
    { n: 13, fecha: "2027-01-23", partidos: [
      { id: "p14" },
      { local: "donosti", visitante: "sestao",  lugar: "Altza Kiroldegia", fecha: "2026-10-17", hora: null, resultado: null }
    ] },
    { n: 14, fecha: "2027-01-30", partidos: [{ id: "p12" }] },
    { n: 15, fecha: "2027-02-06", partidos: [{ id: "p15" }] },
    { n: 16, fecha: "2027-02-13", partidos: [{ id: "p16" }] },
    { n: 17, fecha: "2027-02-20", partidos: [{ id: "p17" }] },
    { n: 18, fecha: "2027-02-27", partidos: [{ id: "p18" }] },
    { n: 19, fecha: "2027-03-06", partidos: [{ id: "p19" }] },
    { n: 20, fecha: "2027-03-13", partidos: [{ id: "p20" }] },
    { n: 21, fecha: "2027-03-20", partidos: [{ id: "p21" }] },
    { n: 22, fecha: "2027-04-10", partidos: [{ id: "p22" }] }
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
