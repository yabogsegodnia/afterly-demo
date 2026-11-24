// Apvalkalas: vaidmenų jungiklis, apatinė juosta, piešimas, įvykiai, QR
const ROLES = {
  treneris: { name: 'Mantas', who: 'Treneris · U12', av: 'M', key: '1',
    hint: 'Atsakykite tėvų paskyroje į turnyrą arba sumokėkite, tada grįžkite čia: skaičiai jau atnaujinti. Pranešimas, kurį čia parašysite, iškart atsiras tėvų Pradžioje.',
    tabs: [['siandien', 'Šiandien', 'home'], ['pranesimai', 'Pranešimai', 'bell'], ['grupe', 'Grupė', 'users'], ['mokejimai', 'Mokėjimai', 'wallet'], ['pokalbiai', 'Pokalbiai', 'chat']] },
  tevai: { name: 'Rasa', who: 'Ugnės mama', av: 'R', key: '2',
    hint: 'Pažymėkite, kad Ugnė dalyvaus turnyre, sumokėkite 40 € ir parašykite treneriui. Tada perjunkite į trenerio ar vaiko paskyrą.',
    tabs: [['pradzia', 'Pradžia', 'home'], ['kalendorius', 'Kalendorius', 'cal'], ['paieska', 'Paieška', 'search'], ['pokalbiai', 'Pokalbiai', 'chat'], ['ugne', 'Ugnė', 'chart']] },
  vaikas: { name: 'Ugnė', who: 'Vaikas · 11 m.', av: 'U', key: '3',
    hint: 'Vaikas mato savo treniruotes, trenerio tikslus ir komandos naujienas. Pokalbių su suaugusiais ir mokėjimų čia nėra.',
    tabs: [['siandien', 'Šiandien', 'home'], ['tikslai', 'Tikslai', 'target'], ['komanda', 'Komanda', 'users']] }
};
const HASH = { treneris: 'treneris', tevai: 'tevai', vaikas: 'vaikas' };
const $ = (id) => document.getElementById(id);
let toastTimer = null;
let lastKey = '';
const scrollMap = {}; // ekrano slinkties padėtis, kad „Atgal“ grįžtų į tą pačią vietą

function pip(role, tab) {
  if (role === 'treneris' && tab === 'pokalbiai') return S.unread.coach;
  if (role === 'tevai' && tab === 'pokalbiai') return S.unread.parent;
  return 0;
}

function renderPanel() {
  $('roles').innerHTML = Object.keys(ROLES).map((r) => {
    const R = ROLES[r];
    return `<button type="button" class="role" aria-pressed="${S.role === r}" data-act="role" data-arg="${r}"><span class="avatar${r === 'treneris' ? ' ink' : ''}" aria-hidden="true">${R.av}</span><span class="who"><b>${R.name}</b><span>${R.who}</span></span><kbd>${R.key}</kbd></button>`;
  }).join('');
  $('mtop').innerHTML = Object.keys(ROLES).map((r) => `<button type="button" aria-pressed="${S.role === r}" data-act="role" data-arg="${r}">${r === 'treneris' ? 'Treneris' : r === 'tevai' ? 'Tėvai' : 'Vaikas'}</button>`).join('') +
    '<button type="button" class="mreset" data-act="reset">Iš naujo</button><span class="mproto">Prototipas · duomenys sugalvoti</span>';
  const scr = SCREENS[S.role];
  $('jump').innerHTML = Object.keys(scr).filter((k) => scr[k].title).map((k) =>
    `<button type="button" aria-current="${S.cur[S.role] === k}" data-act="jump" data-arg="${k}">${scr[k].title}</button>`).join('');
  $('hint').textContent = ROLES[S.role].hint;
}

function render() {
  const role = S.role;
  const name = S.cur[role];
  const screen = SCREENS[role][name];
  const key = role + ':' + name;
  const app = $('app');
  const oldMain = app.querySelector('.main');
  if (oldMain) scrollMap[lastKey] = { top: oldMain.scrollTop, chips: [...app.querySelectorAll('.chips')].map((c) => c.scrollLeft) };
  const keep = scrollMap[key] || { top: 0, chips: [] };
  const focused = document.activeElement && document.activeElement.closest && document.activeElement.closest('[data-act]');
  const inPanel = focused && focused.closest('.panel, .mtop');

  if (key !== lastKey) {
    if (key === 'treneris:turnyras') S.turnyrasBack = lastKey === 'treneris:siandien' ? 'siandien' : 'pranesimai';
    if (key === 'treneris:lankomumas') S.absent = S.absentSaved.slice();
  }
  if (role === 'treneris' && name === 'pokalbis' && S.coachThread === 'rasa') S.unread.coach = 0;
  const focusSel = focused ? `[data-act="${focused.dataset.act}"]${focused.dataset.arg !== undefined ? `[data-arg="${CSS.escape(focused.dataset.arg)}"]` : ''}` : null;

  if (role === 'tevai' && name === 'pokalbiai' && S.parentThread === 'rasa') S.unread.parent = 0;
  if (role === 'tevai' && name === 'ugne') S.fbNew = false;

  const tabs = ROLES[role].tabs.map((t) => {
    const n = pip(role, t[0]);
    return `<button type="button" class="tab" data-act="go" data-arg="${t[0]}"${screen.tab === t[0] ? ' aria-current="page"' : ''}>${icon(t[2])}${t[1]}${n ? `<span class="pip">${n}</span>` : ''}</button>`;
  }).join('');
  app.innerHTML = screen.render() + `<nav class="tabbar" aria-label="Meniu">${tabs}</nav>` + (S.toast ? `<div class="toast" aria-hidden="true">${esc(S.toast)}</div>` : '');
  $('live').textContent = S.toast || '';

  const main = app.querySelector('.main');
  if (main) main.scrollTop = main.hasAttribute('data-autoscroll') ? main.scrollHeight : keep.top;
  app.querySelectorAll('.chips').forEach((c, i) => { c.scrollLeft = keep.chips[i] || 0; });
  const changed = key !== lastKey && lastKey !== '';
  lastKey = key;
  renderPanel();
  if (focusSel && inPanel) {
    const el = inPanel.closest('.panel, .mtop').querySelector(focusSel);
    if (el) el.focus({ preventScroll: true });
  } else if (changed && main) {
    main.setAttribute('tabindex', '-1');
    main.focus({ preventScroll: true });
  } else if (focusSel) {
    const el = app.querySelector(focusSel);
    if (el) el.focus({ preventScroll: true });
  }

  if (S.toast) {
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { S.toast = null; const t = app.querySelector('.toast'); if (t) t.remove(); $('live').textContent = ''; }, 3800);
  }
}

function setRole(r) {
  if (!ROLES[r]) return;
  S.role = r; S.toast = null; S.msgDraft = '';
  if (location.hash.slice(1) !== HASH[r]) history.replaceState(null, '', '#' + HASH[r]);
}

ACT.role = (r) => setRole(r);
ACT.jump = (k) => { S.cur[S.role] = k; if (k === 'pazanga') S.edit = kidCard('Ugnė K.'); };
ACT.reset = () => { const r = S.role; S = initialState(); S.role = r; };

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-act]');
  if (!el || el.disabled) return;
  const fn = ACT[el.dataset.act];
  if (!fn) return;
  if (el.dataset.act === 'go' || el.dataset.act === 'jump' || el.dataset.act === 'role') S.toast = null;
  fn(el.dataset.arg, el);
  render();
});

function setModel(path, value) {
  const parts = path.split('.');
  let o = S;
  for (let i = 0; i < parts.length - 1; i++) o = o[parts[i]];
  o[parts[parts.length - 1]] = value;
}

document.addEventListener('input', (e) => {
  const el = e.target;
  if (!el.dataset || !el.dataset.model || el.tagName === 'SELECT') return;
  setModel(el.dataset.model, el.value);
  if (el.dataset.live === 'results') $('results').innerHTML = resultsHtml();
});
document.addEventListener('change', (e) => {
  const el = e.target;
  if (el.tagName !== 'SELECT' || !el.dataset.model) return;
  setModel(el.dataset.model, el.value);
  $('results').innerHTML = resultsHtml();
});
document.addEventListener('submit', (e) => {
  const form = e.target.closest('[data-submit]');
  if (!form) return;
  e.preventDefault();
  ACT[form.dataset.submit]();
  render();
  const input = $('msg');
  if (input) input.focus();
});
document.addEventListener('keydown', (e) => {
  if (e.target.closest('input, textarea, select') || e.metaKey || e.ctrlKey || e.altKey) return;
  const r = Object.keys(ROLES).find((k) => ROLES[k].key === e.key);
  if (r) { setRole(r); render(); }
});
window.addEventListener('hashchange', () => {
  const h = location.hash.slice(1);
  if (h === 'paieska') { setRole('tevai'); S.cur.tevai = 'paieska'; render(); return; }
  if (ROLES[h] && h !== S.role) { setRole(h); render(); }
});

function renderQr() {
  const box = $('qr');
  if (!box || !D.shareUrl) return;
  $('qr-url').textContent = D.shareUrl.replace('https://', '');
  try {
    const qr = window.qrcode(0, 'M');
    qr.addData(D.shareUrl);
    qr.make();
    box.innerHTML = qr.createSvgTag({ cellSize: 4, margin: 16, scalable: true });
  } catch (err) {
    box.hidden = true;
  }
}

(function start() {
  const h = location.hash.slice(1);
  if (h === 'paieska') { S.role = 'tevai'; S.cur.tevai = 'paieska'; }
  else if (ROLES[h]) S.role = h;
  render();
  renderQr();
})();
