// Visi duomenys sugalvoti prototipui. Šiandiena demonstracijoje: 2026-11-24, antradienis.
window.DATA = {
  appName: 'Trenija',
  shareUrl: 'https://yabogsegodnia.github.io/afterly-demo/',
  club: 'KK Šuolis',
  group: 'U12',
  price: 65,
  nvs: 25,
  kids: [
    'Ugnė K.', 'Jokūbas M.', 'Austėja P.', 'Matas R.', 'Emilija S.', 'Lukas V.',
    'Gabija B.', 'Dominykas Č.', 'Kamilė D.', 'Nojus G.', 'Liepa J.', 'Benas L.',
    'Urtė N.', 'Joris O.', 'Saulė Š.', 'Tajus T.', 'Miglė U.', 'Kajus Ž.',
    'Rugilė A.', 'Herkus E.', 'Smiltė I.', 'Arnas K.', 'Elzė M.', 'Vakaris P.'
  ],
  // Gruodžio mokesčio dar nesumokėjo (terminas gruodžio 5)
  unpaid: ['Ugnė K.', 'Matas R.', 'Gabija B.', 'Nojus G.', 'Arnas K.'],
  // Į turnyrą: 16 taip, 3 ne, 5 neatsakė
  rsvpNo: ['Joris O.', 'Elzė M.', 'Herkus E.'],
  rsvpOpen: ['Ugnė K.', 'Lukas V.', 'Kamilė D.', 'Benas L.', 'Tajus T.'],
  absentToday: ['Kajus Ž.', 'Smiltė I.'],
  skills: ['Varymas', 'Metimas', 'Gynyba', 'Komandinis žaidimas', 'Pastangos'],
  ugne: {
    nov: { scores: [4, 3, 4, 5, 5], prev: [3, 3, 3, 4, 5], attend: '6 iš 6', date: 'Lapkričio 24',
      comment: 'Ugnė šį mėnesį daug drąsiau gina vienas prieš vieną ir nebebijo kontakto. Metimui iš vidutinio nuotolio trūksta kojų darbo: namuose užtenka 10 min. per dieną.',
      goal: 'Pataikyti 10 iš 20 baudos metimų',
      kidNote: 'Ugne, šį mėnesį gini drąsiau ir nebebijai kontakto. Namuose – 10 min. metimų per dieną.' },
    oct: { scores: [3, 3, 3, 4, 5], prev: [3, 2, 3, 4, 5], attend: '8 iš 9', date: 'Spalio 28',
      comment: 'Gerai įsiliejo į naują grupę, visada pirma ateina į treniruotę. Gynyboje dar vengia kontakto, dirbsime su tuo lapkritį.',
      goal: 'Gynyboje laikyti žemą stovėseną visą pratimą',
      kidNote: 'Smagu, kad visada ateini pirma. Lapkritį mokysimės gintis drąsiau.' }
  },
  notices: [
    { id: 'turnyras', kind: 'Svarbu', title: 'Kalėdinis turnyras Kaune', rsvp: true, deadline: 'gruodžio 5', time: 'Pr 14:05', read: 21,
      text: 'Gruodžio 13 d. Išvykstame 7:30 nuo sporto centro, grįžtame apie 19:00. Kelionė autobusu – 12 €.' },
    { id: 'kt', kind: 'Tvarkaraštis', title: 'Ketvirtadienį treniruotė 17:30, ne 17:00', rsvp: false, time: 'Pr 09:12', read: 24,
      text: 'Salėje vyks mokyklos renginys, todėl pradedame pusvalandžiu vėliau.' }
  ],
  threads: {
    rasa: { title: 'Rasa (Ugnės mama)', msgs: [
      { from: 'rasa', text: 'Laba diena, ar Ugnei reikia savo kamuolio turnyrui?', time: 'Pr 18:42' },
      { from: 'coach', text: 'Laba diena! Nereikia, kamuolius vešimės klubo. Užtenka dviejų marškinėlių ir gertuvės.', time: 'Pr 19:05' },
      { from: 'rasa', text: 'Ačiū!', time: 'Pr 19:06' }
    ] },
    jokubas: { title: 'Tomas (Jokūbo tėtis)', msgs: [
      { from: 'tomas', who: 'Tomas', text: 'Jokūbas ketvirtadienį vėluos apie 15 min., nuo anglų kalbos.', time: '12:31' }
    ] },
    group: { title: 'U12 tėvai', msgs: [
      { from: 'tomas', who: 'Jokūbo tėtis', text: 'Gal kas važiuoja į turnyrą savo mašina? Turiu 2 laisvas vietas.', time: '15:10' },
      { from: 'egle', who: 'Austėjos mama', text: 'Mes važiuojam autobusu, bet grįždami galim paimti vieną vaiką.', time: '15:24' }
    ] }
  },
  calendar: {
    nov: { label: 'Lapkritis', gen: 'lapkričio', first: 6, days: 30, train: [3, 5, 10, 12, 17, 19, 24, 26],
      special: { 26: [{ t: 'Treniruotė 17:30–19:00', s: 'Pakeistas laikas · salė Nr. 2', imp: true }] } },
    dec: { label: 'Gruodis', gen: 'gruodžio', first: 1, days: 31, train: [1, 3, 8, 10, 15, 17],
      special: {
        5: [{ t: 'Terminas: mokestis ir atsakymas dėl turnyro', s: 'Gruodžio mokestis 40 €', imp: true }],
        13: [{ t: 'Kalėdinis turnyras, Kaunas', s: 'Išvykimas 7:30 · grįžimas apie 19:00', imp: true }],
        19: [{ t: 'Sezono šventė su tėvais', s: '12:00 · sporto centro kavinė', imp: false }]
      },
      breakFrom: 22 }
  },
  sports: ['Visi', 'Krepšinis', 'Futbolas', 'Plaukimas', 'Šokiai', 'Imtynės', 'Tenisas', 'Gimnastika'],
  districts: ['Visi rajonai', 'Antakalnis', 'Žirmūnai', 'Naujamiestis', 'Pašilaičiai', 'Fabijoniškės', 'Šeškinė', 'Pilaitė', 'Lazdynai'],
  coaches: [
    { id: 'mantas', name: 'Mantas Žilinskas', dat: 'Mantui Žilinskui', club: 'KK Šuolis', sport: 'Krepšinis', district: 'Žirmūnai', ages: [9, 12], price: 65, nvs: true, trial: true, rating: 4.9, reviews: 38, years: 8, spots: 2,
      days: 'An ir Kt 17:00', about: 'B kategorijos krepšinio treneris. Dirbu su mergaičių ir berniukų grupėmis, daug dėmesio skiriu pagrindams ir pasitikėjimui savimi.',
      slots: ['Kt, lapkr. 26 · 17:30', 'An, gruodž. 1 · 17:00', 'Kt, gruodž. 3 · 17:00'],
      quotes: [['Inga, Mato mama', 'Per pusmetį sūnus iš drovaus tapo tuo, kuris pirmas eina į aikštelę.'], ['Paulius, Gabijos tėtis', 'Visada žinom, kas vyksta: tvarkaraštis, mokėjimai ir atsiliepimai vienoje vietoje.']] },
    { id: 'ieva', name: 'Ieva Kairytė', dat: 'Ievai Kairytei', club: 'Banga plaukimo mokykla', sport: 'Plaukimas', district: 'Antakalnis', ages: [6, 10], price: 70, nvs: true, trial: true, rating: 4.8, reviews: 52, years: 11, spots: 4,
      days: 'Pr ir Tr 16:00', about: 'Mokau plaukti nuo nulio. Grupėje iki 8 vaikų, kad kiekvienas būtų matomas.',
      slots: ['Tr, lapkr. 25 · 16:00', 'Pr, lapkr. 30 · 16:00'],
      quotes: [['Rūta, Dovydo mama', 'Po dviejų mėnesių septynmetis Dovydas nebebijo nerti.']] },
    { id: 'tadas', name: 'Tadas Morkūnas', dat: 'Tadui Morkūnui', club: 'FA Šiaurės vilkai', sport: 'Futbolas', district: 'Pašilaičiai', ages: [7, 11], price: 45, nvs: true, trial: true, rating: 4.7, reviews: 64, years: 6, spots: 6,
      days: 'Pr, Tr, Pn 17:30', about: 'C kategorijos trenerio licencija. Treniruotės lauke iki lapkričio, žiemą maniežas.',
      slots: ['Tr, lapkr. 25 · 17:30', 'Pn, lapkr. 27 · 17:30'],
      quotes: [['Giedrius, Eimanto tėtis', 'Aišku, kada mokėti ir kiek grąžina krepšelis.']] },
    { id: 'greta', name: 'Greta Vaitkutė', dat: 'Gretai Vaitkutei', club: 'Šokių studija Ritmas', sport: 'Šokiai', district: 'Naujamiestis', ages: [8, 14], price: 55, nvs: true, trial: false, rating: 4.9, reviews: 27, years: 9, spots: 1,
      days: 'Tr ir Pn 18:00', about: 'Šiuolaikinis ir hip-hopas. Du kartus per metus pasirodymas tėvams.',
      slots: ['Tr, lapkr. 25 · 18:00'],
      quotes: [['Lina, Gustės mama', 'Gustė laukia kiekvienos treniruotės.']] },
    { id: 'arturas', name: 'Artūras Petraitis', dat: 'Artūrui Petraičiui', club: 'Imtynių klubas Ąžuolas', sport: 'Imtynės', district: 'Šeškinė', ages: [8, 14], price: 40, nvs: true, trial: true, rating: 4.6, reviews: 19, years: 15, spots: 5,
      days: 'Pr ir Kt 18:00', about: 'Laisvosios imtynės. Pirmus mėnesius mokomės kritimų ir saugumo.',
      slots: ['Kt, lapkr. 26 · 18:00', 'Pr, lapkr. 30 · 18:00'],
      quotes: [['Darius, Domo tėtis', 'Treneris kas mėnesį parašo, ką Domui reikia gerinti.']] },
    { id: 'aiste', name: 'Aistė Rimkė', dat: 'Aistei Rimkei', club: 'Teniso akademija Smash', sport: 'Tenisas', district: 'Pilaitė', ages: [6, 12], price: 85, nvs: false, trial: true, rating: 4.8, reviews: 31, years: 7, spots: 3,
      days: 'Tr ir Št 10:00', about: 'Mini tenisas mažiesiems, nuo 9 metų – pilnas kortas.',
      slots: ['Št, lapkr. 28 · 10:00'],
      quotes: [['Agnė, Augustės mama', 'Patogu, kad praleistą treniruotę galima perkelti programėlėje.']] },
    { id: 'karolis', name: 'Karolis Dambrauskas', dat: 'Karoliui Dambrauskui', club: 'KK Šuolis', sport: 'Krepšinis', district: 'Žirmūnai', ages: [12, 14], price: 65, nvs: true, trial: false, rating: 4.7, reviews: 22, years: 5, spots: 0,
      days: 'Pr, Tr, Pn 18:30', about: 'U14 grupė, ruošiamės miesto pirmenybėms.',
      slots: [],
      quotes: [['Vytautas, Kristupo tėtis', 'Reiklus, bet sąžiningas.']] },
    { id: 'monika', name: 'Monika Stankutė', dat: 'Monikai Stankutei', club: 'Gimnastikos klubas Lankas', sport: 'Gimnastika', district: 'Lazdynai', ages: [5, 9], price: 50, nvs: true, trial: true, rating: 5.0, reviews: 14, years: 4, spots: 2,
      days: 'An ir Kt 16:30', about: 'Meninė gimnastika mergaitėms ir berniukams. Lankstumas, koordinacija, žaidimai.',
      slots: ['Kt, lapkr. 26 · 16:30', 'An, gruodž. 1 · 16:30'],
      quotes: [['Jurga, Viltės mama', 'Viltė grįžta pavargusi ir laiminga.']] },
    { id: 'rokas', name: 'Rokas Gudaitis', dat: 'Rokui Gudaičiui', club: 'FA Šiaurės vilkai', sport: 'Futbolas', district: 'Fabijoniškės', ages: [10, 14], price: 45, nvs: true, trial: true, rating: 4.5, reviews: 41, years: 3, spots: 3,
      days: 'An, Kt 18:00, Št 11:00', about: 'Žaidžiame Vilniaus vaikų lygoje. Daug žaidimo, mažai stovėjimo eilėje.',
      slots: ['Kt, lapkr. 26 · 18:00', 'Št, lapkr. 28 · 11:00'],
      quotes: [['Simona, Kotrynos mama', 'Kotryna vienintelė mergaitė komandoje ir jaučiasi sava.']] }
  ]
};
