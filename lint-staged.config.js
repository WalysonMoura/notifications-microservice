module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'eslint', 'prettier --write'],
  // '*.{ts,tsx}': ['tsc --noEmit'],
  '**/*.spc.ts?(x)': () => 'pnpm test',
  '*.{json,yaml}': ['prettier --write'],
};
