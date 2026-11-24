// Vaiko (Ugnės, 11 m.) ekranai: tik savo tvarkaraštis, tikslai ir komandos naujienos
const K = SCREENS.vaikas;

function kidGoals() {
  return [
    ['home', '10 min. metimų namuose', 'Šiandien'],
    ['coach', S.fb.nov.goal, 'Trenerio tikslas · iki gruodžio 13'],
    ['def', 'Žemai stovėti gynyboje visą pratimą', 'Treniruotėje']
  ];
}

K.siandien = { tab: 'siandien', title: 'Šiandien', render() {
  const a = S.rsvp.turnyras;
  const streak = 6 + (S.attendanceSaved && !S.absentSaved.includes('Ugnė K.') ? 1 : 0);
    let bars = '';
  for (let i = 0; i < 7; i++) bars += `<i${i < streak ? '' : ' class="next"'}></i>`;
  return hdr('KK Šuolis U12', 'Labas, Ugne!', '<span class="avatar lg" aria-hidden="true" style="width:44px;height:44px;font-size:16px">U</span>') + `<main class="main">
    <section class="card dark">
      <span class="small muted">Šiandien · salė Nr. 2</span>
      <span class="big">Treniruotė 17:00</span>
      <span class="small muted">Kita – ketvirtadienį 17:30, pusvalandžiu vėliau nei visada</span>
    </section>
    <section class="card">
      <span class="row start"><span class="avatar ink" aria-hidden="true">M</span><span class="col"><span class="strong">Treneris Mantas</span><span class="small muted">rašo tau</span></span></span>
      <p class="p">${esc(S.fb.nov.kidNote)}</p>
      <button type="button" class="btn link sm" style="align-self:flex-start" data-act="go" data-arg="tikslai">Mano tikslai</button>
    </section>
    <section class="card ${a === 'no' ? '' : 'accent'}">
      <span class="xs strong" style="color:var(--accent-ink)">Gruodžio 13</span>
      <span class="ttl">Kalėdinis turnyras Kaune</span>
      <span class="small">${a === 'yes' ? 'Mama patvirtino, kad važiuoji. Pasiimk 2 marškinėlius ir gertuvę.' : a === 'no' ? 'Šį kartą nevažiuoji.' : 'Laukiam mamos atsakymo iki gruodžio 5.'}</span>
    </section>
    <section class="card"><span class="row"><span class="col"><span class="strong">${streak} treniruotės iš eilės</span><span class="small muted">${streak < 7 ? 'Ateik šiandien ir bus 7' : 'Rekordas! Kitas tikslas – 10'}</span></span><span class="streak" aria-hidden="true">${bars}</span></span></section>
  </main>`;
} };

K.tikslai = { tab: 'tikslai', title: 'Tikslai', render() {
  const goals = kidGoals();
  const done = goals.filter((g) => S.goals[g[0]]).length;
  const f = S.fb.nov;
  return hdr('Lapkritis', 'Mano tikslai') + `<main class="main">
    <section class="card">
      <span class="row"><span class="strong">Šią savaitę</span><span class="small muted num">${done} iš ${goals.length}</span></span>
      ${goals.map((g) => `<button type="button" class="check" role="checkbox" aria-checked="${!!S.goals[g[0]]}" data-act="goal" data-arg="${g[0]}"><span class="box">${S.goals[g[0]] ? icon('check', 16, 3) : ''}</span><span class="col"><span class="lbl strong">${esc(g[1])}</span><span class="xs muted">${g[2]}</span></span></button>`).join('')}
    </section>
    <h2 class="sec">Ką jau moku</h2>
    <section class="card tight">${D.skills.map((s, i) => `<div class="item"><span class="strong">${s}</span>${dots(f.scores[i], s)}</div>`).join('')}</section>
    <p class="foot-note">Taškus kas mėnesį pažymi treneris. Tėvai mato tą patį.</p>
  </main>`;
} };

K.komanda = { tab: 'komanda', title: 'Komanda', render() {
  return hdr('24 žaidėjai · treneris Mantas', 'Komanda U12') + `<main class="main">
    <h2 class="sec">Trenerio naujienos</h2>
    ${S.notices.map((n) => `<section class="card"><span class="row"><span class="badge${n.kind === 'Svarbu' ? '' : ' calm'}">${esc(n.kind)}</span><span class="xs muted">${esc(n.time)}</span></span><span class="strong">${esc(n.title)}</span>${n.text ? `<span class="small muted">${esc(n.text)}</span>` : ''}</section>`).join('')}
    <h2 class="sec">Komandos draugai</h2>
    <section class="card"><div class="chips wrap" style="gap:6px">${D.kids.map((k) => `<span class="tag">${k.split(' ')[0]}</span>`).join('')}</div></section>
    <p class="note">Vaiko paskyroje nėra pokalbių su suaugusiais ir mokėjimų. Tai mato tik tėvai.</p>
  </main>`;
} };

ACT.goal = (k) => { S.goals[k] = !S.goals[k]; };
