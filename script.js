(function () {
  var LESSONS = [
    { title: 'One-step equations', text: 'You had x donuts, bought 7 more, and now have 12. Solve x + 7 = 12.', answer: 5, hint: 'Subtract 7 from both sides.' },
    { title: 'Two-step equations', text: '3 boxes with x donuts each, plus 4 loose donuts, make 19 donuts. Solve 3x + 4 = 19.', answer: 5, hint: 'Subtract 4 first, then divide by 3.' },
    { title: 'Distributive property', text: 'Solve 2(x + 3) = 14.', answer: 4, hint: 'Distribute: 2x + 6 = 14. Then subtract 6 and divide by 2.' },
    { title: 'Variables on both sides', text: 'Solve 5x \u2212 3 = 2x + 12.', answer: 5, hint: 'Subtract 2x from both sides, add 3, then divide by 3.' },
    { title: 'Slope', text: 'A line passes through (1, 2) and (3, 8). What is its slope?', answer: 3, hint: 'Slope = (y\u2082 \u2212 y\u2081) \u00f7 (x\u2082 \u2212 x\u2081) = (8 \u2212 2) \u00f7 (3 \u2212 1).' },
    { title: 'Linear functions', text: 'A shop charges C = 1.5d + 2 dollars for d donuts. Find C when d = 6.', answer: 11, hint: 'Replace d with 6: 1.5 \u00d7 6 + 2.' },
    { title: 'Inequalities', text: 'What is the smallest whole number x that makes 3x > 10 true?', answer: 4, hint: 'Divide 10 by 3 to get about 3.33. Pick the next whole number up.' },
    { title: 'Systems of equations', text: 'x + y = 10 and x \u2212 y = 4. What is x?', answer: 7, hint: 'Add the two equations to get 2x = 14.' },
    { title: 'Factoring quadratics', text: 'Solve x\u00b2 \u2212 5x + 6 = 0. What is the smaller solution?', answer: 2, hint: 'Factor into (x \u2212 2)(x \u2212 3) = 0.' }
  ];

  function ri(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
  function n(v) { return v < 0 ? '\u2212' + (-v) : String(v); }
  function sg(v) { return v < 0 ? ' \u2212 ' + (-v) : ' + ' + v; }
  function co(v) { return v === 1 ? '' : v === -1 ? '\u2212' : n(v); }
  function nz(a, b) { var v = 0; while (v === 0) v = ri(a, b); return v; }

  var TOPICS = [
    { name: 'One-step: add and subtract', gen: function () {
      var a = ri(2, 20), x = ri(-9, 15);
      return { text: 'Solve x + ' + a + ' = ' + n(x + a) + '.', answer: x, hint: 'Subtract ' + a + ' from both sides.' };
    } },
    { name: 'One-step: multiply and divide', gen: function () {
      var a = ri(2, 9), x = nz(-8, 12);
      return { text: 'Solve ' + a + 'x = ' + n(a * x) + '.', answer: x, hint: 'Divide both sides by ' + a + '.' };
    } },
    { name: 'Two-step equations', gen: function () {
      var a = ri(2, 9), b = nz(-15, 15), x = ri(-6, 12);
      return { text: 'Solve ' + a + 'x' + sg(b) + ' = ' + n(a * x + b) + '.', answer: x, hint: 'Undo the ' + n(b) + ' first, then divide by ' + a + '.' };
    } },
    { name: 'Equations with fractions', gen: function () {
      var a = ri(2, 8), b = nz(-9, 9), x = a * ri(-5, 10);
      return { text: 'Solve x/' + a + sg(b) + ' = ' + n(x / a + b) + '.', answer: x, hint: 'Undo the ' + n(b) + ', then multiply by ' + a + '.' };
    } },
    { name: 'Variables on both sides', gen: function () {
      var x = ri(-5, 10), c = ri(1, 5), a = c + ri(1, 5), b, d;
      do { b = ri(-12, 12); d = a * x + b - c * x; } while (b === 0 || d === 0);
      return { text: 'Solve ' + co(a) + 'x' + sg(b) + ' = ' + co(c) + 'x' + sg(d) + '.', answer: x, hint: 'Move the smaller x term to the other side first.' };
    } },
    { name: 'Distributive property', gen: function () {
      var a = ri(2, 6), b = nz(-8, 8), x = ri(-5, 10);
      return { text: 'Solve ' + a + '(x' + sg(b) + ') = ' + n(a * (x + b)) + '.', answer: x, hint: 'Divide both sides by ' + a + ', then undo the ' + n(b) + '.' };
    } },
    { name: 'Slope', gen: function () {
      var x1 = ri(-4, 4), dx = ri(1, 5), m = nz(-5, 5), y1 = ri(-6, 6);
      return { text: 'A line passes through (' + n(x1) + ', ' + n(y1) + ') and (' + n(x1 + dx) + ', ' + n(y1 + m * dx) + '). What is its slope?', answer: m, hint: 'Rise over run: change in y divided by change in x.' };
    } },
    { name: 'Linear functions', gen: function () {
      var m = nz(-6, 8), b = nz(-9, 9), x = ri(-4, 8);
      return { text: 'If y = ' + co(m) + 'x' + sg(b) + ', find y when x = ' + n(x) + '.', answer: m * x + b, hint: 'Replace x with ' + n(x) + ' and calculate.' };
    } },
    { name: 'Systems of equations', gen: function () {
      var x = ri(-5, 10), y = ri(-5, 10), askX = Math.random() < 0.5;
      return { text: 'x + y = ' + n(x + y) + ' and x \u2212 y = ' + n(x - y) + '. Find ' + (askX ? 'x' : 'y') + '.', answer: askX ? x : y, hint: askX ? 'Add the two equations to get 2x.' : 'Subtract the second equation from the first to get 2y.' };
    } },
    { name: 'Inequalities', gen: function () {
      var a = ri(2, 7), b;
      do { b = ri(5, 40); } while (b % a === 0);
      return { text: 'What is the smallest whole number x with ' + a + 'x > ' + b + '?', answer: Math.floor(b / a) + 1, hint: 'Divide ' + b + ' by ' + a + ', then go to the next whole number up.' };
    } },
    { name: 'Factoring quadratics', gen: function () {
      var p = ri(-6, 5), q = p + ri(1, 7), bt = -(p + q), c = p * q;
      var lin = bt === 0 ? '' : bt === 1 ? ' + x' : bt === -1 ? ' \u2212 x' : sg(bt) + 'x';
      return { text: 'Solve x\u00b2' + lin + (c === 0 ? '' : sg(c)) + ' = 0. What is the smaller solution?', answer: p, hint: 'Find two numbers that multiply to ' + n(c) + ' and add to ' + n(bt) + '.' };
    } },
    { name: 'Exponents and evaluating', gen: function () {
      var a = ri(2, 5), c = ri(2, 6), b = ri(1, 20);
      return { text: 'Evaluate ' + a + 'x\u00b2 \u2212 ' + b + ' when x = ' + c + '.', answer: a * c * c - b, hint: 'Square ' + c + ' first, then multiply, then subtract.' };
    } },
    { name: 'Absolute value', gen: function () {
      var a = ri(-5, 8), b = ri(1, 7);
      return { text: 'Solve |x' + (a === 0 ? '' : sg(-a)) + '| = ' + b + '. What is the larger solution?', answer: a + b, hint: 'Split it into two cases: the inside equals ' + b + ' or ' + n(-b) + '.' };
    } }
  ];

  function anyQuestion() { return TOPICS[ri(0, TOPICS.length - 1)].gen(); }

  var buy = document.getElementById('buy');
  var result = document.getElementById('result');
  var box = document.getElementById('lessons');
  var tabs = document.getElementById('tabs');
  var panel = document.getElementById('panel');
  var stopTimer = function () {};
  var lessonsDone = {};
  var MODES = [
    { id: 'lessons', label: 'Lessons' },
    { id: 'practice', label: 'Practice' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'timed', label: 'Timed' }
  ];


  function el(tag, cls, text) {
    var x = document.createElement(tag);
    if (cls) x.className = cls;
    if (text) x.textContent = text;
    return x;
  }

  function makeQ(q, opt) {
    var card = el('article', 'card');
    if (q.title) card.appendChild(el('h3', '', q.title));
    card.appendChild(el('p', 'qtext', q.text));
    var row = el('div', 'ask');
    var input = el('input');
    input.type = 'number';
    input.step = 'any';
    input.inputMode = 'decimal';
    input.setAttribute('aria-label', 'Your answer');
    var check = el('button', 'check', 'Check answer');
    row.appendChild(input);
    row.appendChild(check);
    card.appendChild(row);
    var fb = el('p', 'fb');
    fb.setAttribute('aria-live', 'polite');
    card.appendChild(fb);
    var finished = false;
    function lock() { input.disabled = true; check.disabled = true; }
    function submit() {
      if (finished) return;
      var v = parseFloat(input.value);
      if (isNaN(v)) { fb.textContent = 'Type a number first.'; return; }
      if (Math.abs(v - q.answer) < 0.001) {
        finished = true; fb.textContent = 'Correct!'; card.classList.add('done'); lock(); opt.onResult(true);
      } else if (opt.retry) {
        fb.textContent = 'Not yet. Hint: ' + q.hint; opt.onResult(false);
      } else {
        finished = true; fb.textContent = 'Not quite. The answer was ' + n(q.answer) + '.'; lock(); opt.onResult(false);
      }
    }
    check.onclick = submit;
    input.onkeydown = function (e) { if (e.key === 'Enter') submit(); };
    card.focusInput = function () { input.focus(); };
    return card;
  }

  function actionBtn(cls, label, fn) {
    var b = el('button', cls, label);
    b.onclick = fn;
    return b;
  }

  function lessonsMode() {
    panel.appendChild(el('p', 'mode-note', 'Nine guided problems. Wrong answers get a hint, and you can try again.'));
    var prog = el('p', 'progress');
    panel.appendChild(prog);
    function upd() { prog.textContent = Object.keys(lessonsDone).length + ' of ' + LESSONS.length + ' lessons done'; }
    LESSONS.forEach(function (l, i) {
      var q = { title: (i + 1) + '. ' + l.title, text: l.text, answer: l.answer, hint: l.hint };
      var card = makeQ(q, { retry: true, onResult: function (ok) { if (ok) { lessonsDone[i] = true; upd(); } } });
      if (lessonsDone[i]) card.classList.add('done');
      panel.appendChild(card);
    });
    upd();
  }

  function practiceMode() {
    panel.appendChild(el('p', 'mode-note', 'Endless random problems. Pick a topic or mix them all.'));
    var sel = el('select', 'pick');
    sel.setAttribute('aria-label', 'Topic');
    var all = el('option', '', 'All topics');
    all.value = '-1';
    sel.appendChild(all);
    TOPICS.forEach(function (t, i) { var o = el('option', '', t.name); o.value = String(i); sel.appendChild(o); });
    panel.appendChild(sel);
    var stat = el('p', 'stat');
    panel.appendChild(stat);
    var area = el('div');
    panel.appendChild(area);
    var streak = 0, best = 0, solved = 0;
    function upd() { stat.textContent = 'Streak ' + streak + '   Best ' + best + '   Solved ' + solved; }
    function next() {
      area.textContent = '';
      var i = parseInt(sel.value, 10);
      var q = i < 0 ? anyQuestion() : TOPICS[i].gen();
      var card = makeQ(q, { retry: true, onResult: function (ok) {
        if (ok) {
          streak++; solved++; if (streak > best) best = streak;
          area.appendChild(actionBtn('next', 'Next problem', next));
        } else { streak = 0; }
        upd();
      } });
      area.appendChild(card);
      card.focusInput();
    }
    sel.onchange = next;
    upd();
    next();
  }

  function quizMode() {
    var TOTAL = 10;
    panel.appendChild(el('p', 'mode-note', 'Ten mixed questions, one try each. See your score at the end.'));
    var area = el('div');
    panel.appendChild(area);
    var i, score;
    function start() { i = 0; score = 0; step(); }
    function step() {
      area.textContent = '';
      area.appendChild(el('p', 'stat', 'Question ' + (i + 1) + ' of ' + TOTAL));
      var card = makeQ(anyQuestion(), { retry: false, onResult: function (ok) {
        if (ok) score++;
        var last = i === TOTAL - 1;
        area.appendChild(actionBtn('next', last ? 'See results' : 'Next question', function () {
          if (last) finish(); else { i++; step(); }
        }));
      } });
      area.appendChild(card);
    }
    function finish() {
      area.textContent = '';
      var msg = score >= 9 ? 'Donut genius!' : score >= 6 ? 'Nice and glazed.' : 'Keep practicing, you are rising.';
      area.appendChild(el('p', 'big', score + ' / ' + TOTAL));
      area.appendChild(el('p', 'mode-note', msg));
      area.appendChild(actionBtn('next', 'Try again', start));
    }
    start();
  }

  function timedMode() {
    var LEN = 60;
    panel.appendChild(el('p', 'mode-note', 'Solve as many as you can in 60 seconds. Correct answers score a point.'));
    var area = el('div');
    panel.appendChild(area);
    var left, score, timer = null;
    stopTimer = function () { if (timer) { clearInterval(timer); timer = null; } };
    function intro(extra) {
      area.textContent = '';
      if (extra) { area.appendChild(el('p', 'big', extra)); }
      area.appendChild(actionBtn('start', extra ? 'Play again' : 'Start 60 seconds', run));
    }
    function run() {
      left = LEN; score = 0;
      area.textContent = '';
      var stat = el('p', 'stat');
      var holder = el('div');
      area.appendChild(stat);
      area.appendChild(holder);
      function upd() { stat.textContent = 'Time ' + left + 's   Score ' + score; }
      function nextQ() {
        holder.textContent = '';
        var card = makeQ(anyQuestion(), { retry: false, onResult: function (ok) {
          if (ok) score++;
          upd();
          setTimeout(function () { if (timer) nextQ(); }, 700);
        } });
        holder.appendChild(card);
        card.focusInput();
      }
      upd();
      nextQ();
      timer = setInterval(function () {
        left--;
        if (left <= 0) { stopTimer(); intro('Score: ' + score); } else { upd(); }
      }, 1000);
    }
    intro('');
  }

  var RUN = { lessons: lessonsMode, practice: practiceMode, quiz: quizMode, timed: timedMode };

  function showMode(id) {
    stopTimer();
    stopTimer = function () {};
    panel.textContent = '';
    Array.prototype.forEach.call(tabs.children, function (b) {
      b.setAttribute('aria-selected', b.dataset.mode === id ? 'true' : 'false');
    });
    RUN[id]();
  }

  function unlock() {
    buy.disabled = true;
    buy.textContent = 'Purchased';
    result.textContent = 'Thanks! Your modes are unlocked below.';
    box.hidden = false;
    if (!tabs.children.length) {
      MODES.forEach(function (m) {
        var b = el('button', 'tab', m.label);
        b.dataset.mode = m.id;
        b.setAttribute('role', 'tab');
        b.onclick = function () { showMode(m.id); };
        tabs.appendChild(b);
      });
      showMode('lessons');
    }
  }

  var co = document.getElementById('checkout');
  var coForm = document.getElementById('co-form');
  var coFields = document.getElementById('co-fields');
  var coSigned = document.getElementById('co-signed');
  var coEmail = document.getElementById('co-email');
  var coPass = document.getElementById('co-password');
  var coAgree = document.getElementById('co-agree');
  var coErr = document.getElementById('co-err');

  function currentUser() { return document.documentElement.dataset.user || null; }

  function openCheckout() {
    var u = currentUser();
    coForm.reset();
    coErr.textContent = '';
    coFields.hidden = !!u;
    coSigned.hidden = !u;
    if (u) coSigned.textContent = 'Signed in as ' + u;
    co.showModal();
    if (!u) coEmail.focus();
  }

  document.getElementById('co-cancel').onclick = function () { co.close(); };

  coForm.onsubmit = function (e) {
    e.preventDefault();
    var u = currentUser();
    var em = coEmail.value.trim();
    if (!u && (!em || !coPass.value)) { coErr.textContent = 'Enter an email and a password.'; return; }
    if (!coAgree.checked) { coErr.textContent = 'Check the box to agree to the terms of service.'; return; }
    if (!u) document.dispatchEvent(new CustomEvent('donutmath:signin', { detail: em }));
    co.close();
    unlock();
  };

  buy.onclick = openCheckout;
})();

(function () {
  var signin = document.getElementById('signin');
  var who = document.getElementById('who');
  var dlg = document.getElementById('auth');
  var form = document.getElementById('auth-form');
  var email = document.getElementById('email');
  var password = document.getElementById('password');
  var err = document.getElementById('auth-err');
  var user = null;

  function load() { return null; }
  function store(v) {
    if (v) document.documentElement.dataset.user = v; else delete document.documentElement.dataset.user;
  }

  function render() {
    if (user) {
      who.textContent = 'Signed in as ' + user;
      signin.textContent = 'Sign out';
    } else {
      who.textContent = '';
      signin.textContent = 'Sign in';
    }
  }

  signin.onclick = function () {
    if (user) { user = null; store(null); render(); return; }
    err.textContent = '';
    form.reset();
    dlg.showModal();
    email.focus();
  };

  document.getElementById('auth-cancel').onclick = function () { dlg.close(); };

  form.onsubmit = function (e) {
    e.preventDefault();
    var em = email.value.trim();
    if (!em || !password.value) { err.textContent = 'Enter an email and a password.'; return; }
    user = em;
    store(em);
    dlg.close();
    render();
  };

  document.addEventListener('donutmath:signin', function (e) {
    user = e.detail;
    store(user);
    render();
  });

  user = load();
  render();
})();
