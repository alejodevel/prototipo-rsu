/* RSU Ambiental — prototipo · JS sin dependencias */
(function () {
  'use strict';
  var doc = document.documentElement;
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* Menú móvil + submenú */
  var menuBtn = document.querySelector('.menu-btn'), nav = document.getElementById('nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open);
      menuBtn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }
  var subBtn = document.querySelector('.has-sub > .nav-link'), sub = document.querySelector('.has-sub .sub');
  function closeSub() { if (sub) { sub.classList.remove('open'); subBtn.setAttribute('aria-expanded', 'false'); } }
  if (subBtn && sub) {
    subBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var o = sub.classList.toggle('open');
      subBtn.setAttribute('aria-expanded', o);
    });
    document.addEventListener('click', function (e) { if (!sub.contains(e.target)) closeSub(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeSub();
        if (nav && nav.classList.contains('open')) { menuBtn.click(); menuBtn.focus(); }
      }
    });
    if (window.matchMedia('(hover:hover) and (min-width:1021px)').matches) {
      var hs = document.querySelector('.has-sub');
      hs.addEventListener('mouseenter', function () { sub.classList.add('open'); subBtn.setAttribute('aria-expanded', 'true'); });
      hs.addEventListener('mouseleave', closeSub);
    }
  }

  /* Hero rotativo (foto + mensaje) con pausa */
  var imgs = [].slice.call(document.querySelectorAll('.hs')), msgs = [].slice.call(document.querySelectorAll('.hm'));
  if (imgs.length > 1) {
    var i = 0, timer = null, playing = !window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    var bars = [].slice.call(document.querySelectorAll('.bars button'));
    var pp = document.querySelector('.h-pp');
    var show = function (n) {
      i = (n + imgs.length) % imgs.length;
      imgs.forEach(function (s, k) { s.classList.toggle('on', k === i); });
      msgs.forEach(function (s, k) { s.classList.toggle('on', k === i); });
      bars.forEach(function (d, k) { d.setAttribute('aria-current', k === i); });
    };
    var stop = function () { clearInterval(timer); };
    var start = function () { stop(); timer = setInterval(function () { show(i + 1); }, 6000); };
    var setPlay = function (p) {
      playing = p;
      if (pp) {
        pp.setAttribute('aria-label', p ? 'Pausar' : 'Reanudar');
        pp.querySelector('.i-pause').style.display = p ? '' : 'none';
        pp.querySelector('.i-play').style.display = p ? 'none' : '';
      }
      p ? start() : stop();
    };
    bars.forEach(function (d, k) { d.addEventListener('click', function () { show(k); if (playing) start(); }); });
    var pv = document.querySelector('.h-prev'), nx = document.querySelector('.h-next');
    if (pv) pv.addEventListener('click', function () { show(i - 1); if (playing) start(); });
    if (nx) nx.addEventListener('click', function () { show(i + 1); if (playing) start(); });
    if (pp) pp.addEventListener('click', function () { setPlay(!playing); });
    setPlay(playing);
  }

  /* Formularios (demo) */
  document.querySelectorAll('form[data-form]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (f.querySelector('.hp input').value) return;
      if (!f.checkValidity()) { f.reportValidity(); return; }
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'generate_lead', form: f.getAttribute('data-form') });
      var ok = f.querySelector('.form-ok'); ok.classList.add('show'); ok.focus(); f.reset();
    });
  });

  /* Cookies */
  var ck = document.querySelector('.cookie');
  if (ck && !store.get('rsu-consent')) {
    ck.classList.add('show'); document.body.classList.add('has-cookie');
    var save = function (v) {
      store.set('rsu-consent', JSON.stringify(v));
      ck.classList.remove('show'); document.body.classList.remove('has-cookie');
    };
    ck.querySelector('[data-ck=all]').onclick = function () { save({ a: 1, m: 1 }); };
    ck.querySelector('[data-ck=none]').onclick = function () { save({ a: 0, m: 0 }); };
    ck.querySelector('[data-ck=custom]').onclick = function () { ck.classList.add('custom'); ck.querySelector('[data-ck=save]').hidden = false; this.hidden = true; };
    ck.querySelector('[data-ck=save]').onclick = function () { save({ a: +ck.querySelector('#ck-a').checked, m: +ck.querySelector('#ck-m').checked }); };
  }

  /* Panel de estilo (paletas y tipografías) */
  var P = { palette: store.get('rsu-palette') || 'verde', font: store.get('rsu-font') || 'jost' };
  var apply = function () {
    doc.setAttribute('data-palette', P.palette); doc.setAttribute('data-font', P.font);
    document.querySelectorAll('.proto-opts button').forEach(function (b) { b.setAttribute('aria-pressed', P[b.dataset.k] === b.dataset.v); });
  };
  apply();
  var pb = document.querySelector('.proto-btn'), pn = document.querySelector('.proto-panel');
  if (pb) {
    pb.addEventListener('click', function () { var o = pn.classList.toggle('open'); pb.setAttribute('aria-expanded', o); });
    document.querySelectorAll('.proto-opts button').forEach(function (b) {
      b.addEventListener('click', function () { P[b.dataset.k] = b.dataset.v; store.set('rsu-' + b.dataset.k, b.dataset.v); apply(); });
    });
  }
  var y = document.getElementById('y'); if (y) y.textContent = new Date().getFullYear();
})();
