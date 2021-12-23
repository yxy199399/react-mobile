module.exports = {
  'src/**/*{js,jsx,ts,tsx,md,html}': [
    'eslint --fix',
    'git add',
    'prettier --write',
  ],
  'src/**/*.scss': ['stylelint --fix --custom-syntax postcss-scss', 'git add'],
}
