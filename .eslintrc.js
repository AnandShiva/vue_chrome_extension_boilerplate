module.exports = {
  env: {
    browser: true,
    es6: true,
    webextensions: true
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    'no-unused-vars': 1,
    // to be changed. List of rules ignored due to old code dependencies. 
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-side-effects-in-computed-properties': 'warn',
    'vue/no-unused-components': 'warn',
    'no-unused-expressions': 'warn',
    'vue/no-unused-vars': 'warn',
    'vue/require-v-for-key': 'warn'
  },
};
