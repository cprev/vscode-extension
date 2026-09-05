// ores-lint house config, tailored for this VS Code extension.
//
// MIGRATION NOTE: ported from a legacy `.eslintrc.json` that ESLint 9+ ignores
// entirely, so none of it was being enforced:
//
//   "@typescript-eslint/semi": "warn"   -> covered by the house `semi` rule
//   "semi": "off"                       -> DELIBERATELY NOT PORTED. It existed
//                                          only to hand semicolons to the
//                                          @typescript-eslint variant; the house
//                                          style requires semicolons, so `semi`
//                                          stays on.
//   "curly": "warn"                     -> ported
//   "eqeqeq": "warn"                    -> already in the house baseline
//   "no-throw-literal": "warn"          -> ported
//   "@typescript-eslint/class-name-casing" -> dropped; the rule was removed from
//                                          typescript-eslint years ago.
//   "parser": "@typescript-eslint/parser" -> handled automatically by base.mjs
//                                          when the parser is installed.
import oresConfig from './.ores-lint/eslint/base.mjs';

export default await oresConfig({
  rules: {
    curly: ['warn', 'all'],
    'no-throw-literal': 'warn',
  },
});
