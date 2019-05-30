var currentPage;
var scrollPos, scrollStage, scrollMax, scrollHistory;
var pageTimeout;

var projState = 0;
var PROJECTS = 4;

$(document).ready(function () {

	loadImages();

	if ($(window).width() >= 1080) {
		var sectionTransitionDuration = $(".section").css("transition-duration");
		$(".section").css("transition-duration", "0s");
		if (history.state !== null) {
			$("#" + history.state).addClass("active");
		}
		else {
			history.replaceState("welcome", "cadenpopps.com", "/#welcome");
			$("#welcome").addClass("active");
		}
		$(".cover").css("opacity", "0");


		pageTimeout = setTimeout(function () {
			$(".active").find(".content").css("opacity", "1");
			$(".section").css("transition-duration", sectionTransitionDuration);
			$(".cover").css("display", "none");
		}, 400);
		$(".section").click(function (event) {
			if (!$(event.target).closest(".section").hasClass("active")) {
				history.replaceState($(event.target).closest(".section").attr('id'), "cadenpopps.com", "/#" + $(event.target).closest(".section").attr('id'));
				$(".active").find(".content").css("opacity", "0");
				replacePage($(event.target).closest(".section"));
				clearTimeout(pageTimeout);
				pageTimeout = setTimeout(function () {
					$(event.target).closest(".section").find(".content").css("opacity", "1");
				}, 400);
			}
		});
	}

	PROJECTS = $(".tiles").children().length - 2;
	arrowClick();

	$(".arrow").click(function (event) {
		arrowClick($(event.target).attr('id'));
	})

});

function replacePage(query) {
	$(".active").removeClass("active");
	query.addClass("active");
}

function loadImages() {
	[].forEach.call(document.querySelectorAll('img[data-src]'), function (img) {
		img.setAttribute('src', img.getAttribute('data-src'));
		img.onload = function () {
			img.removeAttribute('data-src');
		};
	});
}

function arrowClick(dir) {
	if (dir == 'r' && projState < PROJECTS - 1) {
		projState++;
	}
	else if (dir == 'l' && projState > 0) {
		projState--;
	}
	$(".tile").css('transform', 'translateX(-' + (450 * projState) + 'px)');

	if (projState == 0) {
		$(".leftArrow").css('opacity', '0');
	}
	else if (projState == PROJECTS - 1) {
		$(".rightArrow").css('opacity', '0');
	}
	else {
		$(".leftArrow").css('opacity', '1');
		$(".rightArrow").css('opacity', '1');
	}
}
