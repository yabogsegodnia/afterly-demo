// Tėvų (Rasos, Ugnės mamos) ekranai. Trenerio paieška – finder.js
const P = SCREENS.tevai;

function noticeCard(n) {
  const a = S.rsvp[n.id];
  const head = `<span class="row"><span class="badge${n.kind === 'Svarbu' ? '' : ' calm'}">${esc(n.kind)}${n.fresh ? ' · nauja' : ''}</span><span class="small muted">Treneris Mantas · ${esc(n.time)}</span></span>
    <h2 class="ttl">${esc(n.title)}</h2>${n.text ? `<p class="p">${esc(n.text)}</p>` : ''}`;
  if (!n.rsvp) return `<section class="card">${head}</section>`;
  const body = a
    ? `<div class="row" style="background:var(--surface);border-radius:12px;padding:8px 12px"><span class="row start strong" style="gap:8px;color:var(--accent)">${icon('check', 20, 2)}${a === 'yes' ? 'Ugnė dalyvaus · įrašyta į kalendorių' : 'Ugnė nedalyvaus · treneriui pranešta'}</span><button type="button" class="btn link sm" data-act="rsvp" data-arg="${n.id}:">Keisti</button></div>`
    : `<span class="small strong">Atsakykite iki ${esc(n.deadline)}</span><div class="btns"><button type="button" class="btn ink" data-act="rsvp" data-arg="${n.id}:yes">Ugnė dalyvaus</button><button type="button" class="btn" style="background:transparent;border-color:var(--ink)" data-act="rsvp" data-arg="${n.id}:no">Nedalyvaus</button></div>`;
  return `<section class="card accent">${head}${body}</section>`;
}

P.pradzia = { tab: 'pradzia', title: 'Pradžia', render() {
  const f = S.fb.nov;
  return hdr('Ugnė · KK Šuolis U12', 'Labas, Rasa', '<span class="avatar lg" aria-hidden="true" style="width:44px;height:44px;font-size:16px">R</span>') + `<main class="main">
    ${S.notices.map(noticeCard).join('')}
    ${S.paid
      ? `<div class="card"><span class="row"><span class="col"><span class="strong">Gruodžio mokestis</span><span class="small muted">${parentFee()} € · ${S.autopay ? 'toliau mokėsite automatiškai' : 'kvitas el. pašte'}</span></span><span class="tag ok">Apmokėta</span></span></div>`
      : `<div class="card"><span class="row"><span class="col"><span class="strong">Gruodžio mokestis</span><span class="small muted">${D.price} € − ${D.nvs} € NVŠ krepšelis = ${parentFee()} € · iki gruodžio 5</span></span><button type="button" class="btn primary sm" data-act="go" data-arg="apmokejimas">Mokėti</button></span></div>`}
    <button type="button" class="card coach-card" data-act="go" data-arg="ugne">
      <span class="row"><span class="small strong muted">${S.fbNew ? 'Atnaujintas trenerio atsiliepimas' : 'Trenerio atsiliepimas už lapkritį'}</span>${S.fbNew ? '<span class="badge calm">Nauja</span>' : ''}</span>
      <span class="p">„${esc(f.comment.length > 110 ? f.comment.slice(0, 110).trim() + '…' : f.comment)}“</span>
      <span class="small ok-text">Žiūrėti pažangą</span>
    </button>
    <h2 class="sec">Artimiausia</h2>
    <section class="card tight">
      ${[['AN', '24', 'Šiandien treniruotė 17:00–18:30', 'Sporto centras, salė Nr. 2'],
         ['KT', '26', 'Treniruotė 17:30–19:00', 'Pakeistas laikas: salėje mokyklos renginys'],
         ['SK', '13', 'Kalėdinis turnyras, Kaunas', S.rsvp.turnyras === 'yes' ? 'Ugnė dalyvauja · išvykimas 7:30' : 'Išvykimas 7:30 nuo sporto centro']].map((e) =>
        `<div class="item" style="justify-content:flex-start;gap:14px"><span class="col" style="width:36px;align-items:center"><span class="xs strong muted">${e[0]}</span><span class="ttl num">${e[1]}</span></span><span class="col"><span class="strong">${e[2]}</span><span class="small muted">${e[3]}</span></span></div>`).join('')}
    </section>
  </main>`;
} };

P.apmokejimas = { tab: 'pradzia', title: 'Apmokėjimas', render() {
  const methods = [['bank', 'Banko nuoroda', 'Swedbank, SEB, Luminor, Šiaulių bankas ir kt.'], ['card', 'Mokėjimo kortelė', 'Visa, Mastercard'], ['wallet', 'Apple Pay / Google Pay', 'Vienu prisilietimu']];
  return subhdr('Apmokėjimas', 'pradzia') + `<main class="main">
    <section class="card">
      <span class="small muted">KK Šuolis · Ugnė K. · gruodis</span>
      <span class="row"><span>Mėnesio kaina</span><span class="num">${D.price},00 €</span></span>
      <span class="row"><span>NVŠ krepšelis (moka savivaldybė)</span><span class="num ok-text">−${D.nvs},00 €</span></span>
      <span class="row" style="border-top:1px solid var(--line-soft);padding-top:10px;align-items:baseline"><span class="strong">Mokėti</span><span class="big">${parentFee()},00 €</span></span>
    </section>
    ${S.paid ? `<section class="card accent"><span class="ok-text">${icon('check', 32, 2)}</span><span class="ttl">Apmokėta</span><span class="p">Kvitas išsiųstas el. paštu. Treneris jau mato, kad gruodis apmokėtas.</span></section>
      <button type="button" class="btn block" data-act="go" data-arg="pradzia">Grįžti į pradžią</button>` : `
    <h2 class="sec">Mokėjimo būdas</h2>
    ${methods.map((m) => `<button type="button" class="slot" aria-pressed="${S.payMethod === m[0]}" data-act="payMethod" data-arg="${m[0]}" style="min-height:62px"><span class="col"><span>${m[1]}</span><span class="small muted" style="font-weight:400">${m[2]}</span></span>${S.payMethod === m[0] ? icon('check', 20, 2.4) : ''}</button>`).join('')}
    ${toggleRow('Mokėti automatiškai kas mėnesį', 'Galima išjungti bet kada', S.autopay, 'flipAutopay')}
    <button type="button" class="btn primary block" data-act="pay">Mokėti ${parentFee()},00 €</button>`}
  </main>`;
} };

P.kalendorius = { tab: 'kalendorius', title: 'Kalendorius', render() {
  const m = D.calendar[S.calMonth];
  const cells = Array(m.first).fill(null);
  for (let d = 1; d <= m.days; d++) cells.push(d);
  while (cells.length % 7) cells.push(null);
  const evs = (d) => {
    if (m.breakFrom && d >= m.breakFrom) return [{ t: 'Žiemos pertrauka', s: 'Treniruotės vėl nuo sausio 5', imp: false, brk: true }];
    const list = (m.special[d] || []).map((e) => (S.calMonth === 'dec' && d === 13 && S.rsvp.turnyras === 'yes') ? Object.assign({}, e, { s: e.s + ' · Ugnė dalyvauja' }) : e);
    if (m.train.includes(d) && !m.special[d]) list.unshift({ t: 'Treniruotė 17:00–18:30', s: 'Sporto centras, salė Nr. 2', imp: false });
    return list;
  };
  let grid = '';
  for (let i = 0; i < cells.length; i += 7) {
    grid += '<div class="cal-row">' + cells.slice(i, i + 7).map((d) => {
      if (!d) return '<span></span>';
      const list = evs(d);
      const cls = ['cal-day', d === S.calDay ? 'sel' : '', S.calMonth === 'nov' && d === 24 ? 'today' : '', list.some((e) => e.brk) ? 'brk' : ''].join(' ');
      const marks = list.filter((e) => !e.brk).map((e) => `<i${e.imp ? ' class="imp"' : ''}></i>`).join('');
      return `<button type="button" class="${cls}" aria-label="${m.gen} ${d}" aria-pressed="${d === S.calDay}" data-act="calDay" data-arg="${d}"><b>${d}</b><span class="mk">${marks}</span></button>`;
    }).join('') + '</div>';
  }
  const sel = evs(S.calDay);
  return hdr('Ugnė · U12', `${m.label} 2026`) + `<main class="main">
    <div class="chips wrap">${chip('Lapkritis', S.calMonth === 'nov', 'calMonth', 'nov')}${chip('Gruodis', S.calMonth === 'dec', 'calMonth', 'dec')}</div>
    <section class="card" style="padding:10px 6px">
      <div class="cal-head"><span>Pr</span><span>An</span><span>Tr</span><span>Kt</span><span>Pn</span><span>Št</span><span>Sk</span></div>
      ${grid}
      <div class="legend" style="padding:6px 10px 0"><span><i class="no"></i>Svarbu</span><span><i style="background:var(--ink)"></i>Treniruotė</span><span>Pilka – pertrauka</span></div>
    </section>
    <h2 class="sec">${m.gen[0].toUpperCase() + m.gen.slice(1)} ${S.calDay} d.${S.calMonth === 'nov' && S.calDay === 24 ? ' · šiandien' : ''}</h2>
    ${sel.length ? sel.map((e) => `<div class="card">${e.imp ? '<span class="badge">Svarbu</span>' : ''}<span class="strong">${e.t}</span><span class="small muted">${e.s}</span></div>`).join('') : '<p class="p small muted" style="padding:0 4px">Šią dieną nieko nesuplanuota.</p>'}
    <button type="button" class="btn link" style="align-self:flex-start" data-act="calSync">Prijungti prie Google ar Apple kalendoriaus</button>
  </main>`;
} };

P.pokalbiai = { tab: 'pokalbiai', title: 'Pokalbiai', render() {
  const key = S.parentThread;
  const t = S.threads[key];
  return hdr('Ugnė · U12', 'Pokalbiai') + `<main class="main" data-autoscroll>
    <div class="chips wrap">${chip('Treneris Mantas', key === 'rasa', 'parentThread', 'rasa')}${chip('U12 tėvai · 31', key === 'group', 'parentThread', 'group')}</div>
    <p class="note">${key === 'rasa' ? 'Mantas atsako darbo dienomis 9–20 val. Svarbūs pranešimai rodomi Pradžioje, ne čia.' : 'Tėvų pokalbis. Treneris jo skaityti neprivalo, todėl svarbius klausimus rašykite jam asmeniškai.'}</p>
    ${thread(t.msgs, 'rasa')}
  </main>` + composer('Rašyti žinutę…');
} };

P.ugne = { tab: 'ugne', title: 'Ugnės pažanga', render() {
  const f = S.fb[S.parentMonth];
  return hdr('KK Šuolis U12 · nuo 2026 m. rugsėjo', 'Ugnė') + `<main class="main">
    <div class="chips wrap">${chip('Lapkritis', S.parentMonth === 'nov', 'parentMonth', 'nov')}${chip('Spalis', S.parentMonth === 'oct', 'parentMonth', 'oct')}</div>
    <div class="grid2">
      <div class="card" style="gap:0"><span class="big">${f.attend}</span><span class="small muted">treniruočių aplankyta</span></div>
      <div class="card" style="gap:0"><span class="big">92 %</span><span class="small muted">lankomumas per sezoną</span></div>
    </div>
    <section class="card tight">${D.skills.map((s, i) => `<div class="item"><span class="strong">${s}</span><span class="row" style="gap:10px">${f.scores[i] > f.prev[i] ? `<span class="xs ok-text">+${f.scores[i] - f.prev[i]}</span>` : ''}${dots(f.scores[i], s)}</span></div>`).join('')}</section>
    <section class="card">
      <span class="row start"><span class="avatar ink" aria-hidden="true">M</span><span class="col"><span class="strong">Treneris Mantas</span><span class="small muted">${f.date}</span></span></span>
      <p class="p">${esc(f.comment)}</p>
      <div class="card accent" style="padding:10px 12px;gap:2px"><span class="xs strong" style="color:var(--accent-ink)">Tikslas</span><span class="strong">${esc(f.goal)}</span></div>
    </section>
    <button type="button" class="btn block" data-act="askCoach">Klausti trenerio</button>
  </main>`;
} };

ACT.rsvp = (arg) => {
  const [id, a] = arg.split(':');
  S.rsvp[id] = a || null;
  if (a) S.toast = a === 'yes' ? 'Atsakymas išsiųstas. Treneris jį jau mato, o renginys įrašytas į kalendorių.' : 'Treneriui pranešta, kad Ugnė nedalyvaus.';
};
ACT.payMethod = (m) => { S.payMethod = m; };
ACT.flipAutopay = () => { S.autopay = !S.autopay; };
ACT.pay = () => { S.paid = true; S.toast = 'Apmokėta 40 €. Trenerio sąraše Ugnė pažymėta kaip sumokėjusi.'; };
ACT.calMonth = (m) => { S.calMonth = m; S.calDay = m === 'nov' ? 24 : 13; };
ACT.calDay = (d) => { S.calDay = Number(d); };
ACT.calSync = () => { S.toast = 'Kalendoriaus nuoroda paruošta. Įklijuokite ją į Google arba Apple kalendorių.'; };
ACT.parentThread = (k) => { S.parentThread = k; S.msgDraft = ''; if (k === 'rasa') S.unread.parent = 0; };
ACT.parentMonth = (m) => { S.parentMonth = m; };
ACT.askCoach = () => { S.parentThread = 'rasa'; S.unread.parent = 0; S.cur.tevai = 'pokalbiai'; };
