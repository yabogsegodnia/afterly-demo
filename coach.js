// Trenerio (Manto) ekranai
const C = SCREENS.treneris;
const TEAM = D.kids.length;

C.siandien = { tab: 'siandien', title: 'Šiandien', render() {
  const r = rsvpStats('turnyras');
  const unpaid = unpaidList();
  const paid = (TEAM - unpaid.length) * parentFee();
  const present = TEAM - S.absentSaved.length;
  return hdr('Antradienis, lapkričio 24', 'Labas, Mantai', '<span class="avatar ink" aria-hidden="true">M</span>') + `<main class="main">
    <section class="card dark">
      <span class="small muted">Šiandien · U12 · salė Nr. 2</span>
      <span class="big">17:00–18:30</span>
      <span class="small muted">${S.attendanceSaved ? `Lankomumas pažymėtas: ${present} iš ${TEAM}` : `${TEAM} vaikai grupėje · lankomumas dar nepažymėtas`}</span>
      <button type="button" class="btn primary" data-act="go" data-arg="lankomumas">${S.attendanceSaved ? 'Keisti lankomumą' : 'Žymėti lankomumą'}</button>
    </section>
    <button type="button" class="card coach-card" data-act="go" data-arg="turnyras">
      <span class="row"><span class="strong">Kalėdinis turnyras · gruodžio 13</span>${icon('chev', 20)}</span>
      <span class="small muted num">Atsakė ${r.yes + r.no} iš ${TEAM} · terminas gruodžio 5</span>
      ${bar([[r.yes, ''], [r.no, 'no'], [r.open, 'open']])}
      <span class="legend num"><span><i></i>${r.yes} dalyvaus</span><span><i class="no"></i>${r.no} ne</span><span><i class="open"></i>${r.open} neatsakė</span></span>
    </button>
    <button type="button" class="card coach-card" data-act="go" data-arg="mokejimai">
      <span class="row"><span class="strong">Gruodžio mokesčiai</span>${icon('chev', 20)}</span>
      <span class="row start" style="align-items:baseline;gap:8px"><span class="big">${eur(paid)}</span><span class="small muted">iš ${eur(TEAM * parentFee())}</span></span>
      ${bar([[TEAM - unpaid.length, ''], [unpaid.length, 'open']])}
      <span class="small muted">${unpaid.length} dar nesumokėjo · terminas gruodžio 5</span>
    </button>
    <button type="button" class="card coach-card" data-act="go" data-arg="grupe">
      <span class="row"><span class="strong">Lapkričio pažangos kortelės</span>${icon('chev', 20)}</span>
      <span class="small muted">${S.cardsLeft.length ? `Liko užpildyti ${S.cardsLeft.length}: ${S.cardsLeft.join(', ')}` : 'Visos išsiųstos tėvams'}</span>
    </button>
    <button type="button" class="btn ink block" data-act="go" data-arg="naujas">${icon('plus', 20, 2)}Naujas pranešimas</button>
  </main>`;
} };

C.pranesimai = { tab: 'pranesimai', title: 'Pranešimai', render() {
  return hdr('U12 · 24 šeimos', 'Pranešimai', `<button type="button" class="btn primary sm" data-act="go" data-arg="naujas">${icon('plus', 18, 2)}Naujas</button>`) + `<main class="main">
    ${S.notices.map((n) => {
      const r = rsvpStats(n.id);
      const inner = `<span class="row"><span class="badge${n.kind === 'Svarbu' ? '' : ' calm'}">${esc(n.kind)}</span><span class="xs muted">${esc(n.time)}</span></span>
        <span class="strong">${esc(n.title)}</span>
        <span class="small muted num">Perskaitė ${Math.max(n.read, r.yes + r.no)} iš ${TEAM}${n.rsvp ? ` · atsakė ${r.yes + r.no}` : ''}</span>`;
      return n.id === 'turnyras'
        ? `<button type="button" class="card coach-card" data-act="go" data-arg="turnyras">${inner}<span class="small ok-text">Kas neatsakė</span></button>`
        : `<div class="card">${inner}</div>`;
    }).join('')}
    <p class="foot-note">Svarbūs pranešimai lieka čia ir tėvų Pradžioje. Pokalbiuose jie nepasimeta.</p>
  </main>`;
} };

C.turnyras = { tab: 'pranesimai', title: 'Turnyro atsakymai', render() {
  const r = rsvpStats('turnyras');
  const row = (k) => `<div class="item"><span class="row start"><span class="avatar" aria-hidden="true">${initials(k)}</span><span class="strong">${k}</span></span>${
    S.reminded[k] ? '<span class="small ok-text">Priminta</span>' : `<button type="button" class="btn sm" data-act="remind" data-arg="${k}">Priminti</button>`}</div>`;
  return subhdr('Kalėdinis turnyras', S.turnyrasBack) + `<main class="main">
    <section class="card">
      <span class="small muted">Gruodžio 13 · Kaunas · atsakyti iki gruodžio 5</span>
      ${bar([[r.yes, ''], [r.no, 'no'], [r.open, 'open']])}
      <span class="legend num"><span><i></i>${r.yes} dalyvaus</span><span><i class="no"></i>${r.no} ne</span><span><i class="open"></i>${r.open} neatsakė</span></span>
    </section>
    ${toggleRow('Priminti automatiškai', 'Neatsakiusiems tėvams gruodžio 3 d.', S.autoRemind, 'flipRemind')}
    <h2 class="sec">Neatsakė (${r.openList.length})</h2>
    <section class="card tight">${r.openList.length ? r.openList.map(row).join('') : '<p class="p small muted" style="padding:12px 0">Atsakė visi.</p>'}</section>
    <h2 class="sec">Nedalyvaus (${r.noList.length})</h2>
    <section class="card tight">${r.noList.map((k) => `<div class="item"><span class="row start"><span class="avatar" aria-hidden="true">${initials(k)}</span>${k}</span></div>`).join('')}</section>
  </main>`;
} };

C.naujas = { tab: 'pranesimai', title: 'Naujas pranešimas', render() {
  const d = S.draft;
  return subhdr('Naujas pranešimas', 'pranesimai') + `<main class="main">
    <div class="field"><span>Tipas</span><div class="chips wrap">${['Svarbu', 'Tvarkaraštis', 'Informacija'].map((k) => chip(k, d.kind === k, 'kind', k)).join('')}</div></div>
    <label class="field" for="n-title"><span>Pavadinimas</span><input id="n-title" class="input" type="text" data-model="draft.title" value="${esc(d.title)}" placeholder="Pvz.: Šeštadienį draugiškos rungtynės"></label>
    <label class="field" for="n-text"><span>Tekstas</span><textarea id="n-text" class="input" data-model="draft.text" placeholder="Kada, kur, ką pasiimti">${esc(d.text)}</textarea></label>
    ${toggleRow('Prašyti atsakymo', 'Tėvai pažymi: dalyvaus arba nedalyvaus', d.rsvp, 'flipRsvp')}
    <p class="note">Gaus 24 šeimos (31 gavėjas). „Svarbu“ ateina kaip pranešimas į telefoną ir lieka Pradžioje, kol tėvai jį perskaito.</p>
    <button type="button" class="btn primary block" data-act="publish">Siųsti</button>
  </main>`;
} };

C.lankomumas = { tab: 'siandien', title: 'Lankomumas', render() {
  const present = TEAM - S.absent.length;
  return subhdr('Lankomumas', 'siandien') + `<main class="main">
    <div class="row"><span class="small muted">Antradienis, lapkričio 24 · 17:00</span><span class="strong num">${present} iš ${TEAM}</span></div>
    <div class="kids">${D.kids.map((k) => {
      const here = !S.absent.includes(k);
      return `<button type="button" class="kid" aria-pressed="${here}" data-act="flipKid" data-arg="${k}"><span>${k}</span><span class="mark">${here ? icon('check', 14, 3) : ''}</span></button>`;
    }).join('')}</div>
    <p class="foot-note">Paspaudus vaiką jis pažymimas kaip neatėjęs. Iš šių žymų susidaro NVŠ lankomumo žiniaraštis savivaldybei.</p>
    <div class="btns"><button type="button" class="btn" data-act="nvsExport">NVŠ žiniaraštis</button><button type="button" class="btn primary" data-act="saveAttendance">Išsaugoti</button></div>
  </main>`;
} };

C.grupe = { tab: 'grupe', title: 'Grupė', render() {
  return hdr('24 vaikai · nuo rugsėjo', 'Grupė U12') + `<main class="main">
    <p class="note">Lapkričio pažangos kortelės: išsiųsta ${TEAM - S.cardsLeft.length} iš ${TEAM}. Paspauskite vaiką, kad užpildytumėte.</p>
    <section class="card tight">${D.kids.map((k) => `<button type="button" class="item" data-act="editKid" data-arg="${k}">
      <span class="row start"><span class="avatar" aria-hidden="true">${initials(k)}</span><span class="strong">${k}</span></span>
      ${S.cardsLeft.includes(k) ? '<span class="tag" style="color:var(--warn)">Užpildyti</span>' : '<span class="tag ok">Išsiųsta</span>'}</button>`).join('')}</section>
  </main>`;
} };

function kidCard(k) {
  if (k === 'Ugnė K.') { const f = S.fb.nov; return { kid: k, scores: f.scores.slice(), comment: f.comment, goal: f.goal }; }
  const seed = k.charCodeAt(0) + k.charCodeAt(1);
  return { kid: k, scores: D.skills.map((_, i) => 2 + ((seed + i * 3) % 4)), comment: '', goal: '' };
}

C.pazanga = { tab: 'grupe', title: 'Pažangos kortelė', render() {
  if (!S.edit) S.edit = kidCard('Ugnė K.');
  const e = S.edit;
  return subhdr(esc(e.kid), 'grupe') + `<main class="main">
    <span class="small muted">Lapkričio kortelė · mato tėvai${e.kid === 'Ugnė K.' ? ' ir Ugnė' : ''}</span>
    <section class="card tight">${D.skills.map((s, i) => `<div class="item"><span class="strong">${s}</span><span class="dots">${[1, 2, 3, 4, 5].map((n) =>
      `<button type="button" class="dot${n <= e.scores[i] ? ' on' : ''}" aria-label="${s}: ${n}" aria-pressed="${n === e.scores[i]}" data-act="score" data-arg="${i}:${n}"></button>`).join('')}</span></div>`).join('')}</section>
    <label class="field" for="fb-comment"><span>Komentaras tėvams</span><textarea id="fb-comment" class="input" data-model="edit.comment" placeholder="Kas pavyko, ką gerinti">${esc(e.comment)}</textarea></label>
    <label class="field" for="fb-goal"><span>Tikslas kitam mėnesiui</span><input id="fb-goal" class="input" type="text" data-model="edit.goal" value="${esc(e.goal)}" placeholder="Vienas aiškus tikslas"></label>
    <button type="button" class="btn primary block" data-act="saveCard">Išsiųsti tėvams</button>
  </main>`;
} };

C.mokejimai = { tab: 'mokejimai', title: 'Mokėjimai', render() {
  const unpaid = unpaidList();
  const fee = parentFee();
  return hdr('Gruodis · U12', 'Mokėjimai') + `<main class="main">
    <section class="card">
      <span class="small muted">Iš tėvų surinkta</span>
      <span class="row start" style="align-items:baseline;gap:8px"><span class="big">${eur((TEAM - unpaid.length) * fee)}</span><span class="muted">iš ${eur(TEAM * fee)}</span></span>
      ${bar([[TEAM - unpaid.length, ''], [unpaid.length, 'open']])}
    </section>
    <div class="grid2">
      <div class="card"><span class="big">${eur(TEAM * D.price)}</span><span class="small muted">grupės mėnesio kaina (${TEAM} × ${D.price} €)</span></div>
      <div class="card accent"><span class="big">${eur(TEAM * D.nvs)}</span><span class="small">perveda savivaldybė iš NVŠ krepšelių</span></div>
    </div>
    <div class="row"><h2 class="sec">Dar nesumokėjo (${unpaid.length})</h2>${unpaid.some((k) => !S.reminded['pay:' + k]) ? '<button type="button" class="btn link sm" data-act="remindAllPay">Priminti visiems</button>' : ''}</div>
    <section class="card tight">${unpaid.length ? unpaid.map((k) => `<div class="item"><span class="row start"><span class="avatar" aria-hidden="true">${initials(k)}</span><span class="col"><span class="strong">${k}</span><span class="xs muted">${fee} € · iki gruodžio 5</span></span></span>${
      S.reminded['pay:' + k] ? '<span class="small ok-text">Priminta</span>' : `<button type="button" class="btn sm" data-act="remindPay" data-arg="${k}">Priminti</button>`}</div>`).join('') : '<p class="p small muted" style="padding:12px 0">Visi sumokėjo.</p>'}</section>
    <p class="foot-note">Tėvai moka banko nuoroda, kortele arba automatiškai kas mėnesį. Kvitai ir NVŠ ataskaita susidaro patys.</p>
  </main>`;
} };

C.pokalbiai = { tab: 'pokalbiai', title: 'Pokalbiai', render() {
  return hdr('Darbo laikas 9–20 val.', 'Pokalbiai') + `<main class="main">
    <section class="card tight">${['rasa', 'jokubas', 'group'].map((key) => {
      const t = S.threads[key]; const last = t.msgs[t.msgs.length - 1];
      const unread = key === 'rasa' && S.unread.coach;
      return `<button type="button" class="item" data-act="openThread" data-arg="${key}">
        <span class="row start" style="min-width:0"><span class="avatar" aria-hidden="true">${key === 'group' ? 'U12' : t.title[0]}</span>
        <span class="col"><span class="strong">${esc(t.title)}</span><span class="small muted" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:220px">${esc(last.text)}</span></span></span>
        ${unread ? `<span class="badge">${unread}</span>` : `<span class="xs muted">${esc(last.time)}</span>`}</button>`;
    }).join('')}</section>
    <p class="note">Vaikams asmeniškai rašyti negalima. Treneris rašo tėvams arba visai komandai, ir tėvai mato viską, ką gauna vaikas.</p>
  </main>`;
} };

C.pokalbis = { tab: 'pokalbiai', title: null, render() {
  const t = S.threads[S.coachThread];
  return subhdr(esc(t.title), 'pokalbiai') + `<main class="main" data-autoscroll>${thread(t.msgs, 'coach')}</main>` + composer('Atsakyti…');
} };

ACT.openThread = (k) => { S.coachThread = k; if (k === 'rasa') S.unread.coach = 0; S.msgDraft = ''; S.cur.treneris = 'pokalbis'; };
ACT.remind = (k) => { S.reminded[k] = true; S.toast = `Priminimas išsiųstas: ${k} tėvams.`; };
ACT.remindPay = (k) => { S.reminded['pay:' + k] = true; S.toast = `Priminimas apie 40 € išsiųstas: ${k} tėvams.`; };
ACT.remindAllPay = () => { unpaidList().forEach((k) => { S.reminded['pay:' + k] = true; }); S.toast = 'Priminimai išsiųsti visiems, kas dar nesumokėjo.'; };
ACT.flipRemind = () => { S.autoRemind = !S.autoRemind; };
ACT.kind = (k) => { S.draft.kind = k; };
ACT.flipRsvp = () => { S.draft.rsvp = !S.draft.rsvp; };
ACT.publish = () => {
  const d = S.draft;
  if (!d.title.trim()) { S.toast = 'Įrašykite pavadinimą.'; return; }
  S.notices.unshift({ id: 'n' + S.notices.length, kind: d.kind, title: d.title.trim(), text: d.text.trim(), rsvp: d.rsvp, deadline: 'gruodžio 5', time: 'Ką tik', read: 0, fresh: true });
  S.draft = { kind: 'Svarbu', title: '', text: '', rsvp: true };
  S.cur.treneris = 'pranesimai';
  S.toast = 'Išsiųsta 24 šeimoms. Perjunkite į tėvų paskyrą ir pamatysite jį Pradžioje.';
};
ACT.flipKid = (k) => { S.absent = S.absent.includes(k) ? S.absent.filter((x) => x !== k) : S.absent.concat([k]); };
ACT.saveAttendance = () => { S.attendanceSaved = true; S.absentSaved = S.absent.slice(); S.cur.treneris = 'siandien'; S.toast = `Išsaugota: ${TEAM - S.absent.length} iš ${TEAM}. NVŠ žiniaraštis atnaujintas.`; };
ACT.nvsExport = () => { S.toast = 'Lapkričio NVŠ žiniaraštis suformuotas iš lankomumo žymų (demonstracija).'; };
ACT.editKid = (k) => { S.edit = kidCard(k); S.cur.treneris = 'pazanga'; };
ACT.score = (arg) => { const [i, n] = arg.split(':').map(Number); S.edit.scores[i] = n; };
ACT.saveCard = () => {
  const e = S.edit;
  if (e.kid === 'Ugnė K.') {
    const f = S.fb.nov;
    f.scores = e.scores.slice(); f.comment = e.comment.trim() || f.comment; f.goal = e.goal.trim() || f.goal;
    S.fbNew = true;
  }
  S.cardsLeft = S.cardsLeft.filter((k) => k !== e.kid);
  S.cur.treneris = 'grupe';
  S.edit = null;
  S.toast = `${e.kid} kortelė išsiųsta tėvams.`;
};
