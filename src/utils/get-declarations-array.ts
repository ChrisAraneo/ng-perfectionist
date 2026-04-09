import { AST_NODE_TYPES, type TSESTree } from '@typescript-eslint/utils';
import { chain } from 'lodash-es';
import { match } from 'ts-pattern';

import { findDeclarationsProperty } from '../utils/find-declarations-property.js';
import { getDecoratorFirstArg } from '../utils/get-decorator-first-arg.js';

export const getDeclarationsArray = (
  node: TSESTree.Decorator | undefined,
): TSESTree.ArrayExpression | undefined =>
  chain(node)
    .thru(getDecoratorFirstArg)
    .thru(findDeclarationsProperty)
    .thru((property) =>
      match(property?.value)
        .with(
          { type: AST_NODE_TYPES.ArrayExpression },
          (value) => value as TSESTree.ArrayExpression,
        )
        .otherwise(() => undefined),
    )
    .value();
