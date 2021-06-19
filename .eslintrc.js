module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended'
  ],
  plugins: ['simple-import-sort'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'sort-imports': 'off',
    'import/order': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'comma-dangle': ['error', 'never'],
    quotes: ['error', 'single', { avoidEscape: true }],
    'arrow-parens': ['error', 'as-needed'],
    'max-len': ['error', { code: 300 }],
    'no-plusplus': 'off',
    'prefer-destructuring': ['error', { VariableDeclarator: { object: true } }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-named-as-default': 'off',
    'import/no-cycle': 'off',
    'no-prototype-builtins': 'off',
    'no-restricted-syntax': 'off',
    'guard-for-in': 'off',
    'no-throw-literal': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'global-require': 'off',
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              ['^vue(/.*|$)', '^vue-class-component(/.*|$)', '^vue-property-decorator(/.*|$)'],
              // Node.js builtins. You could also generate this regex if you use a `.js` config.
              // For example: `^(${require("module").builtinModules.join("|")})(/|$)`
              [
                '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)'
              ],
              // Components
              ['^(@/components|components)(/.*|$)', '^.*\\.vue$'],
              // Classes
              ['^@/classes(/.*|$)'],
              // Parent imports. Put `..` last. Put same-folder imports and  Other relative imports. `.` last.
              ['^\\.\\.(?!/?$)', '^\\.\\./?$', '^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$']
            ]
          }
        ]
      }
    }
  ]
};
