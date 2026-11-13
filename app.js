(function(){
      const root=document.documentElement, btn=document.getElementById('themeToggle');
      const sun=btn.querySelector('.icon-sun'), moon=btn.querySelector('.icon-moon');
      const stored = localStorage.getItem('theme');
      const initial = stored === 'dark' ? 'dark' : 'light';
      root.setAttribute('data-theme', initial);
      updateIcons(initial);
      btn.addEventListener('click',()=>{
        const next=root.getAttribute('data-theme')==='dark'?'light':'dark';
        root.setAttribute('data-theme',next); localStorage.setItem('theme',next); updateIcons(next);
      });
      function updateIcons(t){ if(t==='dark'){sun.style.display='none';moon.style.display='block'} else {sun.style.display='block';moon.style.display='none'} }

      const menuBtn = document.getElementById('menuToggle');
      const navLinks = document.getElementById('navLinks');
      const iconMenu = menuBtn.querySelector('.icon-menu');
      const iconClose = menuBtn.querySelector('.icon-close');
      menuBtn.addEventListener('click', () => {
        const open = navLinks.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
        iconMenu.style.display = open ? 'none' : 'block';
        iconClose.style.display = open ? 'block' : 'none';
      });
      navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        iconMenu.style.display = 'block';
        iconClose.style.display = 'none';
      }));

      (function smoothAnchorScroll(){
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        document.querySelectorAll('a[href^="#"]').forEach((a) => {
          a.addEventListener('click', (e) => {
            const id = a.getAttribute('href');
            if (!id || id === '#') return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
            history.pushState(null, '', id);
          });
        });
      })();

      if (window.matchMedia('(pointer: fine)').matches) {
        const targets = document.querySelectorAll('.card, .stat-card, .conf-item, .timeline-item, .training-card, .blog-card, .info-card, .btn, .theme-toggle');
        targets.forEach((el) => {
          if (el.querySelector(':scope > .liquid-surface')) return;
          el.classList.add('is-liquid');
          const surface = document.createElement('span');
          surface.className = 'liquid-surface';
          surface.setAttribute('aria-hidden', 'true');
          el.appendChild(surface);
          el.addEventListener('pointermove', (e) => {
            const r = el.getBoundingClientRect();
            const x = ((e.clientX - r.left) / r.width) * 100;
            const y = ((e.clientY - r.top) / r.height) * 100;
            el.style.setProperty('--lx', x + '%');
            el.style.setProperty('--ly', y + '%');
          });
        });
      }
    })();
