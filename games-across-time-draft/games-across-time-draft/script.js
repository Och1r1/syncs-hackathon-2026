const countries = {
  vietnam: {
    number: '001 / 003', country: 'Vietnam', seal: '★', stamp: 'VN',
    game: 'Ô Ăn Quan', alias: 'Also known as Ô Quan · a traditional Vietnamese strategy game.',
    description: 'A counting and strategy game remembered across generations in Vietnam. Its simple board hides careful planning, mental arithmetic and a strong social tradition.',
    preview: 'assets/vn-preview.png', title: 'Ô Ăn Quan Board', type: 'Game board',
    steps: [
      'Players distribute pieces through the board’s small fields.',
      'Pieces are collected and redistributed according to the next field.',
      'The aim is to capture more pieces through careful counting and timing.'
    ]
  },
  japan: {
    number: '002 / 003', country: 'Japan', seal: '日', stamp: 'JP',
    game: 'Kemari', alias: 'A ceremonial ball game associated with Japan’s imperial court.',
    description: 'Kemari is cooperative rather than competitive. Players keep a ball in the air together, turning graceful movement, clothing and ritual into part of the experience.',
    preview: 'assets/jp-card.png', title: 'Kemari Ball', type: 'Ceremonial ball',
    steps: [
      'Players form a circle in a defined playing area.',
      'The ball is kept in the air using controlled kicks.',
      'The shared goal is rhythm, elegance and keeping the rally alive.'
    ]
  },
  ghana: {
    number: '003 / 003', country: 'Ghana', seal: '✦', stamp: 'GH',
    game: 'Oware', alias: 'A member of the mancala family of sowing and counting games.',
    description: 'Oware transforms a simple row of pits and seeds into a deep strategy game. It has long been played socially across West Africa and passed on through direct teaching.',
    preview: 'assets/gh-card.png', title: 'Oware Board', type: 'Sowing board',
    steps: [
      'Choose one of your pits and pick up all of its seeds.',
      'Sow the seeds one by one into the following pits.',
      'Capture according to the board state and finish with the larger store.'
    ]
  }
};

let current = 'vietnam';
let step = 0;

const q = sel => document.querySelector(sel);
const qa = sel => [...document.querySelectorAll(sel)];

function selectCountry(key) {
  current = key;
  step = 0;
  const c = countries[key];
  q('#entryNumber').textContent = c.number;
  q('#countryName').textContent = c.country;
  q('#flagSeal').textContent = c.seal;
  q('#catalogueStamp').textContent = c.stamp;
  q('#gameName').textContent = c.game;
  q('#gameAlias').textContent = c.alias;
  q('#description').textContent = c.description;
  q('#previewImage').src = c.preview;
  q('#previewImage').alt = `Preview of ${c.game}`;
  q('#videoCaption').textContent = `Watch ${c.game} being played`;
  q('#artefactTitle').textContent = c.title;
  q('#artefactOrigin').textContent = c.country;
  q('#artefactType').textContent = c.type;
  qa('[data-country]').forEach(el => el.classList.toggle('active', el.dataset.country === key));
  renderStep();

  const exhibit = q('.exhibit');
  exhibit.animate([
    {opacity:.72, transform:'translateY(6px)'},
    {opacity:1, transform:'translateY(0)'}
  ], {duration:260, easing:'ease-out'});
}

function renderStep(){
  const c = countries[current];
  q('#stepCount').textContent = `Step ${step + 1} / 3`;
  q('#stepText').textContent = c.steps[step];
  q('#stepFocus').style.left = `${step * 33.333}%`;
}

qa('[data-country]').forEach(el => el.addEventListener('click', () => selectCountry(el.dataset.country)));
q('#nextStep').addEventListener('click', () => { step = (step + 1) % 3; renderStep(); });
q('#prevStep').addEventListener('click', () => { step = (step + 2) % 3; renderStep(); });

q('#videoPreview').addEventListener('click', () => {
  const cap = q('#videoCaption');
  const play = q('.play-button');
  if (!q('#videoPreview').classList.contains('playing')) {
    q('#videoPreview').classList.add('playing');
    play.textContent = 'Ⅱ';
    cap.textContent = 'Demo video placeholder · replace with your MP4';
  } else {
    q('#videoPreview').classList.remove('playing');
    play.textContent = '▶';
    cap.textContent = `Watch ${countries[current].game} being played`;
  }
});

const aboutDialog = q('#aboutDialog');
const artefactDialog = q('#artefactDialog');
q('#aboutBtn').addEventListener('click', () => aboutDialog.showModal());
q('#exploreBtn').addEventListener('click', () => artefactDialog.showModal());
qa('[data-close-dialog]').forEach(btn => btn.addEventListener('click', () => btn.closest('dialog').close()));
qa('dialog').forEach(d => d.addEventListener('click', e => {
  const r = d.getBoundingClientRect();
  if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) d.close();
}));

qa('.nav-item').forEach(btn => btn.addEventListener('click', () => {
  qa('.nav-item').forEach(x => x.classList.remove('active'));
  btn.classList.add('active');
  const id = btn.dataset.section;
  const target = document.getElementById(id);
  if (target) target.scrollIntoView({behavior:'smooth', block:'start'});
}));

// A lightweight fake 3D interaction so the modal already feels interactive before a GLB is added.
let dragging = false, lastX = 0, lastY = 0, rx = -8, ry = -12;
const model = q('#modelPlaceholder');
model.addEventListener('pointerdown', e => { dragging = true; lastX = e.clientX; lastY = e.clientY; model.setPointerCapture(e.pointerId); model.style.cursor='grabbing'; });
model.addEventListener('pointermove', e => {
  if (!dragging) return;
  ry += (e.clientX-lastX)*.45; rx -= (e.clientY-lastY)*.35;
  lastX=e.clientX; lastY=e.clientY;
  model.style.transform=`perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg)`;
});
model.addEventListener('pointerup', () => { dragging=false; model.style.cursor='grab'; });
model.addEventListener('pointercancel', () => { dragging=false; model.style.cursor='grab'; });

selectCountry('vietnam');
