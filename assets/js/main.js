
/**
 * Template Name: Craftivo
 * Template URL: https://bootstrapmade.com/craftivo-bootstrap-portfolio-template/
 * Updated: Oct 04 2025 with Bootstrap v5.3.8
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");

    if (!selectHeader) return;

    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    ) {
      return;
    }

    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile navigation
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");

    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.classList.toggle("bi-list");
      mobileNavToggleBtn.classList.toggle("bi-x");
    }
  }

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener("click", mobileNavToogle);
  }

  /**
   * Hide mobile navigation on links click
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile navigation dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();

      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");

      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");

  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener("click", (e) => {
      e.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * AOS animations
   */
  function aosInit() {
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 600,
        easing: "ease-in-out",
        once: true,
        mirror: false
      });
    }
  }

  window.addEventListener("load", aosInit);

  /**
   * Typed.js initialization
   */
  const selectTyped = document.querySelector(".typed");
  let typedInstance = null;

  function initTyped() {
    if (!selectTyped || typeof Typed === "undefined") return;

    if (typedInstance) {
      typedInstance.destroy();
      typedInstance = null;
    }

    const typedStrings =
      selectTyped.getAttribute("data-typed-items") || "";

    const strings = typedStrings
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    if (strings.length === 0) return;

    typedInstance = new Typed(".typed", {
      strings: strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
      smartBackspace: true
    });
  }

  initTyped();

  /**
   * Reinitialize Typed.js when the language changes
   */
  document.addEventListener("languageChanged", () => {
    initTyped();
  });

  /**
   * Animate skills on reveal
   */
  const skillsAnimation = document.querySelectorAll(".skills-animation");

  if (typeof Waypoint !== "undefined") {
    skillsAnimation.forEach((item) => {
      new Waypoint({
        element: item,
        offset: "80%",

        handler: function () {
          const progress = item.querySelectorAll(
            ".progress .progress-bar"
          );

          progress.forEach((el) => {
            el.style.width =
              el.getAttribute("aria-valuenow") + "%";
          });
        }
      });
    });
  }

  /**
   * GLightbox
   */
  if (typeof GLightbox !== "undefined") {
    GLightbox({
      selector: ".glightbox"
    });
  }

  /**
   * Isotope layout and filters
   */
  if (
    typeof Isotope !== "undefined" &&
    typeof imagesLoaded !== "undefined"
  ) {
    document.querySelectorAll(".isotope-layout").forEach((isotopeItem) => {
      const layout =
        isotopeItem.getAttribute("data-layout") ?? "masonry";

      const filter =
        isotopeItem.getAttribute("data-default-filter") ?? "*";

      const sort =
        isotopeItem.getAttribute("data-sort") ?? "original-order";

      let initIsotope;

      const isotopeContainer =
        isotopeItem.querySelector(".isotope-container");

      if (!isotopeContainer) return;

      imagesLoaded(isotopeContainer, function () {
        initIsotope = new Isotope(isotopeContainer, {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort
        });
      });

      isotopeItem
        .querySelectorAll(".isotope-filters li")
        .forEach((filters) => {
          filters.addEventListener("click", function () {
            const activeFilter = isotopeItem.querySelector(
              ".isotope-filters .filter-active"
            );

            if (activeFilter) {
              activeFilter.classList.remove("filter-active");
            }

            this.classList.add("filter-active");

            if (initIsotope) {
              initIsotope.arrange({
                filter: this.getAttribute("data-filter")
              });
            }

            if (typeof aosInit === "function") {
              aosInit();
            }
          });
        });
    });
  }

  /**
   * Swiper sliders
   */
  function initSwiper() {
    if (typeof Swiper === "undefined") return;

    document.querySelectorAll(".init-swiper").forEach((swiperElement) => {
      const configElement =
        swiperElement.querySelector(".swiper-config");

      if (!configElement) return;

      const config = JSON.parse(configElement.innerHTML.trim());

      if (swiperElement.classList.contains("swiper-tab")) {
        if (
          typeof initSwiperWithCustomPagination === "function"
        ) {
          initSwiperWithCustomPagination(swiperElement, config);
        }
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position for hash links
   */
  window.addEventListener("load", function () {
    if (window.location.hash) {
      const section = document.querySelector(window.location.hash);

      if (section) {
        setTimeout(() => {
          const scrollMarginTop =
            getComputedStyle(section).scrollMarginTop;

          window.scrollTo({
            top:
              section.offsetTop -
              parseInt(scrollMarginTop || 0, 10),
            behavior: "smooth"
          });
        }, 100);
      }
    }
  });

  /**
   * Navigation scrollspy
   */
  const navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;

      const section = document.querySelector(navmenulink.hash);

      if (!section) return;

      const position = window.scrollY + 200;

      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));

        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }

  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);

})();
