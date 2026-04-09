import { type Linter, RuleTester } from 'eslint';
import tseslint from 'typescript-eslint';

import { sortNgModuleDeclarations } from './sort-ng-module-declarations.js';

const ruleTester = new RuleTester({
  languageOptions: {
    parser: tseslint.parser as unknown as Linter.Parser,
  },
});

ruleTester.run('sort-ng-module-declarations', sortNgModuleDeclarations as any, {
  valid: [
    {
      code: `
          @NgModule({
            declarations: [Apple, Banana, Cherry]
          })
          class MyModule {}
        `,
    },
    {
      code: `
          @NgModule({
            declarations: [Apple]
          })
          class MyModule {}
        `,
    },
    {
      code: `
          @NgModule({
            declarations: []
          })
          class MyModule {}
        `,
    },
    {
      code: `
          @NgModule({
            imports: [MyModule],
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
            declarations: [Cherry, Apple, Banana]
          })
          class MyModule {}
        `,
      errors: [{ messageId: 'unsorted' }],
      output: `
          @NgModule({
            declarations: [Apple, Banana, Cherry]
          })
          class MyModule {}
        `,
    },
    {
      code: `
          @NgModule({
            declarations: [B, A]
          })
          class MyModule {}
        `,
      errors: [{ messageId: 'unsorted' }],
      output: `
          @NgModule({
            declarations: [A, B]
          })
          class MyModule {}
        `,
    },
    {
      code: `
          @NgModule({
            declarations: [
              ZComponent,
              AComponent,
              MComponent,
            ]
          })
          class MyModule {}
        `,
      errors: [{ messageId: 'unsorted' }],
      output: `
          @NgModule({
            declarations: [
              AComponent,
              MComponent,
              ZComponent,
            ]
          })
          class MyModule {}
        `,
    },
  ],
});
