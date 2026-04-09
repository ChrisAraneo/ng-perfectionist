import { chain, isEqual, noop } from 'lodash-es';
import { type TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

import { getElementTexts } from '../transforms/get-element-texts.js';
import { getNonNullElements } from '../transforms/get-non-null-elements.js';
import { getSortedTexts } from '../transforms/get-sorted-texts.js';
import { reportUnsorted } from './report-unsorted.js';
import { match } from 'ts-pattern';

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
          chain({
            texts: getElementTexts(elements, context.sourceCode),
            sorted: getSortedTexts(
              getElementTexts(elements, context.sourceCode),
            ),
          })
            .thru(({ texts, sorted }) => ({
              texts,
              sorted,
              isEqual: isEqual(texts, sorted),
            }))
            .thru(
              ({ sorted, isEqual }) =>
                !isEqual && reportUnsorted(context, array, elements, sorted),
            )
            .thru(noop)
            .value(),
        ),
    );
