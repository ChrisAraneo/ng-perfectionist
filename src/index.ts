import type { ESLint, Rule } from 'eslint';

import { sortComponentImports } from './rules/sort-component-imports.js';
import { sortDirectiveImports } from './rules/sort-directive-imports.js';

const rules: Record<string, Rule.RuleModule> = {
  'sort-component-imports': sortComponentImports as unknown as Rule.RuleModule,
  'sort-directive-imports': sortDirectiveImports as unknown as Rule.RuleModule,
};

const plugin: ESLint.Plugin = {
  meta: {
    name: '@chris.araneo/eslint-plugin-ng-perfectionist',
    version: '0.1.0',
  },
  rules,
};

export default plugin;
