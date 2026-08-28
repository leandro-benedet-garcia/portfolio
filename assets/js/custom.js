(function ($) {
	// Close menu after click on smaller screens
	$(window).on("resize", function () {
		let menu = $("#menu");
		if ($(window).width() < 846) {
			$(".main-menu a").on("click", function () {
				menu.removeClass("open");
			});
		}
	});

	function showSection(section, isAnimate) {
		if (section === "")
			return;

		window.location.hash = section;
		let direction = section.replace(/#/, "");
		let selector = `[data-section="${direction}"]`;
		let reqSection = $(selector);
		let reqSectionPos = reqSection.offset().top;

		if (isAnimate) {
			$("body, html").animate(
				{
					scrollTop: reqSectionPos
				},
				800
			);
		} else {
			$("body, html").scrollTop(reqSectionPos);
		}
	}

	function checkSection() {
		$(".section").each(function () {
			let $this = $(this);
			let topEdge = $this.offset().top - 80;
			let bottomEdge = topEdge + $this.height();
			let wScroll = $(window).scrollTop();

			if (topEdge < wScroll && bottomEdge > wScroll) {
				let currentId = $this.data("section");
				let reqLink;
				if (currentId === "terms")
					reqLink = $("a").filter('[href="terms_of_service.html"]');
				else
					reqLink = $("a").filter("[href*=\\#" + currentId + "]");

				reqLink
					.closest("li")
					.addClass("active")
					.siblings()
					.removeClass("active");

			}
		});
	}

	$(window).scroll(function () {
		checkSection();
	});

	$(".responsive-nav").load("/portfolio/main_menu.html", function () {
		$("#menu-toggle").on("click", function (e) {
			let menu = $("#menu");

			if (menu.hasClass("open")) {
				menu.removeClass("open");
			} else {
				menu.addClass("open");
			}
		});

		$("#menu-close").on("click", function (e) {
			$("#menu").removeClass("open");
		});

		$(".main-menu").on("click", "a", function (e) {
			let currPage = window.location.pathname.replace("/", "");

			if (currPage === "portfolio/")
				currPage = "portfolio/index.html";

			let currHref = $(this).attr("href");

			if (currHref.includes(currPage) && currHref.includes("")) {
				e.preventDefault();
				let destination = currHref.split('#')[1];
				showSection(destination, true);
			}
		});

		$(".shortcut").on("click", "", function (e) {
			e.preventDefault();

			showSection($(this).attr("href"), true);
		});

		showSection(window.location.hash, false);
		checkSection();
	});
})(jQuery);
