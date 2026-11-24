// Bendra būsena ir HTML pagalbinės funkcijos. Ekranai registruojasi į SCREENS, veiksmai – į ACT.
const D = window.DATA;
const SCREENS = { treneris: {}, tevai: {}, vaikas: {} };
const ACT = {};

const ICONS = {
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>',
  cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
  chart: '<path d="M4 19V5"/><path d="M4 19h16"/><path d="m7 15 4-4 3 3 5-6"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7"/><path d="M18 14.5a6.5 6.5 0 0 1 3.5 5.5"/>',
  wallet: '<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18"/><path d="M16 15h2"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  back: '<path d="m15 6-6 6 6 6"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  send: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  chev: '<path d="m9 6 6 6-6 6"/>'
};

function icon(name, size = 24, sw = 1.8) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function eur(n) { return n.toLocaleString('lt-LT') + ' €'; }

function initialState() {
  const fb = JSON.parse(JSON.stringify(D.ugne));
  return {
    role: 'tevai',
    cur: { treneris: 'siandien', tevai: 'pradzia', vaikas: 'siandien' },
    toast: null,
    notices: D.notices.map((n) => Object.assign({}, n)),
    rsvp: {},
    draft: { kind: 'Svarbu', title: '', text: '', rsvp: true },
    autoRemind: true,
    reminded: {},
    absent: D.absentToday.slice(), absentSaved: D.absentToday.slice(),
    attendanceSaved: false,
    paid: false, payMethod: 'bank', autopay: false,
    fb: fb, fbNew: false,
    cardsLeft: ['Lukas V.', 'Tajus T.', 'Rugilė A.'],
    edit: null,
    threads: JSON.parse(JSON.stringify(D.threads)),
    parentThread: 'rasa', coachThread: 'rasa',
    unread: { coach: 0, parent: 0 },
    msgDraft: '',
    parentMonth: 'nov', calMonth: 'nov', calDay: 24,
    goals: { home: true, coach: false, def: false },
    find: { q: '', sport: 'Visi', district: 'Visi rajonai', age: '0', nvs: false, trial: false },
    coachId: null, slot: null, booked: [], waitlist: [], turnyrasBack: 'pranesimai'
  };
}
let S = initialState();

// Išvestiniai duomenys, kuriuos mato keli vaidmenys
function rsvpStats(id) {
  if (id === 'turnyras') {
    let yes = D.kids.length - D.rsvpNo.length - D.rsvpOpen.length, no = D.rsvpNo.length, open = D.rsvpOpen.length;
    if (S.rsvp.turnyras === 'yes') { yes++; open--; }
    if (S.rsvp.turnyras === 'no') { no++; open--; }
    return { yes, no, open, openList: D.rsvpOpen.filter((k) => !(k === 'Ugnė K.' && S.rsvp.turnyras)), noList: D.rsvpNo.concat(S.rsvp.turnyras === 'no' ? ['Ugnė K.'] : []) };
  }
  const a = S.rsvp[id];
  return { yes: a === 'yes' ? 1 : 0, no: a === 'no' ? 1 : 0, open: a ? 23 : 24, openList: [], noList: [] };
}
function unpaidList() { return D.unpaid.filter((k) => !(k === 'Ugnė K.' && S.paid)); }
function parentFee() { return D.price - D.nvs; }

// Mažos dalys
function hdr(eyebrow, title, right) {
  return `<header class="hdr"><div class="t"><span class="eyebrow">${eyebrow}</span><h1 class="h1">${title}</h1></div>${right || ''}</header>`;
}
function subhdr(title, backTo) {
  return `<header class="hdr sub"><button type="button" class="back" aria-label="Atgal" data-act="go" data-arg="${backTo}">${icon('back', 24, 2)}</button><h1 class="h1 sm">${title}</h1></header>`;
}
function chip(label, pressed, act, arg) {
  return `<button type="button" class="chip" aria-pressed="${pressed}" data-act="${act}" data-arg="${esc(arg)}">${esc(label)}</button>`;
}
function toggleRow(label, sub, on, act) {
  return `<button type="button" class="toggle-row" role="switch" aria-checked="${on}" data-act="${act}"><span class="col"><span class="strong">${label}</span>${sub ? `<span class="small muted">${sub}</span>` : ''}</span><span class="switch"></span></button>`;
}
function dots(n, label) {
  let h = '';
  for (let i = 1; i <= 5; i++) h += `<span class="dot${i <= n ? ' on' : ''}"></span>`;
  return `<span class="dots" role="img" aria-label="${esc(label)}: ${n} iš 5">${h}</span>`;
}
// Lietuviškas daugiskaitos linksnis pagal skaičių: 1 vieta, 2 vietos, 10 vietų
function lt(n, one, few, many) {
  if (n % 10 === 1 && n % 100 !== 11) return one;
  return n % 10 === 0 || (n % 100 >= 11 && n % 100 <= 19) ? many : few;
}
function initials(name) { return name.split(' ').map((p) => p[0]).join('').slice(0, 2); }
function bar(parts) {
  const total = parts.reduce((a, p) => a + p[0], 0) || 1;
  return `<div class="bar" aria-hidden="true">${parts.map((p) => `<span class="${p[1]}" style="width:${(p[0] / total) * 100}%"></span>`).join('')}</div>`;
}
function thread(msgs, me) {
  return `<div class="thread">${msgs.map((m) => m.from === me
    ? `<div class="bubble mine"><span>${esc(m.text)}</span><span class="tm">${esc(m.time)}</span></div>`
    : `<div class="bubble theirs"><span class="who">${esc(m.who || (m.from === 'coach' ? 'Treneris Mantas' : m.from === 'rasa' ? 'Rasa (Ugnės mama)' : m.from))}</span><span>${esc(m.text)}</span><span class="tm">${esc(m.time)}</span></div>`).join('')}</div>`;
}
function composer(placeholder) {
  return `<form class="composer" data-submit="send"><label class="sr" for="msg">Žinutė</label><input id="msg" class="input" type="text" autocomplete="off" placeholder="${placeholder}" data-model="msgDraft" value="${esc(S.msgDraft)}"><button type="submit" class="send" aria-label="Siųsti">${icon('send', 20, 2)}</button></form>`;
}

// Bendri veiksmai
ACT.go = (arg) => { S.cur[S.role] = arg; };
ACT.send = () => {
  const text = S.msgDraft.trim();
  if (!text) return;
  const asCoach = S.role === 'treneris';
  const key = asCoach ? S.coachThread : S.parentThread;
  S.threads[key].msgs.push({ from: asCoach ? 'coach' : 'rasa', text, time: 'Dabar' });
  S.msgDraft = '';
  if (key === 'rasa') { if (asCoach) S.unread.parent++; else S.unread.coach++; }
};
