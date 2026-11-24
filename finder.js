// Trenerio paieška tėvams: filtrai, profilis, bandomoji treniruotė
const F = SCREENS.tevai;

function coachMatches() {
  const f = S.find;
  const q = f.q.trim().toLowerCase();
  const age = Number(f.age);
  return D.coaches.filter((c) =>
    (f.sport === 'Visi' || c.sport === f.sport) &&
    (f.district === 'Visi rajonai' || c.district === f.district) &&
    (!age || (age >= c.ages[0] && age <= c.ages[1])) &&
    (!f.nvs || c.nvs) && (!f.trial || c.trial) &&
    (!q || (c.name + ' ' + c.club + ' ' + c.sport + ' ' + c.district).toLowerCase().includes(q))
  ).sort((a, b) => (b.spots > 0) - (a.spots > 0) || b.rating - a.rating);
}

function coachRow(c) {
  return `<button type="button" class="card coach-card" data-act="openCoach" data-arg="${c.id}">
    <span class="row start" style="align-items:flex-start;gap:12px">
      <span class="avatar" aria-hidden="true">${initials(c.name)}</span>
      <span class="col" style="flex:1;gap:3px">
        <span class="row"><span class="strong">${c.name}</span><span class="small"><span class="stars">★ ${c.rating.toFixed(1)}</span> <span class="muted">(${c.reviews})</span></span></span>
        <span class="small muted">${c.club} · ${c.district}</span>
        <span class="chips wrap" style="gap:4px;margin-top:4px"><span class="tag">${c.sport}</span><span class="tag">${c.ages[0]}–${c.ages[1]} m.</span>${c.trial ? '<span class="tag ok">Nemokama bandomoji</span>' : ''}</span>
      </span>
    </span>
    <span class="row" style="border-top:1px solid var(--line-soft);padding-top:8px">
      <span class="small"><span class="strong num">${c.price} € / mėn.</span>${c.nvs ? ` <span class="muted">· su krepšeliu ${c.price - D.nvs} €</span>` : ' <span class="muted">· krepšelio nepriima</span>'}</span>
      <span class="small ${c.spots ? 'ok-text' : 'warn-text'}">${c.spots ? `Liko ${c.spots} ${lt(c.spots, 'vieta', 'vietos', 'vietų')}` : 'Grupė pilna'}</span>
    </span>
  </button>`;
}

function resultsHtml() {
  const list = coachMatches();
  const n = list.length;
  return `<span class="small muted" aria-live="polite">Rasta: ${n} ${lt(n, 'treneris', 'treneriai', 'trenerių')}</span>` + (n
    ? list.map(coachRow).join('')
    : `<div class="card"><span class="strong">Pagal šiuos filtrus trenerių nėra</span><span class="small muted">Pabandykite kitą rajoną arba išjunkite kelis filtrus.</span><button type="button" class="btn sm" style="align-self:flex-start" data-act="clearFind">Išvalyti filtrus</button></div>`);
}

F.paieska = { tab: 'paieska', title: 'Rasti trenerį', render() {
  const f = S.find;
  const ages = ['0'].concat(Array.from({ length: 10 }, (_, i) => String(i + 5)));
  return hdr('Vilnius · 9 treneriai', 'Rasti trenerį') + `<main class="main">
    ${S.booked.map((b) => `<div class="card accent" style="gap:2px"><span class="xs strong" style="color:var(--accent-ink)">Jūsų užklausa · laukia patvirtinimo</span><span class="strong">${b.name} · ${b.slot}</span></div>`).join('')}
    <div class="search">${icon('search', 20, 2)}<label class="sr" for="find-q">Ieškoti</label><input id="find-q" class="input" type="search" autocomplete="off" placeholder="Vardas, klubas ar sporto šaka" data-model="find.q" data-live="results" value="${esc(f.q)}"></div>
    <div class="chips" role="group" aria-label="Sporto šaka">${D.sports.map((s) => chip(s, f.sport === s, 'findSport', s)).join('')}</div>
    <div class="grid2">
      <label class="field" for="find-age"><span>Vaiko amžius</span><select id="find-age" class="input" data-model="find.age">${ages.map((a) => `<option value="${a}"${a === f.age ? ' selected' : ''}>${a === '0' ? 'Bet koks' : a + ' m.'}</option>`).join('')}</select></label>
      <label class="field" for="find-district"><span>Rajonas</span><select id="find-district" class="input" data-model="find.district">${D.districts.map((d) => `<option${d === f.district ? ' selected' : ''}>${d}</option>`).join('')}</select></label>
    </div>
    <div class="chips wrap">${chip('Priima NVŠ krepšelį', f.nvs, 'findFlag', 'nvs')}${chip('Nemokama bandomoji', f.trial, 'findFlag', 'trial')}</div>
    <div class="col" id="results" style="gap:10px">${resultsHtml()}</div>
    <p class="foot-note">Treneriai, klubai ir atsiliepimai sugalvoti prototipui.</p>
  </main>`;
} };

F.trenerioProfilis = { tab: 'paieska', title: 'Trenerio profilis', render() {
  const c = D.coaches.find((x) => x.id === S.coachId) || D.coaches[0];
  const booked = S.booked.find((b) => b.id === c.id);
  return subhdr('Treneris', 'paieska') + `<main class="main">
    <section class="row start" style="gap:14px">
      <span class="avatar lg" aria-hidden="true">${initials(c.name)}</span>
      <span class="col" style="gap:3px"><span class="ttl">${c.name}</span><span class="small muted">${c.club} · ${c.district}</span><span class="small"><span class="stars">★ ${c.rating.toFixed(1)}</span> <span class="muted">· ${c.reviews} ${lt(c.reviews, 'atsiliepimas', 'atsiliepimai', 'atsiliepimų')} · ${c.years} m. patirtis</span></span></span>
    </section>
    <div class="chips wrap" style="gap:6px"><span class="tag">${c.sport}</span><span class="tag">${c.ages[0]}–${c.ages[1]} m.</span><span class="tag">${c.days}</span>${c.trial ? '<span class="tag ok">Nemokama bandomoji</span>' : ''}</div>
    <p class="p">${c.about}</p>
    <section class="card">
      <span class="row"><span>Mėnesio kaina</span><span class="num">${c.price} €</span></span>
      ${c.nvs ? `<span class="row"><span>NVŠ krepšelis</span><span class="num ok-text">−${D.nvs} €</span></span>
      <span class="row" style="border-top:1px solid var(--line-soft);padding-top:8px"><span class="strong">Mokėtumėte</span><span class="ttl num">${c.price - D.nvs} € / mėn.</span></span>` : '<span class="small muted">Ši programa NVŠ krepšelio nepriima.</span>'}
    </section>
    ${booked ? `<div class="card accent"><span class="strong">Užklausa išsiųsta: ${booked.slot}</span><span class="small">${c.name.split(' ')[0]} turėtų patvirtinti per parą. Atsakymą matysite Pokalbiuose.</span></div>`
      : c.spots ? `<h2 class="sec">${c.trial ? 'Nemokama bandomoji treniruotė' : 'Pirmoji treniruotė'}</h2>
        ${c.slots.map((s) => `<button type="button" class="slot" aria-pressed="${S.slot === s}" data-act="pickSlot" data-arg="${s}"><span>${s}</span>${S.slot === s ? icon('check', 20, 2.4) : ''}</button>`).join('')}
        <button type="button" class="btn primary block" data-act="book"${S.slot ? '' : ' disabled'}>${S.slot ? 'Užsirašyti: ' + S.slot : 'Pasirinkite laiką'}</button>`
      : `<div class="card warn"><span class="strong">Grupė pilna</span><span class="small">Įrašysime į laukiančiųjų sąrašą ir pranešime, kai atsiras vieta.</span>${S.waitlist.includes(c.id) ? '<span class="small strong">Jūs laukiančiųjų sąraše.</span>' : '<button type="button" class="btn sm" style="align-self:flex-start" data-act="waitlist">Į laukiančiųjų sąrašą</button>'}</div>`}
    <h2 class="sec">Ką sako tėvai</h2>
    ${c.quotes.map((q) => `<blockquote class="quote">${q[1]}<cite>${q[0]}</cite></blockquote>`).join('')}
    <p class="foot-note">Atsiliepimus gali palikti tik tėvai, kurių vaikas lankė bent 2 mėnesius.</p>
  </main>`;
} };

ACT.findSport = (s) => { S.find.sport = s; };
ACT.findFlag = (k) => { S.find[k] = !S.find[k]; };
ACT.clearFind = () => { S.find = { q: '', sport: 'Visi', district: 'Visi rajonai', age: '0', nvs: false, trial: false }; };
ACT.openCoach = (id) => { S.coachId = id; S.slot = null; S.cur.tevai = 'trenerioProfilis'; };
ACT.pickSlot = (s) => { S.slot = s; };
ACT.book = () => {
  const c = D.coaches.find((x) => x.id === S.coachId);
  if (!S.slot || !c) return;
  S.booked.push({ id: c.id, name: c.name, slot: S.slot });
  S.toast = `Užklausa išsiųsta: ${c.dat}.`;
  S.slot = null;
};
ACT.waitlist = () => { if (!S.waitlist.includes(S.coachId)) S.waitlist.push(S.coachId); S.toast = 'Įrašyta į laukiančiųjų sąrašą. Pranešime, kai atsiras vieta.'; };
