/* Vilniaus logistika – demo elgsena (vanilla JS, be bibliotekų) */
(function () {
  'use strict';
  var root = document.documentElement;
  var motion = root.classList.contains('js-motion');
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var nbsp = ' ';
  function fmt(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, nbsp); }

  /* ---------- metai ---------- */
  var years = new Date().getFullYear() - 2004;
  $$('[data-years]').forEach(function (el) {
    el.textContent = years;
    if (el.hasAttribute('data-count')) el.setAttribute('data-count', years);
  });
  var y = $('#year'); if (y) y.textContent = new Date().getFullYear();
  $$('[data-year-now]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- bento: gyvas Vilniaus laikas ir ploto langeliai ---------- */
  var vt = $('#vilnius-time');
  if (vt) {
    var tick = function () {
      try {
        vt.textContent = new Intl.DateTimeFormat('lt-LT', { timeZone: 'Europe/Vilnius', hour: '2-digit', minute: '2-digit' }).format(new Date());
      } catch (e) {
        var d = new Date(); vt.textContent = ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
      }
    };
    tick(); setInterval(tick, 20000);
  }
  var dots = $('#area-dots');
  if (dots) {
    for (var di = 0; di < 70; di++) { var sq = document.createElement('i'); sq.style.setProperty('--i', di); dots.appendChild(sq); }
  }

  /* ---------- hero įėjimas ---------- */
  function loaded() { root.classList.add('is-loaded'); }
  if (motion) {
    var done = false;
    var go = function () { if (!done) { done = true; loaded(); } };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(go);
    setTimeout(go, 700);
  } else { loaded(); }

  /* ---------- antraštė ---------- */
  var header = $('.site-header');
  var hero = $('.hero');
  var toggle = $('.menu-toggle'), menu = $('#mobile-menu');
  var menuOpen = function () { return toggle && toggle.getAttribute('aria-expanded') === 'true'; };
  // virš viso ekrano video antraštė permatoma; nuslinkus žemiau – balta
  var onScrollHeader = function () {
    var y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 8);
    header.classList.toggle('is-top', !!hero && y < 10 && !menuOpen());
  };
  onScrollHeader();

  /* ---------- mobilusis meniu ---------- */
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menuOpen();
      toggle.setAttribute('aria-expanded', String(!open));
      menu.hidden = open;
      document.body.style.overflow = open ? '' : 'hidden';
      onScrollHeader();
    });
    $$('a', menu).forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false'); menu.hidden = true; document.body.style.overflow = '';
        onScrollHeader();
      });
    });
  }

  /* ---------- aktyvus meniu punktas ---------- */
  var navLinks = $$('.main-nav a');
  var sections = navLinks.map(function (a) { return $(a.getAttribute('href')); }).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    var navIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          navLinks.forEach(function (a) { a.classList.toggle('is-current', a.getAttribute('href') === '#' + e.target.id); });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { navIO.observe(s); });
  }

  /* ---------- atsiradimas slenkant ---------- */
  var reveals = $$('[data-reveal]');
  if (motion && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); onReveal(e.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
    // atsarginis variantas: jei IntersectionObserver vėluoja (pvz. fono kortelėje), parodome pagal slinkimą
    var revealCheck = function () {
      reveals.forEach(function (el) {
        if (!el.classList.contains('is-in') && el.getBoundingClientRect().top < innerHeight * 0.92) { el.classList.add('is-in'); io.unobserve(el); onReveal(el); }
      });
    };
    window.addEventListener('scroll', revealCheck, { passive: true });
    setTimeout(revealCheck, 2500);
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  function onReveal(el) {
    $$('[data-count]', el).forEach(countUp);
  }
  function countUp(el) {
    var to = +el.getAttribute('data-count'), t0 = null, dur = 1400;
    var step = function (t) {
      if (!t0) t0 = t;
      var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(to * e);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---------- vaizdo įrašai: groja tik matomi ---------- */
  function setupVideo(v) {
    if (!v) return;
    var src = (window.innerWidth >= 1200 && v.dataset.srcLg) ? v.dataset.srcLg : v.dataset.srcSm;
    if (!motion) return; // be judesio rodome tik plakatą
    var started = false;
    var start = function () {
      if (!started) { v.src = src; started = true; }
      var p = v.play(); if (p && p.catch) p.catch(function () {});
    };
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) start(); else if (started) v.pause(); });
      }, { threshold: 0.15 }).observe(v);
    } else start();
  }
  setupVideo($('#hero-video'));
  setupVideo($('#train-video'));

  /* ---------- parallax (tik transform) ---------- */
  var par = motion ? $$('[data-parallax]') : [];
  function parallax() {
    var vh = innerHeight;
    par.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      var k = +el.getAttribute('data-parallax') || 0.05;
      var target = el.querySelector('video, img') || el;
      if (el.classList.contains('hero-bg')) {
        // hero: video slenka lėčiau nei puslapis
        target.style.transform = 'translate3d(0,' + (window.scrollY * k).toFixed(1) + 'px,0) scale(1.1)';
        return;
      }
      var c = (r.top + r.height / 2 - vh / 2);
      target.style.transform = 'translate3d(0,' + (-c * k).toFixed(1) + 'px,0) scale(1.08)';
    });
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    onScrollHeader(); // antraštė keičiama iškart, nelaukiant kadro
    if (ticking || !par.length) return; ticking = true;
    requestAnimationFrame(function () { parallax(); ticking = false; });
  }, { passive: true });
  if (par.length) parallax();

  /* ---------- paslaugos: skirtukai (desktop) ir akordeonas (mobilus) ---------- */
  var svc = $('.svc');
  var tabs = $$('.svc-tabs [role=tab]');
  var panels = $$('.svc-panel');
  var mq = window.matchMedia('(max-width: 980px)');

  function selectSvc(id, focus) {
    tabs.forEach(function (t) {
      var on = t.dataset.svc === id;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      if (on && focus) t.focus();
    });
    panels.forEach(function (p) {
      var on = p.dataset.svcPanel === id;
      p.classList.toggle('is-active', on);
      p.classList.toggle('is-open', on);
      var acc = $('.svc-acc', p); if (acc) acc.setAttribute('aria-expanded', String(on));
    });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { selectSvc(t.dataset.svc); });
    t.addEventListener('keydown', function (e) {
      var k = e.key, n = null;
      if (k === 'ArrowDown' || k === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
      if (k === 'ArrowUp' || k === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
      if (k === 'Home') n = tabs[0];
      if (k === 'End') n = tabs[tabs.length - 1];
      if (n) { e.preventDefault(); selectSvc(n.dataset.svc, true); }
    });
  });
  panels.forEach(function (p) {
    var acc = $('.svc-acc', p);
    if (!acc) return;
    acc.addEventListener('click', function () {
      var open = p.classList.contains('is-open');
      if (open) { p.classList.remove('is-open'); acc.setAttribute('aria-expanded', 'false'); }
      else {
        selectSvc(p.dataset.svcPanel);
        // mobiliajame atsidarius – pasirūpiname, kad antraštė būtų matoma
        if (mq.matches) setTimeout(function () {
          var top = p.getBoundingClientRect().top;
          if (top < 70) window.scrollBy({ top: top - 80, behavior: motion ? 'smooth' : 'auto' });
        }, 30);
      }
    });
  });
  $$('[data-svc-link]').forEach(function (b) {
    b.addEventListener('click', function (e) {
      e.preventDefault();
      var id = b.getAttribute('data-svc-link');
      selectSvc(id);
      var target = mq.matches ? $('[data-svc-panel="' + id + '"]') : svc;
      if (target) target.scrollIntoView({ behavior: motion ? 'smooth' : 'auto', block: 'start' });
    });
  });

  /* ---------- terminalo schema ---------- */
  var plan = $('.plan');
  var legendBtns = $$('[data-area-btn]');
  var areas = $$('.plan .area');
  var activeArea = null;
  function setArea(id) {
    activeArea = id;
    plan.classList.toggle('has-active', !!id);
    areas.forEach(function (a) { a.classList.toggle('is-active', a.dataset.area === id); });
    legendBtns.forEach(function (b) { b.classList.toggle('is-active', b.dataset.areaBtn === id); b.setAttribute('aria-pressed', String(b.dataset.areaBtn === id)); });
  }
  if (plan) {
    legendBtns.forEach(function (b) {
      b.addEventListener('mouseenter', function () { setArea(b.dataset.areaBtn); });
      b.addEventListener('focus', function () { setArea(b.dataset.areaBtn); });
      b.addEventListener('click', function () { setArea(activeArea === b.dataset.areaBtn ? null : b.dataset.areaBtn); });
    });
    $('.plan-legend').addEventListener('mouseleave', function () { setArea(null); });
    areas.forEach(function (a) {
      a.addEventListener('mouseenter', function () { setArea(a.dataset.area); });
      a.addEventListener('mouseleave', function () { setArea(null); });
      a.addEventListener('click', function () { setArea(a.dataset.area); });
    });
  }

  /* ---------- ekspedijavimo schema: linijos skaičiuojamos pagal tikras blokų vietas ---------- */
  var flow = $('.flow'), flowSvg = $('.flow-svg');
  function layoutFlow() {
    if (!flow || !flowSvg || getComputedStyle(flowSvg).display === 'none') return;
    var fr = flow.getBoundingClientRect();
    flowSvg.setAttribute('viewBox', '0 0 ' + fr.width.toFixed(0) + ' ' + fr.height.toFixed(0));
    var hub = $('.flow-node.hub', flow).getBoundingClientRect();
    var hy = hub.top + hub.height / 2 - fr.top, hl = hub.left - fr.left, hr = hub.right - fr.left;
    var curve = function (x1, y1, x2, y2) {
      var dx = (x2 - x1) * 0.55;
      return 'M' + x1.toFixed(1) + ' ' + y1.toFixed(1) + 'C' + (x1 + dx).toFixed(1) + ' ' + y1.toFixed(1) + ' ' + (x2 - dx).toFixed(1) + ' ' + y2.toFixed(1) + ' ' + x2.toFixed(1) + ' ' + y2.toFixed(1);
    };
    $$('.flow-from .flow-node', flow).forEach(function (n, i) {
      var r = n.getBoundingClientRect(), path = $('#fl' + (i + 1));
      if (path) path.setAttribute('d', curve(r.right - fr.left + 6, r.top + r.height / 2 - fr.top, hl - 6, hy));
    });
    $$('.flow-to .flow-node', flow).forEach(function (n, i) {
      var r = n.getBoundingClientRect(), path = $('#fl' + (i + 4));
      if (path) path.setAttribute('d', curve(hr + 6, hy, r.left - fr.left - 6, r.top + r.height / 2 - fr.top));
    });
  }
  layoutFlow();
  window.addEventListener('resize', layoutFlow);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layoutFlow);
  window.addEventListener('load', layoutFlow);
  if (flowSvg && !motion && flowSvg.pauseAnimations) flowSvg.pauseAnimations();

  /* ---------- ploto skaičiuoklė ---------- */
  var range = $('#area-range');
  if (range) {
    var COURT = 420, MAXC = Math.ceil(7000 / COURT); // 17 aikštelių
    var courtsBox = $('#courts');
    for (var i = 0; i < MAXC; i++) { var c = document.createElement('span'); c.className = 'court'; c.appendChild(document.createElement('i')); courtsBox.appendChild(c); }
    var courts = $$('.court', courtsBox);
    var num = $('#area-num'), cmp = $('#area-compare'), ask = $('#area-ask');
    var plural = function (n) {
      var m10 = n % 10, m100 = n % 100;
      if (m10 === 1 && m100 !== 11) return 'krepšinio aikštelė';
      if (m10 >= 2 && m10 <= 9 && !(m100 >= 11 && m100 <= 19)) return 'krepšinio aikštelės';
      return 'krepšinio aikštelių';
    };
    var upd = function () {
      var v = +range.value;
      var k = v / COURT;
      var k1 = Math.round(k * 10) / 10;
      num.textContent = fmt(v);
      range.style.setProperty('--fill', ((v - 100) / (7000 - 100) * 100).toFixed(2) + '%');
      var word = (k1 % 1 === 0) ? plural(k1) : 'krepšinio aikštelės';
      cmp.innerHTML = '≈ <strong>' + String(k1).replace('.', ',') + '</strong> ' + word + ' (28 × 15 m = 420 m²)';
      courts.forEach(function (el, idx) { el.style.setProperty('--f', Math.max(0, Math.min(1, k - idx)).toFixed(3)); });
      ask.innerHTML = 'Teirautis dėl ' + fmt(v) + nbsp + 'm² <svg><use href="#i-arrow"/></svg>';
      ask.setAttribute('data-ask', 'Patalpų nuoma: ' + fmt(v).replace(nbsp, ' ') + ' m²');
    };
    range.addEventListener('input', upd);
    upd();
  }

  /* ---------- žemėlapis: įkeliamas tik po puslapio įkėlimo ir priartėjus ---------- */
  var mapFrame = $('.map iframe[data-src]');
  if (mapFrame) {
    var loadMap = function () { if (!mapFrame.src) mapFrame.src = mapFrame.getAttribute('data-src'); };
    var armMap = function () {
      if ('IntersectionObserver' in window) {
        var mio = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { loadMap(); mio.disconnect(); } }, { rootMargin: '600px 0px' });
        mio.observe(mapFrame);
      } else loadMap();
    };
    if (document.readyState === 'complete') armMap(); else window.addEventListener('load', armMap);
  }

  /* ---------- poraštė: rekvizitų kopijavimas ---------- */
  $$('[data-copy]').forEach(function (btn) {
    var list = $(btn.getAttribute('data-copy'));
    var label = $('span', btn), icon = $('use', btn);
    if (!list || !label) return;
    var text = $$('div', list).map(function (row) {
      return $('dt', row).textContent + ': ' + $('dd', row).textContent.replace(/ /g, ' ');
    }).join('\n');
    var done = function () {
      btn.classList.add('is-copied'); label.textContent = 'Nukopijuota';
      if (icon) icon.setAttribute('href', '#i-check');
      setTimeout(function () {
        btn.classList.remove('is-copied'); label.textContent = 'Kopijuoti rekvizitus';
        if (icon) icon.setAttribute('href', '#i-copy');
      }, 2200);
    };
    var fallback = function () {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (e) {}
      document.body.removeChild(ta);
    };
    btn.addEventListener('click', function () {
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, fallback);
      else fallback();
    });
  });

  /* ---------- užklausos forma ---------- */
  var form = $('#inquiry');
  var msg = $('#f-msg');
  function preselect(label) {
    if (!form || !label) return;
    var map = {
      'Mechanizuota krova': 'Krova', 'Rankinė krova': 'Krova', 'Sandėliavimas': 'Sandėliavimas',
      'Muitinės sandėlis': 'Muitinės sandėlis', 'Prekių rūšiavimas': 'Rūšiavimas', 'Nestandartinis krovinys': 'Ekspedijavimas',
      'Ekspedijavimas': 'Ekspedijavimas', 'Biuro nuoma': 'Patalpų nuoma'
    };
    var chip = map[label] || (label.indexOf('Patalpų nuoma') === 0 ? 'Patalpų nuoma' : null);
    if (chip) { var cb = form.querySelector('input[value="' + chip + '"]'); if (cb) cb.checked = true; }
    if (msg && !msg.value.trim()) msg.value = label + ': ';
  }
  $$('[data-ask]').forEach(function (a) {
    a.addEventListener('click', function () { preselect(a.getAttribute('data-ask')); });
  });
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      $$('[required]', form).forEach(function (inp) {
        var valid = inp.value.trim() !== '' && (inp.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value.trim()));
        inp.closest('.field').classList.toggle('has-error', !valid);
        if (!valid && ok) { inp.focus(); ok = false; }
      });
      if (!ok) return;
      var okBox = $('.form-ok', form); okBox.hidden = false;
      form.reset();
    });
    $$('[required]', form).forEach(function (inp) {
      inp.addEventListener('input', function () { inp.closest('.field').classList.remove('has-error'); });
    });
  }
})();
