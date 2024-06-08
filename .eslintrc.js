module.exports = {
  extends: ['universe/native'],
  plugins: ['sort-keys'],
  root: true,
  rules: {
    // Ensures props and state inside functions are always up-to-date
    'react-hooks/exhaustive-deps': 'warn',
    'sort-keys': 0, // disable default eslint sort-keys
    'sort-keys/sort-keys-fix': 1,
  },
};
