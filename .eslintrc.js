module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  extends: [
    'eslint:recommended',
  ],
  rules: {
    'block-spacing': 'error',
    'brace-style': ['error', '1tbs', {
      'allowSingleLine': true,
    }],
    'capitalized-comments': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'eol-last': ['error', 'always'],
    'func-call-spacing': ['error', 'never'],
    'func-style': ['error', 'declaration', {
      'allowArrowFunctions': true,
    }],
    'line-comment-position': ['error', {
      'position': 'beside',
    }],
    'lines-around-comment': ['error', {
      'afterBlockComment': true,
      'beforeBlockComment': true,
    }],
    'newline-after-var': ['error', 'always'],
    'newline-before-return': 'error',
    'no-trailing-spaces': 'error',
    'object-property-newline': 'error',
    'one-var': ['error', 'never'],
    'space-before-blocks': 'error',
  },
};
