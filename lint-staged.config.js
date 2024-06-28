module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'eslint', 'prettier --write'],
  '**/*.ts?(x)': () => 'npm run check-types',
  '**/*.spec.ts?(x)': () => 'pnpm test',
  '*.{json,yaml}': ['prettier --write'],
};
