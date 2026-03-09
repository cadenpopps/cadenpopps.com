(function () {
	'use strict';

	var sectionTransitionMs = 400;
	var coverFadeMs = 400;
	var tileWidth = 450;

	var projectIndex = 0;
	var projectCount = 0;
	var tilesEl = null;
	var pageTimeout = null;

	function getTilesContainer() {
		return document.querySelector('.tiles');
	}

	function getTiles() {
		var container = getTilesContainer();
		if (!container) return [];
		return Array.prototype.filter.call(container.children, function (el) {
			return el.classList.contains('tile');
		});
	}

	function setActiveSection(sectionId) {
		var prev = document.querySelector('.section.active');
		var next = document.getElementById(sectionId);
		if (!next) return;

		if (prev) {
			prev.classList.remove('active');
			var content = prev.querySelector('.content');
			if (content) content.style.opacity = '0';
		}

		next.classList.add('active');
		var nextContent = next.querySelector('.content');
		if (nextContent) {
			nextContent.style.opacity = '0';
			requestAnimationFrame(function () {
				nextContent.style.opacity = '1';
			});
		}

		if (typeof history.replaceState === 'function') {
			history.replaceState(sectionId, '', '#' + sectionId);
		}
	}

	function onSectionClick(ev) {
		var section = ev.target.closest('.section');
		if (!section || section.classList.contains('active')) return;

		var content = document.querySelector('.active .content');
		if (content) content.style.opacity = '0';

		clearTimeout(pageTimeout);
		pageTimeout = setTimeout(function () {
			setActiveSection(section.id);
		}, 300);
	}

	function initDesktopTabs() {
		var sections = document.querySelectorAll('#page .section');
		var state = (typeof history.state === 'string' && history.state) || null;
		var hash = window.location.hash.slice(1);
		var initial = state || (hash && document.getElementById(hash) ? hash : 'welcome');

		document.querySelectorAll('.section').forEach(function (s) {
			s.classList.remove('active');
		});
		var activeEl = document.getElementById(initial);
		if (activeEl) {
			activeEl.classList.add('active');
			var c = activeEl.querySelector('.content');
			if (c) c.style.opacity = '1';
		}

		if (!state && typeof history.replaceState === 'function') {
			history.replaceState(initial, '', '#' + initial);
		}

		document.querySelector('.cover').style.opacity = '0';
		pageTimeout = setTimeout(function () {
			document.querySelector('.cover').style.display = 'none';
		}, coverFadeMs);

		sections.forEach(function (section) {
			section.addEventListener('click', onSectionClick);
		});
	}

	function updateArrowVisibility() {
		var left = document.getElementById('l');
		var right = document.getElementById('r');
		if (left) left.setAttribute('aria-hidden', projectIndex <= 0 ? 'true' : 'false');
		if (right) right.setAttribute('aria-hidden', projectIndex >= projectCount - 1 ? 'true' : 'false');
	}

	function moveTiles(dir) {
		if (dir === 'r' && projectIndex < projectCount - 1) projectIndex++;
		else if (dir === 'l' && projectIndex > 0) projectIndex--;

		var tiles = getTilesContainer();
		if (tiles) {
			tiles.querySelectorAll('.tile').forEach(function (tile) {
				tile.style.transform = 'translateX(-' + (tileWidth * projectIndex) + 'px)';
			});
		}
		updateArrowVisibility();
	}

	function initCarousel() {
		var tiles = getTiles();
		projectCount = tiles.length;
		if (projectCount === 0) return;

		tiles.forEach(function (tile, i) {
			tile.style.transform = 'translateX(-' + (tileWidth * projectIndex) + 'px)';
		});

		updateArrowVisibility();

		var leftBtn = document.getElementById('l');
		var rightBtn = document.getElementById('r');
		if (leftBtn) leftBtn.addEventListener('click', function () { moveTiles('l'); });
		if (rightBtn) rightBtn.addEventListener('click', function () { moveTiles('r'); });
	}

	function initHashSync() {
		function applyHash() {
			var hash = window.location.hash.slice(1);
			if (hash && document.getElementById(hash)) {
				document.querySelectorAll('.section').forEach(function (s) {
					s.classList.remove('active');
					var c = s.querySelector('.content');
					if (c) c.style.opacity = '0';
				});
				var el = document.getElementById(hash);
				if (el) {
					el.classList.add('active');
					var c = el.querySelector('.content');
					if (c) c.style.opacity = '1';
				}
			}
		}

		window.addEventListener('hashchange', applyHash);
	}

	function init() {
		// Lazy-load any images with data-src (legacy support)
		document.querySelectorAll('img[data-src]').forEach(function (img) {
			var src = img.getAttribute('data-src');
			if (src) {
				img.setAttribute('src', src);
				img.removeAttribute('data-src');
			}
		});

		var isDesktop = window.innerWidth >= 1080;
		if (isDesktop) {
			initDesktopTabs();
		} else {
			document.querySelector('.cover').style.display = 'none';
		}

		initCarousel();
		initHashSync();
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
