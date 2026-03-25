(function () {
  if (window.__navEnhanced) return;
  window.__navEnhanced = true;

  // Helper to highlight active links
  function highlightActive() {
    document.querySelectorAll('.nav-links a').forEach(function(a){
      try{
        var href = a.getAttribute('href');
        if(!href) return;
        // Resolve absolute URL
        var url = new URL(href, location.origin);
        // Normalize paths (remove index.html, trailing slash consistency)
        var p = url.pathname.replace(/\/index.html$/,'/');
        var current = location.pathname.replace(/\/index.html$/,'/');
        
        // Match logic
        if (p === '/') {
           if (current === '/') a.classList.add('active');
        } else {
           if(current === p || (p !== '/' && current.indexOf(p) === 0)){
             a.classList.add('active');
             var parent = a.closest('.nav-item.has-dropdown');
             if(parent){
               var top = parent.querySelector('a');
               if(top) top.classList.add('active');
             }
           }
        }
      }catch(e){}
    });
  }

  function setupDropdownListeners() {
    // Desktop: nothing needed (CSS hover)
    
    // Accessibility: Keyboard support for dropdowns
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
  }

  window.buildNav = function(lang) {
     var navLinks = document.querySelector('.nav-links');
     if (!navLinks) return;
     if (typeof i18n !== 'object') return;
     
     // Use passed lang or storage or default
     lang = lang || localStorage.getItem('lang') || 'en';
     var navs = i18n[lang].nav;

     var sub = {
            works: [
              i18n[lang].worksArtisticCreations,
              i18n[lang].worksAnalyticalPieces,
              i18n[lang].worksTechnicalWorks,
              i18n[lang].worksExperimentalForms
            ],
            writing: [
              i18n[lang].writingEssays,
              i18n[lang].writingNotes
            ],
            projects: [
              i18n[lang].projectsResearch,
              i18n[lang].projectsTechnical,
              i18n[lang].projectsCreative,
              i18n[lang].projectsPersonal
            ],
            archive: [
              i18n[lang].archiveOld,
              i18n[lang].archiveUnused,
              i18n[lang].archiveSnapshots
            ]
     };

     var allText = {
            works: lang === 'zh' ? '全部作品' : 'All Works',
            writing: lang === 'zh' ? '全部写作' : 'All Writing',
            projects: lang === 'zh' ? '全部项目' : 'All Projects',
            archive: lang === 'zh' ? '全部归档' : 'All Archive'
     };

     // Using absolute paths starting with /
     navLinks.innerHTML = `
              <div class="nav-item has-dropdown">
                <a href="/works.html">${navs[0]}</a>
                <div class="nav-dropdown">
                  <a href="/works.html" class="mobile-only">${allText.works}</a>
                  <a href="/works/artistic-creations/index.html">${sub.works[0]}</a>
                  <a href="/works/analytical-pieces/index.html">${sub.works[1]}</a>
                  <a href="/works/technical-works/index.html">${sub.works[2]}</a>
                  <a href="/works/experimental-forms/index.html">${sub.works[3]}</a>
                </div>
              </div>

              <div class="nav-item has-dropdown">
                <a href="/writing.html">${navs[1]}</a>
                <div class="nav-dropdown">
                  <a href="/writing.html" class="mobile-only">${allText.writing}</a>
                  <a href="/writing/essays/index.html">${sub.writing[0]}</a>
                  <a href="/writing/notes/index.html">${sub.writing[1]}</a>
                </div>
              </div>

              <div class="nav-item has-dropdown">
                <a href="/projects.html">${navs[2]}</a>
                <div class="nav-dropdown">
                  <a href="/projects.html" class="mobile-only">${allText.projects}</a>
                  <a href="/projects/research-systems/index.html">${sub.projects[0]}</a>
                  <a href="/projects/technical-builds/index.html">${sub.projects[1]}</a>
                  <a href="/projects/creative-development/index.html">${sub.projects[2]}</a>
                  <a href="/projects/personal-infrastructure/index.html">${sub.projects[3]}</a>
                </div>
              </div>

              <a href="/about.html">${navs[3]}</a>

              <div class="nav-item has-dropdown">
                <a href="/archive.html">${navs[4]}</a>
                <div class="nav-dropdown">
                  <a href="/archive.html" class="mobile-only">${allText.archive}</a>
                  <a href="/archive/discarded-paths/index.html">${sub.archive[0]}</a>
                  <a href="/archive/incomplete-fragments/index.html">${sub.archive[1]}</a>
                  <a href="/archive/process-snapshots/index.html">${sub.archive[2]}</a>
                </div>
              </div>
            `;
      
      highlightActive();
      setupDropdownListeners();
  };

  document.addEventListener('DOMContentLoaded', function () {
    // Ensure main landmark
    var mainEl = document.querySelector('main');
    if (!mainEl) {
      document.body.id = document.body.id || 'main';
      mainEl = document.body;
    } else if (!mainEl.id) {
      mainEl.id = 'main';
    }

    // Skip link
    if (!document.querySelector('.skip-link')) {
      var skip = document.createElement('a');
      skip.className = 'skip-link';
      skip.href = '#' + mainEl.id;
      skip.textContent = 'Skip to content';
      skip.setAttribute('aria-hidden', 'false');
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

    // Initialize Headers
    document.querySelectorAll('.site-header').forEach(function (header) {
      var nav = header.querySelector('.nav');
      if (!nav) return;

      var hamburger = nav.querySelector('.hamburger');
      if (!hamburger) {
        hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        if (!document.getElementById('hamburger-btn')) hamburger.id = 'hamburger-btn';
        hamburger.setAttribute('aria-label', 'Toggle navigation');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.innerHTML = '<span class="hamburger-line"></span><span class="hamburger-line"></span><span class="hamburger-line"></span>';
        var container = nav.querySelector('.lang-switcher') || nav.querySelector('div');
        if (container && container.parentNode) container.parentNode.appendChild(hamburger);
        else nav.appendChild(hamburger);
      }

      var navLinks = header.querySelector('.nav-links');
      if (!navLinks) return;
      if (!navLinks.id) navLinks.id = 'nav-links';
      hamburger.setAttribute('aria-controls', navLinks.id);

      // Initial build if empty or simple links
      if (!navLinks.querySelector('.nav-item') && typeof i18n === 'object') {
          window.buildNav();
      } else {
          highlightActive();
          setupDropdownListeners();
      }

      // Hamburger logic
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

      document.addEventListener('click', function (e) {
        if (!header.contains(e.target) && navLinks.classList.contains('active')) {
          closeNav();
        }
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) closeNav();
      });

      window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
          closeNav();
        }
      });

      // Delegate click for mobile dropdown toggle (since elements might be rebuilt)
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
          link.setAttribute('aria-expanded', expanded ? 'true' : 'false');
          var dropdown = navItem.querySelector('.nav-dropdown');
          if(dropdown) dropdown.style.display = expanded ? 'flex' : 'none';
        } else {
          closeNav();
        }
      });
    });

    // Keyboard user helper
    function handleFirstTab(e){
      if(e.key === 'Tab'){
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
      }
    }
    window.addEventListener('keydown', handleFirstTab);
  });
})();


