/* Sioux Falls Generator Pros — site behavior
   Vanilla JS, no dependencies. */

document.addEventListener("DOMContentLoaded", function () {
  var cfg = window.SITE_CONFIG || {};

  /* ---- Inject phone number everywhere it's used ---- */
  document.querySelectorAll(".js-phone-number").forEach(function (el) {
    el.textContent = cfg.phoneDisplay || el.textContent;
  });
  document.querySelectorAll(".js-phone-link").forEach(function (el) {
    el.setAttribute("href", "tel:" + (cfg.phoneTel || ""));
  });
  document.querySelectorAll(".js-email").forEach(function (el) {
    el.textContent = cfg.email || el.textContent;
    if (el.tagName === "A") el.setAttribute("href", "mailto:" + cfg.email);
  });
  document.querySelectorAll(".js-year").forEach(function (el) {
    el.textContent = cfg.currentYear || new Date().getFullYear();
  });
  document.querySelectorAll(".js-business-name").forEach(function (el) {
    el.textContent = cfg.businessName || el.textContent;
  });

  /* ---- Mobile nav toggle ---- */
  var navToggle = document.querySelector(".js-nav-toggle");
  var siteNav = document.querySelector(".js-site-nav");
  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var open = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---- Mobile-friendly dropdown (tap to open Services submenu) ---- */
  document.querySelectorAll(".js-has-dropdown > a").forEach(function (link) {
    link.addEventListener("click", function (e) {
      if (window.innerWidth <= 860) {
        var parent = link.parentElement;
        var isOpen = parent.classList.contains("is-open");
        // close any other open dropdowns
        document.querySelectorAll(".js-has-dropdown.is-open").forEach(function (el) {
          el.classList.remove("is-open");
        });
        if (!isOpen) {
          e.preventDefault();
          parent.classList.add("is-open");
        }
      }
    });
  });

  /* ---- Contact / quote form handling (front-end only) ----
     No backend is wired up yet. This just validates, blocks obvious bots
     via a honeypot field, and shows a confirmation message.
     Swap this out for a real submit handler (Formspree, GoHighLevel,
     a Cloudflare Worker, etc.) before launch. */
  document.querySelectorAll(".js-quote-form").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var honeypot = form.querySelector('input[name="company_website"]');
      if (honeypot && honeypot.value) {
        // Likely a bot. Silently "succeed" without processing.
        showFormMessage(form, "Thanks! We'll be in touch shortly.");
        form.reset();
        return;
      }

      var name = form.querySelector('[name="name"]');
      var phone = form.querySelector('[name="phone"]');
      if (name && !name.value.trim()) {
        showFormMessage(form, "Please enter your name.", true);
        return;
      }
      if (phone && !phone.value.trim()) {
        showFormMessage(form, "Please enter a phone number so we can call you back.", true);
        return;
      }

      // TODO: replace with a real submission (fetch() to a form backend).
      showFormMessage(
        form,
        "Thanks — your request is in. We'll call you back the same business day."
      );
      form.reset();
    });
  });

  function showFormMessage(form, text, isError) {
    var box = form.parentElement.querySelector(".js-form-message");
    if (!box) {
      box = document.createElement("div");
      box.className = "sfgp-form-message js-form-message";
      form.parentElement.appendChild(box);
    }
    box.textContent = text;
    box.classList.toggle("sfgp-form-message--error", !!isError);
    box.classList.add("is-visible");
  }
});
