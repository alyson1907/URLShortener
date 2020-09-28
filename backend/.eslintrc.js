// prettier-ignore
/* eslint-disable */
module.exports = {
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
    },
  },
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    "jest": true,
    "commonjs": true,
    "jasmine": true,
    "mocha": true,
  },
 "extends": ["eslint:recommended", "plugin:react/recommended"],
 "rules": {
    "no-unused-vars": 2,
    "indent": [2, 2],
    "linebreak-style": [2, "unix"],
    "quotes": [2, "single"],
    "semi": [2, "never"],
    "implicit-arrow-linebreak": [2, "beside"],
    // Spacing rules
    "space-before-blocks": [2, { "functions": "always", "keywords": "always", "classes": "always" }],
    "array-bracket-spacing": [2, "never"],
    "spaced-comment": [2, "always"],
    "arrow-spacing": [2, { "before": true, "after": true }],
    "key-spacing": [2, { "beforeColon": false, "afterColon": true, "mode": "strict" }],
  },
}
