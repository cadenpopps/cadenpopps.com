let activePage;

const ANIMATIONS = true, NO_ANIMATIONS = false;

$(document).ready(function () {

	if (window.innerWidth >= 900) {
		initPages();
	}

});

function setActivePage(pageName) {
	activePage = pageName;
	history.replaceState(pageName, "cadenpopps.com", "/#" + pageName);
	$(".page").css("display", "none");
	$("#" + activePage).css("display", "flex");

	fixMenu(ANIMATIONS);

	switch(pageName) {
		case "home":
			document.title = "Home | cadenpopps.com";
			$(".page").css("display", "none");
			$("#home").css("display", "flex");
			break;
		case "portfolio":
			document.title = "Portfolio | cadenpopps.com";
			$(".page").css("display", "none");
			$("#portfolio").css("display", "flex");
			break;
		case "about":
			document.title = "About | cadenpopps.com";
			$(".page").css("display", "none");
			$("#about").css("display", "flex");
			break;
		case "contact":
			document.title = "Contact | cadenpopps.com";
			$(".page").css("display", "none");
			$("#contact").css("display", "flex");
			break;
	}
}

function fixMenu(animations) {
	if(animations) {
		$(".menu-item.active").removeClass("active");
		$("#" + activePage + "-button").addClass("active");
		fixMenuUnderline(ANIMATIONS);
	}
	else {
		$(".menu-item").css("transition-duration", "0s");
		$(".menu-item.active").removeClass("active");
		$("#" + activePage + "-button").addClass("active");
		fixMenuUnderline(NO_ANIMATIONS);
		setTimeout(function() {
			$(".menu-item").css("transition-duration", "");
		}, 10);
	}
}

function fixMenuUnderline(animation) {
	if(animation) {
		let width = $("#" + activePage + "-button").outerWidth() + 2;
		let position = $("#" + activePage + "-button").position().left - 6;
		$("#menu-underline").css("width", width);
		$("#menu-underline").css("transform", "translate(" + position + "px)");
	}
	else {
		$("#menu-underline").css("transition-duration", "0s");
		let width = $("#" + activePage + "-button").outerWidth() + 2;
		let position = $("#" + activePage + "-button").position().left - 6;
		$("#menu-underline").css("width", width);
		$("#menu-underline").css("transform", "translate(" + position + "px)");
		setTimeout(function() {
			$("#menu-underline").css("transition-duration", "");
		}, 10);
	}
}

function initPages() {
	if (history.state === null || history.state == "home") {
		activePage = "home";
	}
	else {
		activePage = history.state;
	}

	history.replaceState(activePage, "cadenpopps.com", "/#" + activePage);

	switch(activePage) {
		case "home":
			document.title = "Home | cadenpopps.com";
			initiateHomePage(ANIMATIONS);
			break;
		case "portfolio":
			document.title = "Portfolio | cadenpopps.com";
			initiateHomePage(NO_ANIMATIONS);
			break;
		case "about":
			document.title = "About | cadenpopps.com";
			initiateHomePage(NO_ANIMATIONS);
			break;
		case "contact":
			document.title = "Contact | cadenpopps.com";
			initiateHomePage(NO_ANIMATIONS);
			break;
	}

	$(".page").css("display", "none");
	$("#" + activePage).css("display", "flex");

	setTimeout(initMenu, 120);
}

function initMenu() {
	fixMenu(NO_ANIMATIONS);
	setTimeout(function() {
		$("#menu-underline").css("opacity", "1");
		$("#home-button").click(function() {
			setActivePage("home");
		});

		$("#portfolio-button").click(function() {
			setActivePage("portfolio");
		});

		$("#about-button").click(function() {
			setActivePage("about");
		});

		$("#contact-button").click(function() {
			setActivePage("contact");
		});
	}, 10);
}

function initiateHomePage(animations) {
	if(animations) {
		const ANIMATION_DELAY = 200;
		const TEXT_ANIMATION_TIME = 800;
		const TIME_BETWEEN_ANIMATIONS = 75;
		setTimeout(function() {
			$(".home-text").css("transition-duration", TEXT_ANIMATION_TIME + "ms");
			$("#home-title").css("opacity", "1");
			$("#home-title").css("transform", "none");

			setTimeout(function() {
				$("#home-subtitle").css("opacity", "1");
				$("#home-subtitle").css("transform", "none");
			}, TIME_BETWEEN_ANIMATIONS);

			setTimeout(function() {
				$("#explore-work-button").css("opacity", "1");
				$("#explore-work-button").css("transform", "none");
				setTimeout(function() {
					$(".home-text").css("transition-duration", "");
				}, TEXT_ANIMATION_TIME);
			}, (2 * TIME_BETWEEN_ANIMATIONS));

			setTimeout(function() {
				$("#github").css("transform", "none");
			}, TEXT_ANIMATION_TIME + (TIME_BETWEEN_ANIMATIONS));
			setTimeout(function() {
				$("#linkedin").css("transform", "none");
			}, TEXT_ANIMATION_TIME + (2 * TIME_BETWEEN_ANIMATIONS));
			setTimeout(function() {
				$("#fiverr").css("transform", "none");
			}, TEXT_ANIMATION_TIME + (3 * TIME_BETWEEN_ANIMATIONS));


		}, ANIMATION_DELAY);
	}
	else {
		$(".home-text").css("transition-duration", "0s");
		$("#home-title").css("opacity", "1");
		$("#home-title").css("transform", "none");
		$("#home-subtitle").css("opacity", "1");
		$("#home-subtitle").css("transform", "none");
		$("#explore-work-button").css("opacity", "1");
		$("#explore-work-button").css("transform", "none");
		setTimeout(function() {
			$(".home-text").css("transition-duration", "");
		}, 10);
		$("#github").css("transform", "none");
		$("#linkedin").css("transform", "none");
		$("#fiverr").css("transform", "none");
	}

	$("#explore-work-button").click(function() {
		setActivePage("portfolio");
	});
}

