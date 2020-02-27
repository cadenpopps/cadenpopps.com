let activePage;

const ANIMATIONS = true, NO_ANIMATIONS = false;

$(document).ready(function () {

	if (window.innerWidth >= 900) {
		initPages();
		initMenu();
	}

});

function removeTransitionDuration(element) {
	$(element).css("transition-duration", "0s");
}

function setTransitionDuration(element, time) {
	$(element).css("transition-duration", time);
}

function restoreTransitionDuration(element) {
	$(element).css("transition-duration", "");
}

function restoreTransform(element) {
	$(element).css("transform", "");
}

function initPages() {
	if (history.state === null) {
		activePage = "home";
	}
	else {
		activePage = history.state;
	}

	history.replaceState(activePage, "cadenpopps.com", "/#" + activePage);
	$(".page").css("display", "none");
	$(".page").css("opacity", "1");

	switch(activePage) {
		case "home":
			document.title = "Home | cadenpopps.com";
			initHomePage();
			break;
		case "portfolio":
			document.title = "Portfolio | cadenpopps.com";
			initPortfolioPage();
			break;
		case "about":
			document.title = "About | cadenpopps.com";
			initAboutPage();
			break;
		case "contact":
			document.title = "Contact | cadenpopps.com";
			initContactPage();
			break;
	}

	$("#explore-work-button").click(function() {
		setActivePage("portfolio");
	});
}

function initMenu() {

	removeTransitionDuration($(".menu-item"));
	removeTransitionDuration($("#menu-underline"));

	$("#" + activePage + "-button").addClass("active");

	setTimeout(function() {
		let width = $("#" + activePage + "-button").outerWidth() + 2;
		let position = $("#" + activePage + "-button").position().left - 6;
		$("#menu-underline").css("width", width);
		$("#menu-underline").css("transform", "translate(" + position + "px)");
		setTimeout(function() {
			restoreTransitionDuration($(".menu-item"));
			restoreTransitionDuration($("#menu-underline"));
			$("#menu-underline").css("opacity", "1");
		}, 100);
	}, 100);

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
}


function setActivePage(pageName) {
	activePage = pageName;
	history.replaceState(pageName, "cadenpopps.com", "/#" + pageName);
	$(".page").css("opacity", "0");
	setTimeout(function() {
		$(".page").css("display", "none");
		$("#" + activePage).css("display", "flex");
		setTimeout(function() {
			$("#" + activePage).css("opacity", "1");
		}, 10);
	}, 250);

	fixMenu();


	switch(pageName) {
		case "home":
			document.title = "Home | cadenpopps.com";
			break;
		case "portfolio":
			document.title = "Portfolio | cadenpopps.com";
			break;
		case "about":
			document.title = "About | cadenpopps.com";
			break;
		case "contact":
			document.title = "Contact | cadenpopps.com";
			break;
	}
}

function fixMenu() {
	$(".menu-item.active").removeClass("active");
	$("#" + activePage + "-button").addClass("active");
	fixMenuUnderline();
}

function fixMenuUnderline() {
	let width = $("#" + activePage + "-button").outerWidth() + 2;
	let position = $("#" + activePage + "-button").position().left - 6;
	$("#menu-underline").css("width", width);
	$("#menu-underline").css("transform", "translate(" + position + "px)");
}

function initHomePage() {
	const ANIMATION_DELAY = 200;
	const TEXT_ANIMATION_TIME = 800;
	const TIME_BETWEEN_TEXT_ANIMATIONS = 60;
	const SOCIAL_ANIMATION_TIME = 200;
	const TIME_BETWEEN_SOCIAL_ANIMATIONS = 100;
	const TOTAL_TEXT_ANIMATION_TIME = TEXT_ANIMATION_TIME + (2 * TIME_BETWEEN_TEXT_ANIMATIONS);

	$("#home").css("display", "flex");

	removeTransitionDuration(".home-text");
	$(".home-text").css("opacity", "0");
	$(".home-text").css("transform", "translate(0, 250px)");
	removeTransitionDuration("#home-social-links>.social-link");
	$("#home-social-links>.social-link").css("transform", "translate(-75px, 0)");

	setTimeout(function() {

		setTransitionDuration(".home-text", TEXT_ANIMATION_TIME + "ms");
		restoreTransform("#home-title");
		$("#home-title").css("opacity", "");
		setTimeout(function() {
			restoreTransform("#home-subtitle");
			$("#home-subtitle").css("opacity", "");
		}, 1 * TIME_BETWEEN_TEXT_ANIMATIONS);
		setTimeout(function() {
			$("#explore-work-button").css("opacity", "");
			restoreTransform("#explore-work-button");
		}, (2 * TIME_BETWEEN_TEXT_ANIMATIONS));
		setTimeout(function() {
			restoreTransitionDuration(".home-text");
		}, TOTAL_TEXT_ANIMATION_TIME);

		setTransitionDuration("#home-social-links>.social-link", SOCIAL_ANIMATION_TIME + "ms");
		setTimeout(function() {
			restoreTransform("#home-social-links>#github");
		}, TOTAL_TEXT_ANIMATION_TIME + (1 * TIME_BETWEEN_SOCIAL_ANIMATIONS));
		setTimeout(function() {
			restoreTransform("#home-social-links>#linkedin");
		}, TOTAL_TEXT_ANIMATION_TIME + (2 * TIME_BETWEEN_SOCIAL_ANIMATIONS));
		setTimeout(function() {
			restoreTransform("#home-social-links>#fiverr");
		}, TOTAL_TEXT_ANIMATION_TIME + (3 * TIME_BETWEEN_SOCIAL_ANIMATIONS));
		setTimeout(function() {
			restoreTransitionDuration("#home-social-links>.social-link");
		}, TOTAL_TEXT_ANIMATION_TIME + (3 * TIME_BETWEEN_SOCIAL_ANIMATIONS) + SOCIAL_ANIMATION_TIME);

	}, ANIMATION_DELAY);
}

function initPortfolioPage() {
	const ANIMATION_DELAY = 200;
	const ANIMATION_TIME = 800;
	const TIME_BETWEEN_ANIMATIONS = 60;

	$("#portfolio").css("display", "flex");

	if(window.scrollY < 400) {
		removeTransitionDuration("#portfolio-title-container");
		removeTransitionDuration("#portfolio-description");
		removeTransitionDuration("#projects");
		$("#portfolio-title-container").css("transform", "translate(0, 1000px)");
		$("#portfolio-description").css("transform", "translate(0, 1000px)");
		$("#projects").css("transform", "translate(0, 1000px)");

		setTimeout(function() {
			setTransitionDuration("#portfolio-title-container", ANIMATION_TIME + "ms");
			setTransitionDuration("#portfolio-description", ANIMATION_TIME + "ms");
			setTransitionDuration("#projects", ANIMATION_TIME + "ms");

			restoreTransform("#portfolio-title-container");
			setTimeout(function() {
				restoreTransform("#portfolio-description");
			}, 1 * TIME_BETWEEN_ANIMATIONS);
			setTimeout(function() {
				restoreTransform("#projects");
			}, (2 * TIME_BETWEEN_ANIMATIONS));

		}, ANIMATION_DELAY);

		restoreTransitionDuration("#portfolio-title-container");
		restoreTransitionDuration("#portfolio-description");
		restoreTransitionDuration("#projects");
	}
}

function initAboutPage() {

}

function initContactPage() {
	const ANIMATION_DELAY = 200;
	const TEXT_ANIMATION_TIME = 800;
	const TIME_BETWEEN_TEXT_ANIMATIONS = 60;

	const SOCIAL_ANIMATION_DELAY = 200;
	const SOCIAL_ANIMATION_TIME = 200;
	const TIME_BETWEEN_SOCIAL_ANIMATIONS = 100;

	const TOTAL_TEXT_ANIMATION_TIME = TEXT_ANIMATION_TIME + TIME_BETWEEN_TEXT_ANIMATIONS;

	$("#contact").css("display", "flex");
	$("#contact").css("height", "100vh");

	//problem with height of contact cutting off animation

	removeTransitionDuration("#contact-text");
	$("#contact-text").css("opacity", "0");
	$("#contact-text").css("transform", "translate(0, 250px)");
	removeTransitionDuration("#contact-email");
	$("#contact-email").css("opacity", "0");
	$("#contact-email").css("transform", "translate(0, 250px)");
	removeTransitionDuration("#contact-social-links>.social-link");
	$("#contact-social-links>.social-link").css("opacity", "0");
	$("#contact-social-links>.social-link").css("transform", "translate(0, 250px)");

	setTimeout(function() {

		setTransitionDuration("#contact-text", TEXT_ANIMATION_TIME + "ms");
		setTransitionDuration("#contact-email", TEXT_ANIMATION_TIME + "ms");

		restoreTransform("#contact-text");
		$("#contact-text").css("opacity", "");
		setTimeout(function() {
			restoreTransform("#contact-email");
			$("#contact-email").css("opacity", "");
		}, 1 * TIME_BETWEEN_TEXT_ANIMATIONS);
		setTimeout(function() {
			restoreTransitionDuration(".home-text");
		}, TOTAL_TEXT_ANIMATION_TIME);

		setTransitionDuration("#contact-social-links>.social-link", SOCIAL_ANIMATION_TIME + "ms");
		setTimeout(function() {
			restoreTransform("#contact-social-links>#github");
			$("#contact-social-links>#github").css("opacity", "");
		}, TOTAL_TEXT_ANIMATION_TIME + (1 * TIME_BETWEEN_SOCIAL_ANIMATIONS));
		setTimeout(function() {
			restoreTransform("#contact-social-links>#linkedin");
			$("#contact-social-links>#linkedin").css("opacity", "");
		}, TOTAL_TEXT_ANIMATION_TIME + (2 * TIME_BETWEEN_SOCIAL_ANIMATIONS));
		setTimeout(function() {
			restoreTransform("#contact-social-links>#fiverr");
			$("#contact-social-links>#fiverr").css("opacity", "");
		}, TOTAL_TEXT_ANIMATION_TIME + (3 * TIME_BETWEEN_SOCIAL_ANIMATIONS));
		setTimeout(function() {
			restoreTransitionDuration("#home-social-links>.social-link");
			$("#contact").css("height", "auto");
		}, TOTAL_TEXT_ANIMATION_TIME + (4 * TIME_BETWEEN_SOCIAL_ANIMATIONS) + SOCIAL_ANIMATION_TIME);


	}, ANIMATION_DELAY);

}
