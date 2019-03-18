module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier', 'react'],
  rules: {
    camelcase: 0,
    'import/no-unresolved': [
      'error',
      {
        ignore: ['./src/server/config/']
      }
    ],
    'no-console': 0,
    'no-unused-expressions': 'off'
  }
};
