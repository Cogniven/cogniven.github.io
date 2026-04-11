(function () {
  if (window.__navEnhanced) return;
  window.__navEnhanced = true;

  function toPathname(href) {
    var parser = document.createElement('a');
    parser.href = href || '/';
    return parser.pathname || '/';
  }

  function normalizePath(path) {
    var normalized = toPathname(path || '/')
      .replace(/\\/g, '/')
      .replace(/\/index\.html$/i, '/')
      .replace(/\/{2,}/g, '/');

    if (!normalized.startsWith('/')) normalized = '/' + normalized;
    if (normalized.length > 1 && normalized.endsWith('/')) normalized = normalized.slice(0, -1);
    return normalized || '/';
  }

  function inferTargetPath(path) {
    var current = normalizePath(path || location.pathname);
    var sampleMatch = current.match(/^\/assets\/images\/(works|writing|projects|archive)\/([^\/]+)/);
    if (sampleMatch) {
      return '/' + sampleMatch[1] + '/' + sampleMatch[2];
    }
    return current;
  }

  function getSectionFromPath(path) {
    var normalized = normalizePath(path);
    if (/^\/works(?:\/|$|\.html$)/.test(normalized)) return 'works';
    if (/^\/writing(?:\/|$|\.html$)/.test(normalized)) return 'writing';
    if (/^\/projects(?:\/|$|\.html$)/.test(normalized)) return 'projects';
    if (/^\/archive(?:\/|$|\.html$)/.test(normalized)) return 'archive';

    var sample = normalized.match(/^\/assets\/images\/(works|writing|projects|archive)(?:\/|$)/);
    return sample ? sample[1] : '';
  }

  function getTopAnchor(navItem) {
    if (!navItem) return null;
    for (var i = 0; i < navItem.children.length; i++) {
      if (navItem.children[i].tagName === 'A') return navItem.children[i];
    }
    return navItem.querySelector('a');
  }

  function highlightActive(navLinks) {
    var targetNav = navLinks || document.querySelector('.site-header .nav-links');
    if (!targetNav) return;

    var anchors = targetNav.querySelectorAll('a[href]');
    anchors.forEach(function (a) { a.classList.remove('active'); });

    var currentPath = normalizePath(location.pathname);
    var targetPath = inferTargetPath(currentPath);
    var currentSection = getSectionFromPath(currentPath);

    var bestMatch = null;
    var bestScore = -1;

    anchors.forEach(function (a) {
      var linkPath = normalizePath(a.getAttribute('href') || '/');
      var score = -1;

      if (targetPath === linkPath) {
        score = 1000 + linkPath.length;
      } else if (targetPath.indexOf(linkPath + '/') === 0) {
        score = 500 + linkPath.length;
      }

      if (score > bestScore) {
        bestScore = score;
        bestMatch = a;
      }
    });

    if (bestMatch) {
      bestMatch.classList.add('active');
      var parent = bestMatch.closest('.nav-item.has-dropdown');
      if (parent) {
        var parentTop = getTopAnchor(parent);
        if (parentTop) parentTop.classList.add('active');
      }
    }

    if (currentSection) {
      targetNav.querySelectorAll('.nav-item.has-dropdown').forEach(function (item) {
        var top = getTopAnchor(item);
        if (!top) return;
        var topSection = getSectionFromPath(top.getAttribute('href') || '');
        if (topSection === currentSection) {
          top.classList.add('active');
        }
      });
    }
  }

  function setupDropdownListeners(navLinks) {
    var targetNav = navLinks || document.querySelector('.site-header .nav-links');
    if (!targetNav) return;

    targetNav.querySelectorAll('.nav-item.has-dropdown > a').forEach(function (anchor) {
      if (anchor.dataset.navKeybound === '1') return;
      anchor.dataset.navKeybound = '1';

      anchor.setAttribute('aria-haspopup', 'true');
      if (!anchor.hasAttribute('aria-expanded')) anchor.setAttribute('aria-expanded', 'false');

      anchor.addEventListener('keydown', function (e) {
        var navItem = anchor.closest('.nav-item.has-dropdown');
        if (!navItem) return;
        var dropdown = navItem.querySelector('.nav-dropdown');
        if (!dropdown) return;

        if (e.key === 'ArrowDown') {
          var first = dropdown.querySelector('a');
          if (!first) return;
          e.preventDefault();
          navItem.classList.add('active');
          anchor.setAttribute('aria-expanded', 'true');
          first.focus();
          return;
        }

        if (e.key === 'Escape') {
          navItem.classList.remove('active');
          anchor.setAttribute('aria-expanded', 'false');
          dropdown.style.display = '';
          anchor.focus();
          return;
        }

        if ((e.key === 'Enter' || e.key === ' ') && window.innerWidth <= 768) {
          e.preventDefault();
          var expanded = navItem.classList.toggle('active');
          anchor.setAttribute('aria-expanded', expanded ? 'true' : 'false');
          dropdown.style.display = expanded ? 'flex' : 'none';
        }
      });
    });
  }

  window.buildNav = function (lang, navLinks) {
    var targetNav = navLinks || document.querySelector('.site-header .nav-links');
    if (!targetNav || typeof i18n !== 'object') return;

    var currentLang = lang || localStorage.getItem('lang') || 'en';
    var dict = i18n[currentLang] || i18n.en;
    if (!dict || !Array.isArray(dict.nav)) return;

    var navs = dict.nav;
    var sub = {
      works: [
        dict.worksArtisticCreations || 'Artistic Creations',
        dict.worksAnalyticalPieces || 'Analytical Pieces',
        dict.worksTechnicalWorks || 'Technical Works',
        dict.worksExperimentalForms || 'Experimental Forms'
      ],
      writing: [
        dict.writingEssays || 'Essays',
        dict.writingNotes || 'Notes'
      ],
      projects: [
        dict.projectsResearch || 'Research Systems',
        dict.projectsTechnical || 'Technical Builds',
        dict.projectsCreative || 'Creative Development',
        dict.projectsPersonal || 'Personal Infrastructure'
      ],
      archive: [
        dict.archiveOld || 'Discarded Paths',
        dict.archiveUnused || 'Incomplete Fragments',
        dict.archiveSnapshots || 'Process Snapshots'
      ]
    };

    var allText = {
      works: currentLang === 'zh' ? '全部作品' : 'All Works',
      writing: currentLang === 'zh' ? '全部写作' : 'All Writing',
      projects: currentLang === 'zh' ? '全部项目' : 'All Projects',
      archive: currentLang === 'zh' ? '全部归档' : 'All Archive'
    };

    targetNav.innerHTML = `
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

    highlightActive(targetNav);
    setupDropdownListeners(targetNav);
  };

  function ensureNavStructure(navLinks) {
    if (!navLinks) return;
    if (navLinks.querySelector('.nav-item.has-dropdown')) {
      highlightActive(navLinks);
      setupDropdownListeners(navLinks);
      return;
    }
    if (typeof i18n === 'object') {
      window.buildNav(localStorage.getItem('lang') || 'en', navLinks);
    }
  }

  function observeNavResets(navLinks) {
    if (!navLinks || navLinks.__navObserver) return;

    var scheduled = false;
    var observer = new MutationObserver(function () {
      if (scheduled) return;
      scheduled = true;

      window.requestAnimationFrame(function () {
        scheduled = false;
        if (!document.body.contains(navLinks)) {
          observer.disconnect();
          return;
        }
        ensureNavStructure(navLinks);
      });
    });

    observer.observe(navLinks, { childList: true });
    navLinks.__navObserver = observer;
  }

  function resetMobileDropdowns(navLinks) {
    if (!navLinks) return;
    navLinks.querySelectorAll('.nav-item.has-dropdown').forEach(function (item) {
      item.classList.remove('active');
      var top = getTopAnchor(item);
      if (top) top.setAttribute('aria-expanded', 'false');
      var dropdown = item.querySelector('.nav-dropdown');
      if (dropdown) dropdown.style.display = '';
    });
  }

  function isDetailEntryPath(path) {
    var normalized = normalizePath(path);
    return (
      /^\/assets\/images\/(works|writing|projects|archive)\//.test(normalized) ||
      /\/assets\/images\/(works|writing|projects|archive)\//.test(normalized)
    );
  }

  function resolveLocalizedValue(lang, value) {
    if (value == null) return '';
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      return String(value);
    }
    if (typeof value === 'object') {
      var picked = value[lang];
      if (picked == null) picked = value.en;
      if (picked == null) picked = value.zh;
      if (picked == null) return '';
      return String(picked);
    }
    return '';
  }

  window.applyPageContentOverrides = function (lang, contentMap) {
    if (!contentMap || typeof contentMap !== 'object') return;
    var currentLang = lang || localStorage.getItem('lang') || 'en';
    Object.keys(contentMap).forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      var text = resolveLocalizedValue(currentLang, contentMap[id]);
      if (!text) return;
      el.textContent = text;
    });
  };

  function shouldUseDetailEntryPlaceholders() {
    if (!document.body) return false;
    return document.body.getAttribute('data-use-detail-placeholders') === 'true';
  }

  function applyDetailEntryPlaceholders() {
    if (!isDetailEntryPath(location.pathname) || !shouldUseDetailEntryPlaceholders()) return;

    var lang = localStorage.getItem('lang') || 'en';
    var contentPlaceholder = lang === 'zh' ? '这里暂时还没有内容。' : 'No content yet.';
    var metaPlaceholder = lang === 'zh' ? '暂无' : 'N/A';

    document.querySelectorAll('main [id]').forEach(function (el) {
      var id = el.id || '';
      if (!id) return;

      var tag = el.tagName;
      if (tag === 'H1' || tag === 'H2' || tag === 'H3' || tag === 'H4' || tag === 'A' || tag === 'BUTTON' || tag === 'IMG') return;
      if (/(^|-)label$/.test(id) || /(^|-)title$/.test(id) || /(^|-)note$/.test(id)) return;
      if (el.classList.contains('eyebrow') || el.classList.contains('section-note') || el.classList.contains('essay-note-title')) return;

      var hasMetaToken = /meta/.test(id);
      var isMetaLike =
        (hasMetaToken && !/(^|-)label$/.test(id)) ||
        /(^|-)status$/.test(id) ||
        /(^|-)date$/.test(id) ||
        /(^|-)value$/.test(id);

      var isContentLike =
        /(^|-)text$/.test(id) ||
        /(^|-)subtitle$/.test(id) ||
        /(^|-)intro$/.test(id) ||
        /^p\d+$/.test(id) ||
        /-p\d+$/.test(id) ||
        id === 'desc' ||
        id === 'subtitle' ||
        /abstract/.test(id) ||
        /caption/.test(id);

      if (!isMetaLike && !isContentLike) return;
      if (el.textContent && el.textContent.trim()) return;

      el.textContent = isMetaLike ? metaPlaceholder : contentPlaceholder;
    });
  }

  function scheduleDetailEntryPlaceholders() {
    if (!isDetailEntryPath(location.pathname) || !shouldUseDetailEntryPlaceholders()) return;
    window.requestAnimationFrame(function () {
      applyDetailEntryPlaceholders();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var mainEl = document.querySelector('main');
    if (!mainEl) {
      document.body.id = document.body.id || 'main';
      mainEl = document.body;
    } else if (!mainEl.id) {
      mainEl.id = 'main';
    }

    if (!document.querySelector('.skip-link')) {
      var skip = document.createElement('a');
      skip.className = 'skip-link';
      skip.href = '#' + mainEl.id;
      skip.textContent = 'Skip to content';
      document.body.insertBefore(skip, document.body.firstChild);
    }

    document.querySelectorAll('.site-header').forEach(function (header, index) {
      var nav = header.querySelector('.nav');
      if (!nav) return;

      var navLinks = header.querySelector('.nav-links');
      if (!navLinks) return;
      if (!navLinks.id) navLinks.id = 'nav-links-' + index;

      var hamburger = nav.querySelector('.hamburger');
      if (!hamburger) {
        hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.setAttribute('aria-label', 'Toggle navigation');
        hamburger.innerHTML = '<span class="hamburger-line"></span><span class="hamburger-line"></span><span class="hamburger-line"></span>';
        var rightContainer = nav.querySelector('.lang-switcher') || nav.querySelector('div');
        if (rightContainer && rightContainer.parentNode) rightContainer.parentNode.appendChild(hamburger);
        else nav.appendChild(hamburger);
      }

      hamburger.setAttribute('aria-controls', navLinks.id);
      hamburger.setAttribute('aria-expanded', 'false');

      ensureNavStructure(navLinks);
      observeNavResets(navLinks);

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
        resetMobileDropdowns(navLinks);
      }

      if (hamburger.dataset.navToggleBound !== '1') {
        hamburger.dataset.navToggleBound = '1';
        hamburger.addEventListener('click', function (e) {
          e.stopPropagation();
          if (navLinks.classList.contains('active')) closeNav();
          else openNav();
        });
      }

      if (header.dataset.navGlobalBound !== '1') {
        header.dataset.navGlobalBound = '1';

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
      }

      if (navLinks.dataset.navClickBound !== '1') {
        navLinks.dataset.navClickBound = '1';
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
            if (dropdown) dropdown.style.display = expanded ? 'flex' : 'none';
            return;
          }

          closeNav();
        });
      }
    });

    scheduleDetailEntryPlaceholders();
    ['lang-en', 'lang-zh'].forEach(function (id) {
      var langBtn = document.getElementById(id);
      if (!langBtn || langBtn.dataset.detailPlaceholderBound === '1') return;
      langBtn.dataset.detailPlaceholderBound = '1';
      langBtn.addEventListener('click', function () {
        window.setTimeout(scheduleDetailEntryPlaceholders, 0);
      });
    });

    function handleFirstTab(e) {
      if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
      }
    }
    window.addEventListener('keydown', handleFirstTab);

    window.addEventListener('popstate', function () {
      document.querySelectorAll('.site-header .nav-links').forEach(function (navLinks) {
        highlightActive(navLinks);
      });
    });
  });
})();
