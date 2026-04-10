import { AST_NODE_TYPES, type TSESTree } from '@typescript-eslint/utils';
import { noop } from 'lodash-es';
import { match } from 'ts-pattern';

export const toArrayExpression = (
  property: TSESTree.Property | undefined,
): TSESTree.ArrayExpression | void =>
  match(property?.value)
    .with(
      { type: AST_NODE_TYPES.ArrayExpression },
      (value) => value as TSESTree.ArrayExpression,
    )
    .otherwise(noop);
