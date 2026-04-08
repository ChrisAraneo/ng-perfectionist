import { ESLintUtils, type TSESTree } from '@typescript-eslint/utils';
import { chain } from 'lodash-es';

import { checkAndReportIfUnsorted } from '../utils/check-and-report-if-unsorted.js';
import { getImportsArray } from '../utils/get-imports-array.js';
import { isComponentDecorator } from '../utils/is-component-decorator.js';

export const sortComponentImports = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/ChrisAraneo/eslint-plugin-ng-perfectionist/blob/master/docs/rules/${name}.md`,
)<[], 'unsorted'>({
  name: 'sort-component-imports',
  meta: {
    docs: {
      description:
        'Enforce alphabetical sorting of Angular @Component imports array.',
    },
    fixable: 'code',
    messages: {
      unsorted: 'Angular @Component imports should be sorted alphabetically.',
    },
    schema: [],
    type: 'suggestion',
  },
  create: (context) => ({
    Decorator: (node: TSESTree.Decorator) => {
      if (!isComponentDecorator(node)) {
        return;
      }

      chain(node)
        .thru(getImportsArray)
        .thru((array) => ({ context, array }))
        .thru(checkAndReportIfUnsorted)
        .value();
    },
  }),
  defaultOptions: [],
});
