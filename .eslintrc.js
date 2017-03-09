module.exports = {
  "env": {
    "es6": true,
    "node": true
  },
  "extends": "vue",
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ],
    "camelcase": [
      "off"
    ]
  },
  "plugins": [
    "html"
  ],
  "settings": {
    "html/html-extensions": [".vue"]
  }
};
