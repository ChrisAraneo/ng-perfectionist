import { type TSESTree } from '@typescript-eslint/utils';
import { chain } from 'lodash-es';

import { getDecoratorFirstArg } from './transforms/get-decorator-first-arg.js';
import { toArrayExpression } from './transforms/to-array-expression.js';
import { findStyleUrlsProperty } from './finds/find-style-urls-property.js';

export const getStyleUrlsArray = (
  node: TSESTree.Decorator | undefined,
): TSESTree.ArrayExpression | undefined =>
  chain(node)
    .thru(getDecoratorFirstArg)
    .thru(findStyleUrlsProperty)
    .thru(toArrayExpression)
    .value();
