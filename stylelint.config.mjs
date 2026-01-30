export default {
  extends: ["stylelint-config-standard"],
  ignoreFiles: ["**/*.min.css"],
  rules: {
    // Allow class-free semantic selectors
    "selector-max-id": null,
    "selector-max-type": null,
    "selector-max-attribute": null,
    "selector-max-compound-selectors": null,
    "selector-no-qualifying-type": null,
    
    // Modern CSS features
    "selector-pseudo-class-no-unknown": [true, {
      ignorePseudoClasses: ["has", "is", "where"]
    }],
    "property-no-unknown": [true, {
      ignoreProperties: ["container-type", "container-name"]
    }],
    
    // Allow custom properties and semantic naming
    "custom-property-pattern": null,
    "selector-class-pattern": null,
    
    // Formatting - relaxed (focus on bugs, not style)
    "declaration-empty-line-before": null,
    "rule-empty-line-before": null,
    "at-rule-empty-line-before": null,
    "color-hex-length": null,
    "value-keyword-case": null,
    "custom-property-empty-line-before": null,
    "declaration-block-single-line-max-declarations": null,
    "declaration-block-no-redundant-longhand-properties": null,
    
    // Allow both old and new syntax
    "media-feature-range-notation": null,
    "selector-pseudo-element-colon-notation": null,
    "selector-not-notation": null,
    
    // Allow intentional patterns
    "no-duplicate-selectors": null,
    "block-no-empty": null,
    
    // Allow vendor prefixes (autoprefixer handles this)
    "property-no-vendor-prefix": null,
    "value-no-vendor-prefix": null,
    
    // Practical overrides
    "no-descending-specificity": null,
    "font-family-no-missing-generic-family-keyword": null,
    "alpha-value-notation": "number",
    "color-function-notation": null,
    "media-feature-name-value-no-unknown": null,
  }
};
