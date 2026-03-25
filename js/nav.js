(function () {
  if (window.__navEnhanced) return;
  window.__navEnhanced = true;

  document.addEventListener('DOMContentLoaded', function () {
    // Ensure there's a main landmark with id 'main'
    var mainEl = document.querySelector('main');
    if (!mainEl) {
      // fallback: find first container/section and set id on body as target
      document.body.id = document.body.id || 'main';
      mainEl = document.body;
    } else if (!mainEl.id) {
      mainEl.id = 'main';
    }

    // Add a skip link for keyboard users if missing
    if (!document.querySelector('.skip-link')) {
      var skip = document.createElement('a');
      skip.className = 'skip-link';
      skip.href = '#' + mainEl.id;
      skip.textContent = 'Skip to content';
      skip.setAttribute('aria-hidden', 'false');
      // Minimal inline styles to avoid requiring CSS changes to see it when focused
      skip.style.position = 'absolute';
      skip.style.left = '12px';
      skip.style.top = '8px';
      skip.style.padding = '8px 12px';
      skip.style.background = 'rgba(0,0,0,0.6)';
      skip.style.color = '#fff';
      skip.style.borderRadius = '6px';
      skip.style.transform = 'translateY(-120%)';
      skip.style.transition = 'transform 0.18s ease';
      skip.style.zIndex = '1200';
      skip.addEventListener('focus', function () { skip.style.transform = 'translateY(0)'; });
      skip.addEventListener('blur', function () { skip.style.transform = 'translateY(-120%)'; });
      document.body.insertBefore(skip, document.body.firstChild);
    }

    // Enhance each header/nav found on the page
    document.querySelectorAll('.site-header').forEach(function (header) {
      var nav = header.querySelector('.nav');
      if (!nav) return;

      // Find or create hamburger
      var hamburger = nav.querySelector('.hamburger');
      if (!hamburger) {
        hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        // Use an id only if none exists on page
        if (!document.getElementById('hamburger-btn')) hamburger.id = 'hamburger-btn';
        hamburger.setAttribute('aria-label', 'Toggle navigation');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.innerHTML = '<span class="hamburger-line"></span><span class="hamburger-line"></span><span class="hamburger-line"></span>';
        // Try to insert after lang-switcher if present
        var container = nav.querySelector('.lang-switcher') || nav.querySelector('div');
        if (container && container.parentNode) container.parentNode.appendChild(hamburger);
        else nav.appendChild(hamburger);
      }

      var navLinks = header.querySelector('.nav-links');
      if (!navLinks) return;

      // Initialize ARIA states
      if (!navLinks.hasAttribute('aria-hidden')) navLinks.setAttribute('aria-hidden', 'true');
      if (!hamburger.hasAttribute('aria-expanded')) hamburger.setAttribute('aria-expanded', 'false');

      // Avoid double-binding
      if (hamburger.dataset.enhanced) return;
      hamburger.dataset.enhanced = '1';

      function openNav() {
        hamburger.classList.add('active');
        navLinks.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        navLinks.setAttribute('aria-hidden', 'false');
        document.body.classList.add('no-scroll');
        var first = navLinks.querySelector('a, button');
        if (first) first.focus();
      }

      function closeNav() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        navLinks.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('no-scroll');
      }

      hamburger.addEventListener('click', function (e) {
        e.stopPropagation();
        if (navLinks.classList.contains('active')) closeNav();
        else openNav();
      });

      // Close when clicking outside
      document.addEventListener('click', function (e) {
        if (!header.contains(e.target) && navLinks.classList.contains('active')) {
          closeNav();
        }
      });

      // Close on Escape
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) closeNav();
      });

      // Ensure menu closes on desktop resize
      window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
          closeNav();
        }
      });

      // Mobile dropdown toggle
      navLinks.addEventListener('click', function (e) {
        if (window.innerWidth > 768) return;
        var link = e.target.closest('a');
        if (!link) return;
        var navItem = link.closest('.nav-item.has-dropdown');
        var isParentLink = navItem && link.parentNode === navItem;
        if (isParentLink) {
          e.preventDefault();
          navItem.classList.toggle('active');
          var expanded = navItem.classList.contains('active');
          // toggle aria
          link.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        } else {
          // normal link -> close nav
          closeNav();
        }
      });
    });
  });
})();

// Additional accessibility and active-link enhancements
(function(){
  document.addEventListener('DOMContentLoaded', function(){
    // Set aria-haspopup on parent links
    document.querySelectorAll('.nav-item.has-dropdown > a').forEach(function(anchor){
      anchor.setAttribute('aria-haspopup','true');
      if (!anchor.hasAttribute('aria-expanded')) anchor.setAttribute('aria-expanded','false');
      anchor.addEventListener('keydown', function(e){
        if(e.key === 'ArrowDown'){
          e.preventDefault();
          var dropdown = anchor.parentNode.querySelector('.nav-dropdown');
          if(dropdown){
            anchor.setAttribute('aria-expanded','true');
            dropdown.style.display = 'flex';
            var first = dropdown.querySelector('a');
            if(first) first.focus();
          }
        } else if (e.key === 'Escape'){
          anchor.setAttribute('aria-expanded','false');
          var dropdown = anchor.parentNode.querySelector('.nav-dropdown');
          if(dropdown) dropdown.style.display = '';
          anchor.focus();
        } else if (e.key === 'Enter' || e.key === ' '){
          if (window.innerWidth <= 768){
            e.preventDefault();
            var navItem = anchor.closest('.nav-item.has-dropdown');
            navItem.classList.toggle('active');
            var expanded = navItem.classList.contains('active');
            anchor.setAttribute('aria-expanded', expanded ? 'true' : 'false');
            var dropdown = navItem.querySelector('.nav-dropdown');
            if(dropdown) dropdown.style.display = expanded ? 'flex' : 'none';
          }
        }
      });
    });

    // Highlight active links
    document.querySelectorAll('.nav-links a').forEach(function(a){
      try{
        var href = a.getAttribute('href');
        if(!href) return;
        var url = new URL(href, location.origin);
        var p = url.pathname.replace(/\/index.html$/,'/');
        var current = location.pathname.replace(/\/index.html$/,'/');
        if(current === p || (p !== '/' && current.indexOf(p) === 0)){
          a.classList.add('active');
          var parent = a.closest('.nav-item.has-dropdown');
          if(parent){
            var top = parent.querySelector('a');
            if(top) top.classList.add('active');
          }
        }
      }catch(e){}
    });

    // Ensure hamburger aria-controls and nav-links id
    document.querySelectorAll('.site-header').forEach(function(header){
      var hamburger = header.querySelector('.hamburger');
      var navLinks = header.querySelector('.nav-links');
      if(hamburger && navLinks){
        if(!navLinks.id) navLinks.id = 'nav-links';
        hamburger.setAttribute('aria-controls', navLinks.id);
      }
    });

    // Add focus-visible helper for keyboard users
    function handleFirstTab(e){
      if(e.key === 'Tab'){
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
      }
    }
    window.addEventListener('keydown', handleFirstTab);
  });
})();
