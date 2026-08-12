/**
 * SITE_CONFIG — single source of truth for business info + tracking IDs.
 *
 * Update the values below and every page picks them up automatically
 * (phone numbers are injected by js/main.js into any element tagged
 * with the js-phone-number / js-phone-link classes).
 *
 * BEFORE GOING LIVE:
 *   1. phoneDisplay / phoneTel -> replace with your real CallRail tracking number
 *   2. ga4MeasurementId        -> already set to the live GA4 property (G-G212NXBPZN)
 *   3. callrailScriptSrc       -> paste the swap.js URL CallRail gives you for this site
 */
window.SITE_CONFIG = {
  businessName: "Sioux Falls Generator Pros",
  tagline: "Whole-Home Generator Installation & Repair in Sioux Falls, SD",

  // --- PLACEHOLDER phone number. Swap for your CallRail tracking number before launch. ---
  phoneDisplay: "(605) 702-6227",
  phoneTel: "+16057026227",

  email: "info@siouxfallsgenerator.com",
  addressCity: "Sioux Falls, SD",

  // --- Analytics / tracking ---
  ga4MeasurementId: "G-G212NXBPZN", // Sioux Falls Generator Pros GA4 property (live)
  callrailScriptSrc: "", // TODO: e.g. "//cdn.callrail.com/companies/XXXXXXXXX/XXXXXXXXXXXXXXXX/12/swap.js"

  currentYear: new Date().getFullYear()
};
