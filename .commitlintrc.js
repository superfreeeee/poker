module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // feature
        'config', // configuration
        'fix', // bugfix
        // document
        'doc',
        'docs',
        // code refact
        'refact',
        'refactor',
        'test', // testing
        // build / ci
        'build',
        'ci',
        'style', // style modify
        'revert', // function / code revert
      ],
    ],
  },
};
