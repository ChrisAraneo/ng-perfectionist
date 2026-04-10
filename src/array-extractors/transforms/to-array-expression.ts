import { AST_NODE_TYPES, type TSESTree } from '@typescript-eslint/utils';
import { match } from 'ts-pattern';
import { noop } from '../../utils/noop.js';

export const toArrayExpression = (
  property: TSESTree.Property | undefined,
): TSESTree.ArrayExpression | undefined =>
  match(property?.value)
    .with(
      { type: AST_NODE_TYPES.ArrayExpression },
      (value) => value as TSESTree.ArrayExpression,
    )
    .otherwise(noop);
