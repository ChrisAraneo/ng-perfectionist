import { type Linter, RuleTester } from 'eslint';
import tseslint from 'typescript-eslint';

import { sortPipeImports } from './sort-pipe-imports.js';

const ruleTester = new RuleTester({
  languageOptions: {
    parser: tseslint.parser as unknown as Linter.Parser,
  },
});

ruleTester.run('sort-pipe-imports', sortPipeImports as any, {
  valid: [
    {
      code: `
          @Pipe({
            imports: [Apple, Banana, Cherry]
          })
          class MyPipe {}
        `,
    },
    {
      code: `
          @Pipe({
            imports: [Apple]
          })
          class MyPipe {}
        `,
    },
    {
      code: `
          @Pipe({
            imports: []
          })
          class MyPipe {}
        `,
    },
    {
      code: `
          @Pipe({
            name: 'myPipe',
          })
          class MyPipe {}
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
          @Pipe({
            imports: [Cherry, Apple, Banana]
          })
          class MyPipe {}
        `,
      errors: [{ messageId: 'unsorted' }],
      output: `
          @Pipe({
            imports: [Apple, Banana, Cherry]
          })
          class MyPipe {}
        `,
    },
    {
      code: `
          @Pipe({
            imports: [B, A]
          })
          class MyPipe {}
        `,
      errors: [{ messageId: 'unsorted' }],
      output: `
          @Pipe({
            imports: [A, B]
          })
          class MyPipe {}
        `,
    },
    {
      code: `
          @Pipe({
            imports: [
              ZModule,
              AModule,
              MModule,
            ]
          })
          class MyPipe {}
        `,
      errors: [{ messageId: 'unsorted' }],
      output: `
          @Pipe({
            imports: [
              AModule,
              MModule,
              ZModule,
            ]
          })
          class MyPipe {}
        `,
    },
  ],
});
