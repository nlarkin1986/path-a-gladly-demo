/**
 * Path A — client-side demo-spec compile from warm pack + chip state.
 * Pure: no network. Filter beats, products, softClose; renumber turns.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.PathACompile = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var CHIP_BEATS = {
    product_q: ["product_q"],
    compare: ["compare"],
    fit_refine: ["fit", "refine"],
    social: ["social"],
    policy: ["policy"],
    soft_close: ["soft_close"]
  };

  function defaultChipState() {
    return {
      product_q: true,
      compare: true,
      fit_refine: true,
      social: true,
      policy: true,
      soft_close: true
    };
  }

  function allowedBeatSet(chipState) {
    var chips = chipState || defaultChipState();
    var allowed = { arrive: true };
    Object.keys(CHIP_BEATS).forEach(function (chip) {
      if (chips[chip]) {
        CHIP_BEATS[chip].forEach(function (b) {
          allowed[b] = true;
        });
      }
    });
    return allowed;
  }

  /**
   * @param {object} baseSpec - warm pack demo-spec
   * @param {object} chipState - { product_q, compare, fit_refine, social, policy, soft_close }
   * @returns {object} compiled demo-spec (shallow-cloned fields)
   */
  function compileDemoSpec(baseSpec, chipState) {
    if (!baseSpec || typeof baseSpec !== "object") {
      throw new Error("compileDemoSpec: baseSpec required");
    }
    var chips = Object.assign(defaultChipState(), chipState || {});
    var allowed = allowedBeatSet(chips);

    var turns = (baseSpec.turns || []).filter(function (t) {
      var beat = t && t.beat ? String(t.beat) : "arrive";
      // arrive always allowed; unknown beats kept only if somehow selected (arrive fallback)
      if (beat === "arrive") return true;
      return !!allowed[beat];
    });

    // Compare OFF → empty products (and compare beats already dropped)
    var products = chips.compare
      ? (baseSpec.products || []).slice()
      : [];

    var softClose = chips.soft_close ? !!baseSpec.softClose : false;

    // Re-number i 1..n
    turns = turns.map(function (t, idx) {
      var copy = Object.assign({}, t);
      copy.i = idx + 1;
      return copy;
    });

    return {
      prospect: baseSpec.prospect ? Object.assign({}, baseSpec.prospect) : undefined,
      header: baseSpec.header ? Object.assign({}, baseSpec.header) : undefined,
      plate: baseSpec.plate ? Object.assign({}, baseSpec.plate) : undefined,
      softClose: softClose,
      products: products,
      turns: turns,
      // Carry pack hint for pane asset resolve if plate missing
      __pack: baseSpec.__pack
    };
  }

  return {
    CHIP_BEATS: CHIP_BEATS,
    defaultChipState: defaultChipState,
    allowedBeatSet: allowedBeatSet,
    compileDemoSpec: compileDemoSpec
  };
});
