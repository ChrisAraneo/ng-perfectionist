import { ESLintUtils, type TSESTree } from '@typescript-eslint/utils';
import { chain } from 'lodash-es';

import { checkIfUnsorted } from '../checks/check-if-unsorted.js';
import { reportUnsorted } from '../reports/report-unsorted.js';
import { getStyleUrlsArray } from '../extracts/get-style-urls-array.js';
import { filterComponentDecorator } from '../filters/filter-component-decorator.js';
import { withContext } from '../transforms/with-context.js';

export const sortComponentStyleUrls = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/ChrisAraneo/eslint-plugin-ng-perfectionist/blob/master/docs/rules/${name}.md`,
)<[], 'unsorted'>({
  name: 'sort-component-style-urls',
  meta: {
    docs: {
      description:
        'Enforce alphabetical sorting of Angular @Component styleUrls array.',
    },
    fixable: 'code',
    messages: {
      unsorted: 'Angular @Component styleUrls should be sorted alphabetically.',
    },
    schema: [],
    type: 'suggestion',
  },
  create: (context) => ({
    Decorator: (node: TSESTree.Decorator) =>
      chain(node)
        .thru(filterComponentDecorator)
        .thru(getStyleUrlsArray)
        .thru(withContext(context))
        .thru(checkIfUnsorted)
        .thru(
          (result) =>
            result &&
            reportUnsorted(
              result.context,
              result.array,
              result.elements,
              result.sorted,
            ),
        )
        .value(),
  }),
  defaultOptions: [],
});
