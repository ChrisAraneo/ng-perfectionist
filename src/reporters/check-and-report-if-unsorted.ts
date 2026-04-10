import { noop } from 'lodash-es';
import { type TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

import { getNonNullElements } from '../transforms/get-non-null-elements.js';
import { reportUnsorted } from './report-unsorted.js';
import { match } from 'ts-pattern';
import { getElementTextsAndSortedTexts } from '../transforms/get-element-texts-and-sorted-texts.js';

type Input = {
  array: TSESTree.ArrayExpression | undefined;
  context: RuleContext<'unsorted', []>;
};

export const checkAndReportIfUnsorted = ({ array, context }: Input): void =>
  match(array)
    .with(undefined, noop)
    .otherwise((array) =>
      match(getNonNullElements(array))
        .with(undefined, noop)
        .otherwise((elements) =>
          match(getElementTextsAndSortedTexts(context, elements))
            .with({ isEqual: true }, noop)
            .otherwise(({ sorted }) =>
              reportUnsorted(context, array, elements, sorted),
            ),
        ),
    );
