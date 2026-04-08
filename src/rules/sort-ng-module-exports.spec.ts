import { type Linter, RuleTester } from 'eslint';
import tseslint from 'typescript-eslint';

import { sortNgModuleExports } from './sort-ng-module-exports.js';

const ruleTester = new RuleTester({
  languageOptions: {
    parser: tseslint.parser as unknown as Linter.Parser,
  },
});

ruleTester.run('sort-ng-module-exports', sortNgModuleExports as any, {
  valid: [
    {
      code: `
          @NgModule({
            exports: [Apple, Banana, Cherry]
          })
          class MyModule {}
        `,
    },
    {
      code: `
          @NgModule({
            exports: [Apple]
          })
          class MyModule {}
        `,
    },
    {
      code: `
          @NgModule({
            exports: []
          })
          class MyModule {}
        `,
    },
    {
      code: `
          @NgModule({
            declarations: [MyComponent],
          })
          class MyModule {}
        `,
    },
    {
      code: `
          @Component({
            imports: [Cherry, Banana, Apple]
          })
          class MyComponent {}
        `,
    },
  ],
  invalid: [
    {
      code: `
          @NgModule({
            exports: [Cherry, Apple, Banana]
          })
          class MyModule {}
        `,
      errors: [{ messageId: 'unsorted' }],
      output: `
          @NgModule({
            exports: [Apple, Banana, Cherry]
          })
          class MyModule {}
        `,
    },
    {
      code: `
          @NgModule({
            exports: [B, A]
          })
          class MyModule {}
        `,
      errors: [{ messageId: 'unsorted' }],
      output: `
          @NgModule({
            exports: [A, B]
          })
          class MyModule {}
        `,
    },
    {
      code: `
          @NgModule({
            exports: [
              ZModule,
              AModule,
              MModule,
            ]
          })
          class MyModule {}
        `,
      errors: [{ messageId: 'unsorted' }],
      output: `
          @NgModule({
            exports: [
              AModule,
              MModule,
              ZModule,
            ]
          })
          class MyModule {}
        `,
    },
  ],
});
