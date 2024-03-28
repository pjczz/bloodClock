module.exports = {
  root: true,
  env: {
    node: true,
    commonjs: true,
  },
  parserOptions: {
    parser: "@babel/eslint-parser",
    ecmaVersion: 2020,
    requireConfigFile: false,
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/multi-word-component-names": "off",
    "vue/no-reserved-component-names": "off",
  },
};
