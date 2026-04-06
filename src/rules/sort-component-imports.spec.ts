import { type Linter, RuleTester } from 'eslint';
import tseslint from 'typescript-eslint';

import { sortComponentImports } from './sort-component-imports.js';

const ruleTester = new RuleTester({
  languageOptions: {
    parser: tseslint.parser as unknown as Linter.Parser,
  },
});

ruleTester.run('sort-component-imports', sortComponentImports as any, {
  valid: [
    {
      code: `
          @Component({
            imports: [Apple, Banana, Cherry]
          })
          class MyComponent {}
        `,
    },
    {
      code: `
          @Component({
            imports: [Apple]
          })
          class MyComponent {}
        `,
    },
    {
      code: `
          @Component({
            imports: []
          })
          class MyComponent {}
        `,
    },
    {
      code: `
          @Component({
            selector: 'app-test',
            template: '<div></div>',
          })
          class MyComponent {}
        `,
    },
    {
      code: `
          @Directive({
            imports: [Cherry, Banana, Apple]
          })
          class MyDirective {}
        `,
    },
  ],
  invalid: [
    {
      code: `
          @Component({
            imports: [Cherry, Apple, Banana]
          })
          class MyComponent {}
        `,
      errors: [{ messageId: 'unsorted' }],
      output: `
          @Component({
            imports: [Apple, Banana, Cherry]
          })
          class MyComponent {}
        `,
    },
    {
      code: `
          @Component({
            imports: [B, A]
          })
          class MyComponent {}
        `,
      errors: [{ messageId: 'unsorted' }],
      output: `
          @Component({
            imports: [A, B]
          })
          class MyComponent {}
        `,
    },
    {
      code: `
          @Component({
            imports: [
              ZModule,
              AModule,
              MModule,
            ]
          })
          class MyComponent {}
        `,
      errors: [{ messageId: 'unsorted' }],
      output: `
          @Component({
            imports: [
              AModule,
              MModule,
              ZModule,
            ]
          })
          class MyComponent {}
        `,
    },
  ],
});
