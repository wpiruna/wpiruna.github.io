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
    { id: "p01", fecha: "2026-10-10", hora: "15:00", local: "iruna",    visitante: "sestao",   resultado: null },
    { id: "p02", fecha: "2026-10-17", hora: null, local: "lauro",    visitante: "iruna",    resultado: null },
    { id: "p03", fecha: "2026-10-24", hora: null, local: "iruna",    visitante: "cdb",      resultado: null },
    { id: "p04", fecha: "2026-10-31", hora: null, local: "lautada",  visitante: "iruna",    resultado: null },
    { id: "p05", fecha: "2026-11-07", hora: null, local: "iruna",    visitante: "np",       resultado: null },
    { id: "p06", fecha: "2026-11-14", hora: null, local: "askartza", visitante: "iruna",    resultado: null },
    { id: "p07", fecha: "2026-11-21", hora: null, local: "iruna",    visitante: "larraina", resultado: null },
    { id: "p08", fecha: "2026-11-28", hora: null, local: "leioa",    visitante: "iruna",    resultado: null },
    { id: "p09", fecha: "2026-12-05", hora: null, local: "iruna",    visitante: "urgara",   resultado: null },
    { id: "p10", fecha: "2026-12-12", hora: null, local: "iruna",    visitante: "donosti",  resultado: null },
    { id: "p11", fecha: "2026-12-19", hora: null, local: "urbatb",   visitante: "iruna",    resultado: null },

    // ---------- 2ª VUELTA ----------
    { id: "p12", fecha: "2027-01-09", hora: null, franja: "Mañana", local: "cdb",    visitante: "iruna", resultado: null,
      nota: "Adelantado del 30 de enero. Doble jornada en Bizkaia: Bilbao por la mañana y Sestao por la tarde." },
    { id: "p13", fecha: "2027-01-09", hora: null, franja: "Tarde",  local: "sestao", visitante: "iruna", resultado: null,
      nota: "Adelantado del 16 de enero. Doble jornada en Bizkaia: Bilbao por la mañana y Sestao por la tarde." },
    { id: "p14", fecha: "2027-01-23", hora: null, local: "iruna",    visitante: "lauro",    resultado: null },
    { id: "p15", fecha: "2027-02-06", hora: null, local: "iruna",    visitante: "lautada",  resultado: null },
    { id: "p16", fecha: "2027-02-13", hora: null, local: "np",       visitante: "iruna",    resultado: null },
    { id: "p17", fecha: "2027-02-20", hora: null, local: "iruna",    visitante: "askartza", resultado: null },
    { id: "p18", fecha: "2027-02-27", hora: null, local: "larraina", visitante: "iruna",    resultado: null },
    { id: "p19", fecha: "2027-03-06", hora: null, local: "iruna",    visitante: "leioa",    resultado: null },
    { id: "p20", fecha: "2027-03-13", hora: null, local: "urgara",   visitante: "iruna",    resultado: null },
    { id: "p21", fecha: "2027-03-20", hora: null, local: "donosti",  visitante: "iruna",    resultado: null },
    { id: "p22", fecha: "2027-04-10", hora: null, local: "iruna",    visitante: "urbatb",   resultado: null }
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
