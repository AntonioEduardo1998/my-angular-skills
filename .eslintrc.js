const { gitIgnorePatterns } = require('./tools/utils/git-ignore-patterns');

const buildMemberDelimiter = (delimiter) => ({
  multiline: { delimiter, requireLast: true },
  singleline: { delimiter, requireLast: false },
});

const commonJSAndTSRules = {
  'array-bracket-newline': ['error', 'consistent'],
  'array-element-newline': ['error', 'consistent'],
  'function-paren-newline': ['error', 'multiline-arguments'],
  'import/no-extraneous-dependencies': ['error', {
    devDependencies: [
      './src/test.ts',
      './tools/**/*',
      './**/*.{d,spec}.ts',
      './*.{js,ts}',
    ],
  }],
  'import/order': ['error', {
    alphabetize: { order: 'asc' },
    'newlines-between': 'always',
  }],
  'import/prefer-default-export': 'off',
  'object-curly-newline': ['error', { consistent: true }],
  'object-curly-spacing': ['error', 'always'],
};

const project = './tsconfig.json';

const baseTSConfig = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    project,
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project,
      },
    },
  },
};

module.exports = {
  root: true,
  ignorePatterns: [
    ...gitIgnorePatterns,
    '!.*.js',
  ],
  overrides: [
    // Javascript
    {
      files: [
        './**/*.js',
      ],
      extends: [
        'airbnb-base',
      ],
      parserOptions: {
        ecmaVersion: 2020,
      },
      rules: {
        ...commonJSAndTSRules,
      },
    },
    // TypeScript
    {
      files: [
        './**/*.ts',
      ],
      extends: [
        'plugin:@typescript-eslint/recommended',
        // @Watch https://github.com/typescript-eslint/typescript-eslint/issues/2094 for 'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:@angular-eslint/recommended',
        'airbnb-typescript/base',
      ],
      ...baseTSConfig,
      rules: {
        ...commonJSAndTSRules,
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'mas',
            style: 'camelCase',
          },
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'mas',
            style: 'kebab-case',
          },
        ],
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/member-delimiter-style': ['error', {
          ...buildMemberDelimiter('comma'),
          overrides: {
            interface: buildMemberDelimiter('semi'),
          },
        }],
        'import/dynamic-import-chunkname': 'error',
        'max-len': ['error', 120, 2, {
          ignoreUrls: true,
          ignoreComments: false,
          ignoreRegExpLiterals: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        }],
        'no-restricted-imports': ['error', { patterns: ['../*', './*'] }],
      },
    },
    // Angular component HTML
    {
      files: [
        './**/*.component.html',
      ],
      extends: [
        'plugin:@angular-eslint/template/recommended',
      ],
      rules: {
        '@angular-eslint/template/banana-in-box': 'error',
      },
    },
  ],
};
