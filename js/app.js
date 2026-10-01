/* WP Iruña 9802 · Masculino — lógica de la web (sin dependencias) */
(function () {
  "use strict";

  const D = window.DATOS;
  const T = D.equipos;
  const US = D.nosotros;
  const ARTIFACT = !!window.MODO_ARTIFACT;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));

  // Permite simular otra fecha para pruebas: index.html?hoy=2026-11-20
  const hoyParam = new URLSearchParams(location.search).get("hoy");
  const now = () => (hoyParam ? new Date(hoyParam + "T10:00:00") : new Date());

  const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  const DIAS_CORTOS = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
  const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

  /* ---------- Utilidades ---------- */
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const ymd = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const parseDay = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

  function crest(id) {
    if (id === US) return `<span class="crest us"><img src="img/logo.png" alt=""></span>`;
    if (T[id].escudo) return `<span class="crest has-img"><img src="${esc(T[id].escudo)}" alt=""></span>`;
    return `<span class="crest" aria-hidden="true">${esc(T[id].sigla)}</span>`;
  }

  /* ---------- Modelo de partidos ---------- */
  const partidos = D.partidos.map((p, i) => {
    const day = parseDay(p.fecha);
    let hasTime = false;
    const dt = new Date(day);
    if (p.hora) {
      const [h, m] = p.hora.split(":").map(Number);
      dt.setHours(h, m);
      hasTime = true;
    } else if (p.franja === "Mañana") dt.setHours(11, 0);
    else if (p.franja === "Tarde") dt.setHours(17, 0);
    else dt.setHours(12, 0);
    const home = p.local === US;
    const rival = home ? p.visitante : p.local;
    const played = !!(p.resultado && p.resultado.local != null && p.resultado.visitante != null);
    let ours = null, theirs = null, outcome = null;
    if (played) {
      ours = home ? p.resultado.local : p.resultado.visitante;
      theirs = home ? p.resultado.visitante : p.resultado.local;
      outcome = ours > theirs ? "W" : ours < theirs ? "L" : "D";
    }
    const num = Number(String(p.id).replace(/\D/g, "")) || i + 1;
    return { ...p, day, dt, hasTime, home, rival, played, ours, theirs, outcome, vuelta: num <= 11 ? 1 : 2 };
  }).sort((a, b) => a.dt - b.dt);

  const byId = Object.fromEntries(partidos.map((p) => [p.id, p]));
  // Jornada de liga de cada uno de nuestros partidos (según D.jornadas)
  const JORNADA = {};
  (D.jornadas || []).forEach((j) => j.partidos.forEach((m) => { if (m.id) JORNADA[m.id] = j.n; }));
  const OUT_TXT = { W: "Victoria", D: "Empate", L: "Derrota" };
  const OUT_CHIP = { W: "chip-win", D: "chip-draw", L: "chip-loss" };
  const OUT_LETTER = { W: "V", D: "E", L: "D" };

  function nextMatch() {
    const today = startOfDay(now());
    return partidos.find((p) => !p.played && p.day >= today) || null;
  }
  function lastPlayed() {
    const pl = partidos.filter((p) => p.played);
    return pl[pl.length - 1] || null;
  }
  function seasonStats() {
    const s = { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 };
    partidos.filter((p) => p.played).forEach((p) => {
      s.pj++; s.gf += p.ours; s.gc += p.theirs;
      if (p.outcome === "W") { s.g++; s.pts += 3; } else if (p.outcome === "D") { s.e++; s.pts += 1; } else s.p++;
    });
    return s;
  }

  function whenText(p, long = true) {
    const d = p.day;
    const base = long
      ? `${cap(DIAS[d.getDay()])} ${d.getDate()} de ${MESES[d.getMonth()]}`
      : `${d.getDate()} ${MESES[d.getMonth()].slice(0, 3)}`;
    return base;
  }
  function timeText(p) {
    if (p.hora) return `${p.hora} h`;
    if (p.franja) return `Por la ${p.franja.toLowerCase()}`;
    return "Hora por confirmar";
  }
  const haChip = (p) => (p.home ? `<span class="chip chip-home">Casa</span>` : `<span class="chip chip-away">Fuera</span>`);
  const scoreLV = (p) => `${p.resultado.local}<span class="sep">–</span>${p.resultado.visitante}`;

  /* ---------- Componentes ---------- */
  function matchRow(p, opts = {}) {
    const next = nextMatch();
    const isNext = next && next.id === p.id;
    const past = p.day < startOfDay(now());
    let side;
    if (p.played) {
      side = `<span class="mini-score">${p.ours}–${p.theirs}</span><span class="chip ${OUT_CHIP[p.outcome]}">${OUT_TXT[p.outcome]}</span>`;
    } else if (isNext) {
      side = `<span class="chip chip-home">Próximo</span>`;
    } else if (past) {
      side = `<span class="muted" style="font-size:.78rem">Pendiente</span>`;
    } else {
      const days = Math.round((p.day - startOfDay(now())) / 864e5);
      side = `<span class="muted" style="font-size:.78rem">en ${days} días</span>`;
    }
    return `
      <button type="button" class="match-row${isNext ? " is-next" : ""}${past ? " is-past" : ""}${p.played ? " has-result" : ""}" data-match="${p.id}">
        <span class="date-box${p.home ? " home" : ""}"><b>${p.day.getDate()}</b><span>${opts.showMonth ? MESES[p.day.getMonth()].slice(0, 3) : DIAS_CORTOS[p.day.getDay()]}</span></span>
        <span class="match-main">
          <span class="rival">${crest(p.rival)}<span>${p.home ? "vs" : "en"} ${esc(T[p.rival].nombre)}</span></span>
          <span class="meta">${haChip(p)}<span>${cap(DIAS[p.day.getDay()])}${p.hora || p.franja ? " · " + timeText(p) : ""}</span></span>
        </span>
        <span class="match-side">${side}</span>
      </button>`;
  }

  /* ---------- INICIO ---------- */
  let cdTimer = null;
  function renderHome() {
    const n = nextMatch();
    const box = $("#nextMatch");
    clearInterval(cdTimer);
    const cd = $("#countdown");
    if (!n) {
      const s = seasonStats();
      $("#nextLabel").textContent = "Temporada terminada";
      box.innerHTML = `
        <div class="board">
          <p class="board-end">¡Gracias por otra temporada, equipo!<br>${s.pj} partidos, ${s.g} victorias y ${s.gf} goles.</p>
          <div class="board-foot"><a class="btn" href="#resultados">Ver resultados</a></div>
        </div>`;
      cd.hidden = true;
    } else {
      const L = n.local, V = n.visitante;
      const idx = partidos.indexOf(n) + 1;
      $("#nextLabel").textContent = `Próximo partido · ${idx} de ${partidos.length}`;
      box.innerHTML = `
        <button type="button" class="board" data-match="${n.id}" aria-label="Ver ficha del próximo partido">
          <span class="board-teams">
            <span class="board-team"><small>Local</small>${crest(L)}<b>${esc(T[L].corto)}</b></span>
            <span class="board-score" aria-hidden="true"><span>–</span><i>:</i><span>–</span></span>
            <span class="board-team"><small>Visitante</small>${crest(V)}<b>${esc(T[V].corto)}</b></span>
          </span>
          <span class="board-foot">
            <span>${DIAS_CORTOS[n.day.getDay()].toUpperCase()} ${n.day.getDate()}·${n.day.getMonth() + 1} · ${esc(timeText(n)).toUpperCase()}${n.piscina ? " · " + esc(n.piscina).toUpperCase() : ""}</span>
            ${haChip(n)}
          </span>
        </button>`;
      cd.hidden = false;
      const tick = () => {
        const today = startOfDay(now());
        const daysLeft = Math.round((n.day - today) / 864e5);
        if (daysLeft === 0) {
          cd.innerHTML = `<b class="cd-num">HOY</b><span class="cd-txt"><strong>Día de partido</strong><small>${esc(timeText(n))}</small></span>`;
          return;
        }
        if (!n.hasTime) {
          cd.innerHTML = `<b class="cd-num">${daysLeft}</b><span class="cd-txt"><strong>${daysLeft === 1 ? "Día" : "Días"}</strong><small>para el partido</small></span>`;
          return;
        }
        let ms = Math.max(0, n.dt - now());
        const d = Math.floor(ms / 864e5); ms -= d * 864e5;
        const h = Math.floor(ms / 36e5); ms -= h * 36e5;
        const m = Math.floor(ms / 6e4); ms -= m * 6e4;
        const sec = Math.floor(ms / 1e3);
        const pad = (x) => String(x).padStart(2, "0");
        cd.innerHTML = `<span class="cd-segs">
          <span><b class="cd-num">${pad(d)}</b><small>días</small></span><i>:</i>
          <span><b class="cd-num">${pad(h)}</b><small>horas</small></span><i>:</i>
          <span><b class="cd-num">${pad(m)}</b><small>min</small></span><i>:</i>
          <span><b class="cd-num">${pad(sec)}</b><small>seg</small></span></span>`;
      };
      tick();
      cdTimer = setInterval(tick, n.hasTime ? 1000 : 30000);
    }

    // Barra de temporada: un segmento por partido
    const segs = partidos.map((p) => {
      const cls = p.played ? p.outcome : n && p.id === n.id ? "next" : "";
      const tip = `${whenText(p, false)} · ${T[p.rival].corto}${p.played ? ` ${p.ours}-${p.theirs}` : ""}`;
      return `<i class="${cls}" title="${esc(tip)}"></i>`;
    }).join("");
    const s0 = seasonStats();
    $("#seasonBar").innerHTML = `
      <div class="season-bar-top"><span>Temporada</span><span>${s0.pj} / ${partidos.length} jugados</span></div>
      <div class="season-segs">${segs}</div>`;

    // Último resultado
    const last = lastPlayed();
    $("#lastResult").innerHTML = last ? resultBlock(last) : `
      <p class="empty">Aún no hemos jugado ningún partido.<br>Arrancamos el <b>${whenText(partidos[0]).toLowerCase()}</b> ${partidos[0].home ? "en casa" : "fuera"} contra <b>${esc(T[partidos[0].rival].nombre)}</b>.</p>`;

    // Estadísticas
    $("#seasonStats").innerHTML = statsBlock();

    // Próximos
    const today = startOfDay(now());
    const up = partidos.filter((p) => !p.played && p.day >= today && (!n || p.id !== n.id)).slice(0, 3);
    $("#upcoming").innerHTML = up.length ? up.map((p) => matchRow(p, { showMonth: true })).join("") : `<p class="empty">No quedan partidos por jugar.</p>`;

  }

  function resultBlock(p) {
    return `
      <div class="score-row" data-match="${p.id}" role="button" tabindex="0" aria-label="Ver ficha del partido">
        <div class="score-team">${crest(p.local)}<span>${esc(T[p.local].corto)}</span></div>
        <div class="score-num">${scoreLV(p)}</div>
        <div class="score-team">${crest(p.visitante)}<span>${esc(T[p.visitante].corto)}</span></div>
      </div>
      <div class="score-meta">
        <span class="chip ${OUT_CHIP[p.outcome]}">${OUT_TXT[p.outcome]}</span>
        <span>${whenText(p, false)}</span>
        ${p.cronica ? `<span>· <a href="#partido-${p.id}">Leer crónica</a></span>` : ""}
      </div>`;
  }

  function formBlock() {
    const last5 = partidos.filter((p) => p.played).slice(-5);
    const cells = last5.map((p) => `<i class="${p.outcome}" title="${OUT_TXT[p.outcome]} ${p.ours}-${p.theirs} vs ${esc(T[p.rival].corto)}">${OUT_LETTER[p.outcome]}</i>`);
    while (cells.length < 5) cells.push(`<i class="N">·</i>`);
    return `<div class="form"><span>Racha</span>${cells.join("")}</div>`;
  }

  function statsBlock() {
    const s = seasonStats();
    return `
      <div class="stat-grid">
        <div class="stat"><b>${s.pj}</b><span>Jugados</span></div>
        <div class="stat w"><b>${s.g}</b><span>Ganados</span></div>
        <div class="stat d"><b>${s.e}</b><span>Empates</span></div>
        <div class="stat l"><b>${s.p}</b><span>Perdidos</span></div>
      </div>
      <div class="stat-grid stat-grid-3">
        <div class="stat"><b>${s.gf}</b><span>A favor</span></div>
        <div class="stat"><b>${s.gc}</b><span>En contra</span></div>
        <div class="stat"><b>${s.gf - s.gc > 0 ? "+" : ""}${s.gf - s.gc}</b><span>Diferencia</span></div>
      </div>
      ${formBlock()}`;
  }


  /* ---------- CALENDARIO ---------- */
  const first = partidos[0].day, lastM = partidos[partidos.length - 1].day;
  const minMonth = new Date(first.getFullYear(), first.getMonth(), 1);
  const maxMonth = new Date(lastM.getFullYear(), lastM.getMonth(), 1);
  let calCursor = (() => {
    const ref = nextMatch() || lastPlayed() || partidos[0];
    const t = now();
    const cur = new Date(t.getFullYear(), t.getMonth(), 1);
    // Mes actual si está dentro de la temporada; si no, el del próximo partido
    if (cur >= minMonth && cur <= maxMonth && partidos.some((p) => p.day.getMonth() === cur.getMonth() && p.day.getFullYear() === cur.getFullYear() && p.day >= startOfDay(t))) return cur;
    return new Date(ref.day.getFullYear(), ref.day.getMonth(), 1);
  })();
  let calMode = "mes";

  function renderCalendar() {
    const y = calCursor.getFullYear(), m = calCursor.getMonth();
    const monthMatches = partidos.filter((p) => p.day.getFullYear() === y && p.day.getMonth() === m);
    $("#calLabel").innerHTML = `${MESES[m]} ${y}<small>${monthMatches.length ? monthMatches.length + (monthMatches.length === 1 ? " partido" : " partidos") : "Sin partidos"}</small>`;
    $("#calPrev").disabled = calCursor <= minMonth;
    $("#calNext").disabled = calCursor >= maxMonth;

    const firstDay = new Date(y, m, 1);
    const offset = (firstDay.getDay() + 6) % 7; // lunes = 0
    const start = new Date(y, m, 1 - offset);
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const cells = Math.ceil((offset + daysInMonth) / 7) * 7;
    const todayS = ymd(now());
    const today0 = startOfDay(now());
    const next = nextMatch();

    let html = "";
    for (let i = 0; i < cells; i++) {
      const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
      const inMonth = d.getMonth() === m;
      const key = ymd(d);
      const ms = inMonth ? partidos.filter((p) => p.fecha === key) : [];
      const cls = ["cal-cell"];
      if (!inMonth) cls.push("out");
      if (d.getDay() === 0 || d.getDay() === 6) cls.push("weekend");
      if (key === todayS) cls.push("today");
      if (d < today0) cls.push("past");
      if (ms.length) cls.push("has-match");
      if (next && ms.some((p) => p.id === next.id)) cls.push("is-next");
      const label = `${d.getDate()} de ${MESES[d.getMonth()]}`;
      html += `<div class="${cls.join(" ")}"${inMonth ? "" : ' aria-hidden="true"'}>
        <span class="d">${d.getDate()}</span>
        ${ms.map((p) => `
          <button type="button" class="cal-match ${p.home ? "home" : "away"}${p.played ? " " + { W: "win", D: "draw", L: "loss" }[p.outcome] : ""}" data-match="${p.id}"
            aria-label="${label}: ${esc(T[p.local].nombre)} contra ${esc(T[p.visitante].nombre)}${p.played ? ", " + p.resultado.local + " a " + p.resultado.visitante : ""}">
            ${crest(p.rival)}
            ${p.played ? `<span class="res">${p.ours}-${p.theirs}</span>` : `<span class="ha">${p.franja ? p.franja.slice(0, 3) + "." : p.home ? "Casa" : "Fuera"}</span>`}
          </button>`).join("")}
      </div>`;
    }
    $("#calGrid").innerHTML = html;

    $("#calMonthListTitle").textContent = `Partidos de ${MESES[m]}`;
    $("#calMonthList").innerHTML = monthMatches.length
      ? monthMatches.map((p) => matchRow(p)).join("")
      : `<p class="empty">Este mes no hay partidos. ${next ? `El siguiente es el <b>${whenText(next).toLowerCase()}</b> contra ${esc(T[next.rival].nombre)}.` : ""}</p>`;
  }

  function renderSeasonList() {
    let html = "";
    [1, 2].forEach((v) => {
      html += `<div class="vuelta-sep">${v}ª vuelta</div>`;
      const ps = partidos.filter((p) => p.vuelta === v);
      const months = [];
      ps.forEach((p) => {
        const k = `${p.day.getFullYear()}-${p.day.getMonth()}`;
        let g = months.find((x) => x.k === k);
        if (!g) months.push((g = { k, y: p.day.getFullYear(), m: p.day.getMonth(), ps: [] }));
        g.ps.push(p);
      });
      months.forEach((g) => {
        html += `<div class="month-group"><h3>${MESES[g.m]} ${g.y}<small>${g.ps.length} ${g.ps.length === 1 ? "partido" : "partidos"}</small></h3>
          <div class="match-list">${g.ps.map((p) => matchRow(p)).join("")}</div></div>`;
      });
    });
    $("#calList").innerHTML = html;
  }

  function setCalMode(mode) {
    calMode = mode;
    $$("[data-calmode]").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.calmode === mode)));
    $("#calMonth").hidden = mode !== "mes";
    $("#calList").hidden = mode !== "lista";
    if (mode === "lista") renderSeasonList(); else renderCalendar();
    try { localStorage.setItem("calMode", mode); } catch (e) { /* sin almacenamiento */ }
  }

  /* ---------- RESULTADOS ---------- */
  function renderResults() {
    const played = partidos.filter((p) => p.played).reverse();
    $("#resultsSummary").innerHTML = `<div class="card">${statsBlock()}</div>`;
    if (!played.length) {
      const n = nextMatch();
      $("#resultsList").innerHTML = `<div class="card"><p class="empty">Todavía no hay resultados. ${n ? `El primero llegará el <b>${whenText(n).toLowerCase()}</b> contra <b>${esc(T[n.rival].nombre)}</b>.` : ""}</p></div>`;
      return;
    }
    $("#resultsList").innerHTML = played.map((p) => `
      <article class="card result-card ${p.outcome}" data-match="${p.id}" tabindex="0" role="button" aria-label="Ver ficha: ${esc(T[p.local].nombre)} ${p.resultado.local} - ${p.resultado.visitante} ${esc(T[p.visitante].nombre)}">
        <div class="rc-top"><span>${whenText(p)} · ${JORNADA[p.id] ? `Jornada ${JORNADA[p.id]}` : `${p.vuelta}ª vuelta`}</span>${haChip(p)}</div>
        <div class="rc-body">
          <div class="score-row">
            <div class="score-team">${crest(p.local)}<span>${esc(T[p.local].corto)}</span></div>
            <div class="score-num">${scoreLV(p)}</div>
            <div class="score-team">${crest(p.visitante)}<span>${esc(T[p.visitante].corto)}</span></div>
          </div>
          ${p.cronica ? `<p class="cronica-teaser"><b>${esc(p.cronica.titulo || "Crónica")}.</b> ${esc((p.cronica.texto || "").split(/\n\s*\n/)[0])}</p>` : ""}
        </div>
        <div class="rc-foot">
          <span class="chip ${OUT_CHIP[p.outcome]}">${OUT_TXT[p.outcome]}</span>
          ${p.cronica ? `<span class="chip chip-home">Crónica</span>` : ""}
          ${p.stats ? `<span class="chip chip-away">Estadísticas</span>` : ""}
        </div>
      </article>`).join("");
  }

  /* ---------- JORNADAS ---------- */
  const PARTIDOS_POR_JORNADA = Object.keys(T).length / 2;
  function jornadaMatch(j, m) {
    const ours = m.id ? byId[m.id] : null;
    if (m.id && !ours) return "";
    const L = ours ? ours.local : m.local, V = ours ? ours.visitante : m.visitante;
    if (!T[L] || !T[V]) return "";
    const res = ours ? (ours.played ? ours.resultado : null) : (m.resultado && m.resultado.local != null && m.resultado.visitante != null ? m.resultado : null);
    const day = ours ? ours.day : parseDay(m.fecha || j.fecha);
    const hora = ours ? (ours.hora ? `${ours.hora} h` : ours.franja ? ours.franja : "") : (m.hora ? `${m.hora} h` : "");
    const lugar = ours ? ours.piscina : m.lugar;
    const moved = ours && ours.fecha !== j.fecha;
    let side;
    if (res) {
      const wl = res.local > res.visitante, wv = res.visitante > res.local;
      side = `<span class="jm-score"><b class="${wl ? "win" : ""}">${res.local}</b><b class="${wv ? "win" : ""}">${res.visitante}</b></span>`;
    } else {
      side = `<span class="jm-info">${lugar ? `<span class="jm-place">${esc(lugar)}</span>` : ""}${ymd(day) !== j.fecha ? `<span>${DIAS_CORTOS[day.getDay()]} ${day.getDate()} ${MESES[day.getMonth()].slice(0, 3)}</span>` : ""}${hora ? `<span class="jm-time">${esc(hora)}</span>` : ""}</span>`;
    }
    const teams = `<span class="jm-teams">
        <span class="jm-team">${crest(L)}<span>${esc(T[L].nombre)}</span></span>
        <span class="jm-team">${crest(V)}<span>${esc(T[V].nombre)}</span></span>
        ${moved ? `<span class="jm-moved">Se juega el ${DIAS[day.getDay()]} ${day.getDate()} de ${MESES[day.getMonth()]}</span>` : ""}
      </span>`;
    return ours
      ? `<button type="button" class="jm us" data-match="${ours.id}" aria-label="Ver ficha: ${esc(T[L].nombre)} contra ${esc(T[V].nombre)}">${teams}${side}</button>`
      : `<div class="jm">${teams}${side}</div>`;
  }

  function renderJornadas() {
    const today = startOfDay(now());
    const js = D.jornadas || [];
    // La jornada "actual": la primera cuya fecha (o la de nuestro partido) no ha pasado
    let cur = js.findIndex((j) => {
      const ours = j.partidos.map((m) => m.id && byId[m.id]).filter(Boolean);
      return parseDay(j.fecha) >= today || ours.some((p) => !p.played && p.day >= today);
    });
    if (cur === -1) cur = js.length - 1;
    let html = "";
    js.forEach((j, i) => {
      if (i === 0 || (js[i - 1].n <= 11 && j.n > 11)) html += `<div class="vuelta-sep">${j.n <= 11 ? 1 : 2}ª vuelta</div>`;
      const d = parseDay(j.fecha);
      const ours = j.partidos.map((m) => m.id && byId[m.id]).find(Boolean);
      let chip = "";
      if (i === cur) chip = `<span class="chip chip-home">Próxima</span>`;
      else if (ours && ours.played) chip = `<span class="chip ${OUT_CHIP[ours.outcome]}">${OUT_LETTER[ours.outcome]} ${ours.ours}–${ours.theirs}</span>`;
      const rows = j.partidos.map((m) => jornadaMatch(j, m)).join("");
      const missing = j.partidos.length < PARTIDOS_POR_JORNADA;
      html += `
        <details class="jornada"${i === cur ? " open" : ""}>
          <summary>
            <span class="j-num">Jornada ${j.n}</span>
            <span class="j-date">${cap(DIAS_CORTOS[d.getDay()])} ${d.getDate()} ${MESES[d.getMonth()].slice(0, 3)}</span>
            ${chip}
            <svg class="j-chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>
          </summary>
          <div class="j-body">
            ${rows}
            ${missing ? `<p class="j-note">Los demás partidos de esta jornada aún no están cargados.</p>` : ""}
          </div>
        </details>`;
    });
    $("#jornadasList").innerHTML = html || `<p class="empty">Todavía no hay jornadas cargadas.</p>`;
    // Llevar a la vista la jornada que toca
    const open = $("#jornadasList details[open]");
    if (open && cur > 0) setTimeout(() => open.scrollIntoView({ block: "start" }), 0);
  }

  /* ---------- CLASIFICACIÓN ---------- */
  function renderStandings() {
    const c = D.clasificacion;
    const empty = c.filas.every((f) => !f.pj);
    $("#standUpdated").textContent = c.actualizada
      ? `Actualizada el ${parseDay(c.actualizada).getDate()} de ${MESES[parseDay(c.actualizada).getMonth()]}`
      : "Aún sin jornadas disputadas";
    const rows = c.filas.map((f, i) => {
      const dg = (f.gf || 0) - (f.gc || 0);
      // Zonas: el primero (verde) y los dos últimos, que descienden (rojo)
      const zone = i === 0 ? " zone-up" : i >= c.filas.length - 2 ? " zone-down" : "";
      return `<tr class="${f.equipo === US ? "us" : ""}${zone}">
        <td class="c-pos"><b>${i + 1}</b></td>
        <td class="c-team"><div>${crest(f.equipo)}<span class="n-long">${esc(T[f.equipo] ? T[f.equipo].nombre : f.equipo)}</span><span class="n-short">${esc(T[f.equipo] ? T[f.equipo].corto : f.equipo)}</span></div></td>
        <td>${f.pj}</td>
        <td class="c-opt">${f.g}</td><td class="c-opt">${f.e}</td><td class="c-opt">${f.p}</td>
        <td class="c-opt">${f.gf}</td><td class="c-opt">${f.gc}</td>
        <td class="${dg > 0 ? "pos" : dg < 0 ? "neg" : ""}">${dg > 0 ? "+" : ""}${dg}</td>
        <td class="c-pts">${f.pts}</td>
      </tr>`;
    }).join("");
    $("#standings tbody").innerHTML = rows;
  }

  /* ---------- FICHA DE PARTIDO ---------- */
  const dlg = $("#matchDialog");

  // Cartel con foto en duotono (si el partido tiene `cartel` en datos.js)
  function cartel(p) {
    const c = p.cartel, L = p.local, V = p.visitante;
    const escudo = (id) => id === US
      ? `<img class="ct-crest us" src="img/logo.png" alt="">`
      : T[id].escudo ? `<img class="ct-crest" src="${esc(T[id].escudo)}" alt="">` : `<span class="ct-crest">${esc(T[id].sigla)}</span>`;
    const nL = T[L].corto, nV = T[V].corto;
    // Los nombres van en una línea: cuanto más largos, más pequeños
    const size = Math.min(6.5, 76 / (nL.length + nV.length)).toFixed(2);
    const center = p.played ? `<span class="ct-score">${p.resultado.local}–${p.resultado.visitante}</span>` : `<span class="ct-vs">VS</span>`;
    const j = JORNADA[p.id];
    const lema = c.lema || (p.played
      ? OUT_TXT[p.outcome]
      : p.home ? "¡A llenar\nla grada!" : "Lejos de casa,\nigual de fuertes");
    // Frases largas: letra más pequeña para que cada línea quepa a lo ancho
    const lemaSize = Math.min(10, 145 / Math.max(...lema.split("\n").map((l) => l.length))).toFixed(2);
    const d = p.day;
    const cuando = `${DIAS_CORTOS[d.getDay()]} ${d.getDate()} ${MESES[d.getMonth()].slice(0, 3)} · ${p.hora || (p.franja ? `por la ${p.franja.toLowerCase()}` : "hora por confirmar")}`;
    const donde = p.piscina ? `Piscina ${p.piscina}` : p.home ? "Piscina por confirmar" : `En la piscina del ${T[L].corto}`;
    return `
      <div class="cartel${p.home ? " home" : ""}">
        <img class="ct-foto" src="${esc(c.foto)}" alt="" style="object-position:${esc(c.encuadre || "50% 40%")}">
        <div class="ct-tinte"></div>
        <div class="ct-sombra"></div>
        <div class="ct-top">
          <div class="ct-jornada"><span>${j ? "Jornada" : `${p.vuelta}ª vuelta`}</span>${j ? `<b>${String(j).padStart(2, "0")}</b>` : ""}</div>
          <div class="ct-comp"><span>${esc(D.competicion)}</span><span>Temporada ${esc(D.temporada.replace(/^20/, ""))}</span></div>
        </div>
        <div class="ct-bottom">
          <div class="ct-lema" style="font-size:${lemaSize}cqw">${esc(lema).replace(/\n/g, "<br>")}</div>
          <div class="ct-teams" id="mdTitle">
            ${escudo(L)}
            <div class="ct-names" style="font-size:${size}cqw"><span>${esc(nL)}</span>${center}<span>${esc(nV)}</span></div>
            ${escudo(V)}
          </div>
          <div class="ct-info">
            <div><b>${esc(cuando)}</b><span>${esc(donde)}</span></div>
            <span class="ct-ha">${p.home ? "En casa" : "Fuera"}</span>
          </div>
        </div>
      </div>`;
  }
  function openMatch(id) {
    const p = byId[id];
    if (!p) return;
    const L = p.local, V = p.visitante;
    const center = p.played
      ? `<div class="score-num">${scoreLV(p)}</div>`
      : `<div class="vs">VS</div>`;
    let body = "";
    if (p.nota) body += `<div class="note"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v.01M11 12h1v5h1"/></svg><span>${esc(p.nota)}</span></div>`;
    if (p.parciales && p.parciales.length) {
      body += `<h3>Parciales</h3><table class="quarters"><thead><tr><th>Equipo</th>${p.parciales.map((_, i) => `<th>${i + 1}º</th>`).join("")}<th>Total</th></tr></thead><tbody>
        <tr><td>${esc(T[L].corto)}</td>${p.parciales.map((q) => `<td>${q[0]}</td>`).join("")}<td>${p.resultado.local}</td></tr>
        <tr><td>${esc(T[V].corto)}</td>${p.parciales.map((q) => `<td>${q[1]}</td>`).join("")}<td>${p.resultado.visitante}</td></tr>
      </tbody></table>`;
    }
    if (p.goleadores && p.goleadores.length) {
      const gs = [...p.goleadores].sort((a, b) => b.goles - a.goles);
      body += `<h3>Nuestros goleadores</h3><ul class="scorers">${gs.map((g) => `<li><span>${esc(g.nombre)}</span><span><span class="balls">${"●".repeat(Math.min(g.goles, 8))}</span><b>${g.goles}</b></span></li>`).join("")}</ul>`;
    }
    if (p.cronica) {
      const paras = String(p.cronica.texto || "").split(/\n\s*\n/).filter(Boolean);
      body += `<h3>Crónica</h3><div class="cronica">${p.cronica.titulo ? `<h4>${esc(p.cronica.titulo)}</h4>` : ""}${paras.map((t) => `<p>${esc(t)}</p>`).join("")}</div>`;
    }
    if (!p.played && !p.nota) {
      body += `<p class="empty">${p.home ? "Jugamos en casa: ¡a llenar la grada!" : `Partido fuera, en la piscina de ${esc(T[p.local].nombre)}.`}${p.hora ? "" : " La hora se confirmará en los días previos."}</p>`;
    } else if (p.played && !p.cronica && !p.parciales && !p.goleadores) {
      body += `<p class="empty">La crónica de este partido llegará pronto.</p>`;
    }
    body += `<div class="md-actions">
      ${p.stats ? `<a class="btn btn-dark" href="${esc(p.stats)}" target="_blank" rel="noopener">Ver estadísticas ↗</a>` : ""}
      ${!p.played && !ARTIFACT ? `<button type="button" class="btn btn-ghost" data-ics="${p.id}">Añadir a mi calendario</button>` : ""}
      <button type="button" class="btn btn-ghost" data-share="${p.id}">Compartir</button>
    </div>`;

    $("#matchBody").innerHTML = (p.cartel && p.cartel.foto ? cartel(p) : `
      <div class="md-hero">
        <div class="md-comp">${esc(D.competicion)} · ${JORNADA[p.id] ? `Jornada ${JORNADA[p.id]}` : `${p.vuelta}ª vuelta`}</div>
        <div class="md-teams">
          <div class="md-team">${crest(L)}<b>${esc(T[L].nombre)}</b></div>
          <div class="md-center">${center}</div>
          <div class="md-team">${crest(V)}<b>${esc(T[V].nombre)}</b></div>
        </div>
        <div class="md-when">${whenText(p)} · ${timeText(p)}${p.piscina ? " · " + esc(p.piscina) : ""}</div>
        <div class="md-chips">${haChip(p)}${p.played ? `<span class="chip ${OUT_CHIP[p.outcome]}">${OUT_TXT[p.outcome]}</span>` : ""}</div>
      </div>`) + `
      <div class="md-body">${body}</div>`;
    if (!dlg.open) dlg.showModal();
    $(".sheet-inner", dlg).scrollTop = 0;
  }

  dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener("close", () => {
    if (location.hash.startsWith("#partido-")) history.replaceState(null, "", "#" + currentView);
  });

  /* ---------- Calendario .ics ---------- */
  function icsEvent(p) {
    const pad = (n) => String(n).padStart(2, "0");
    const dstr = (d) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
    const lines = ["BEGIN:VEVENT", `UID:${p.id}-2627@wpiruna9802-masculino`, `DTSTAMP:${dstr(new Date())}T000000Z`];
    if (p.hasTime) {
      const end = new Date(p.dt.getTime() + 2 * 36e5);
      lines.push(`DTSTART:${dstr(p.dt)}T${pad(p.dt.getHours())}${pad(p.dt.getMinutes())}00`);
      lines.push(`DTEND:${dstr(end)}T${pad(end.getHours())}${pad(end.getMinutes())}00`);
    } else {
      const nd = new Date(p.day); nd.setDate(nd.getDate() + 1);
      lines.push(`DTSTART;VALUE=DATE:${dstr(p.day)}`, `DTEND;VALUE=DATE:${dstr(nd)}`);
    }
    const icsEsc = (s) => String(s).replace(/[\\;,]/g, (c) => "\\" + c).replace(/\n/g, "\\n");
    lines.push(`SUMMARY:${icsEsc(`Waterpolo: ${T[p.local].nombre} – ${T[p.visitante].nombre}`)}`);
    const desc = [p.home ? "En casa" : "Fuera", p.franja && !p.hora ? `Por la ${p.franja.toLowerCase()}` : "", p.nota || ""].filter(Boolean).join(". ");
    lines.push(`DESCRIPTION:${icsEsc(desc)}`);
    if (p.piscina) lines.push(`LOCATION:${icsEsc(p.piscina)}`);
    lines.push("END:VEVENT");
    return lines.join("\r\n");
  }
  function downloadIcs(list, name) {
    const body = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//WP Iruna 9802//Masculino//ES", "CALSCALE:GREGORIAN", "X-WR-CALNAME:WP Iruña 9802 · Masculino", ...list.map(icsEvent), "END:VCALENDAR"].join("\r\n");
    const url = URL.createObjectURL(new Blob([body], { type: "text/calendar;charset=utf-8" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: name });
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  // Dentro del visor de claude.ai no se puede compartir ni descargar: solo se copia el texto
  async function share(p) {
    const url = ARTIFACT ? "" : location.href.split("#")[0] + "#partido-" + p.id;
    const text = p.played
      ? `${T[p.local].nombre} ${p.resultado.local}-${p.resultado.visitante} ${T[p.visitante].nombre}`
      : `${T[p.local].nombre} vs ${T[p.visitante].nombre} · ${whenText(p)}`;
    try {
      if (!ARTIFACT && navigator.share) { await navigator.share({ title: "WP Iruña 9802", text, url }); return; }
      await navigator.clipboard.writeText(url ? `${text}\n${url}` : text);
      const b = $(`[data-share="${p.id}"]`);
      if (b) { b.textContent = "¡Copiado!"; setTimeout(() => (b.textContent = "Compartir"), 1800); }
    } catch (e) { /* cancelado */ }
  }

  /* ---------- Router ---------- */
  const VIEWS = ["inicio", "calendario", "resultados", "jornadas", "clasificacion"];
  let currentView = "inicio";
  const rendered = {};
  function showView(v) {
    currentView = v;
    $$("[data-view]").forEach((s) => (s.hidden = s.dataset.view !== v));
    $$("[data-nav]").forEach((a) => (a.dataset.nav === v ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current")));
    if (!rendered[v]) {
      if (v === "inicio") renderHome();
      if (v === "calendario") setCalMode(calMode);
      if (v === "resultados") renderResults();
      if (v === "jornadas") renderJornadas();
      if (v === "clasificacion") renderStandings();
      rendered[v] = true;
    }
  }
  function route() {
    const h = location.hash.replace(/^#/, "");
    if (h.startsWith("partido-")) {
      if (!rendered[currentView]) showView(currentView);
      openMatch(h.slice(8));
      return;
    }
    if (dlg.open) dlg.close();
    const v = VIEWS.includes(h) ? h : "inicio";
    const changed = v !== currentView || !rendered[v];
    showView(v);
    if (changed) window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }
  window.addEventListener("hashchange", route);

  /* ---------- Eventos globales ---------- */
  document.addEventListener("click", (e) => {
    const m = e.target.closest("[data-match]");
    if (m && !e.target.closest("a")) { location.hash = "partido-" + m.dataset.match; return; }
    const ics = e.target.closest("[data-ics]");
    if (ics) { const p = byId[ics.dataset.ics]; downloadIcs([p], `partido-${p.fecha}.ics`); return; }
    const sh = e.target.closest("[data-share]");
    if (sh) { share(byId[sh.dataset.share]); return; }
    if (e.target.closest("[data-close]")) { e.target.closest("dialog").close(); }
  });
  document.addEventListener("keydown", (e) => {
    if ((e.key === "Enter" || e.key === " ") && e.target.matches("[data-match][role=button]")) {
      e.preventDefault(); e.target.click();
    }
  });

  $("#calPrev").addEventListener("click", () => { calCursor = new Date(calCursor.getFullYear(), calCursor.getMonth() - 1, 1); renderCalendar(); });
  $("#calNext").addEventListener("click", () => { calCursor = new Date(calCursor.getFullYear(), calCursor.getMonth() + 1, 1); renderCalendar(); });
  // Deslizar el calendario con el dedo
  let calTouch = null;
  $("#calGrid").addEventListener("touchstart", (e) => { calTouch = e.touches[0].clientX; }, { passive: true });
  $("#calGrid").addEventListener("touchend", (e) => {
    if (calTouch == null) return;
    const dx = e.changedTouches[0].clientX - calTouch;
    calTouch = null;
    if (Math.abs(dx) < 60) return;
    const btn = dx < 0 ? $("#calNext") : $("#calPrev");
    if (!btn.disabled) btn.click();
  });
  $$("[data-calmode]").forEach((b) => b.addEventListener("click", () => setCalMode(b.dataset.calmode)));
  $("#icsAll").addEventListener("click", () => downloadIcs(partidos, "wp-iruna-masculino-2026-27.ics"));
  $("#showAllCols").addEventListener("change", (e) => $("#standings").classList.toggle("all", e.target.checked));

  /* ---------- Arranque ---------- */
  $$("[data-temporada]").forEach((el) => (el.textContent = D.temporada));
  $$("[data-temporada-corta]").forEach((el) => (el.textContent = D.temporada.replace(/20(\d\d)\/(\d\d)/, "$1/$2")));
  $$("[data-competicion]").forEach((el) => (el.textContent = D.competicion));
  if (ARTIFACT) $(".ics-row").hidden = true;
  try { const cm = localStorage.getItem("calMode"); if (cm === "lista" || cm === "mes") calMode = cm; } catch (e) { /* */ }
  const h0 = location.hash.replace(/^#/, "");
  if (h0.startsWith("partido-")) currentView = "calendario";
  route();
})();
