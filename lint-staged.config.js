module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'eslint', 'prettier --write'],
  '**/*.ts?(x)': () => 'npm run check-types',
  '**/*.spc.ts?(x)': () => 'pnpm test',
  '*.{json,yaml}': ['prettier --write'],
};
