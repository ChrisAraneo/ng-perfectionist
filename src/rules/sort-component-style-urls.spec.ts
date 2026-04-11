import { type Linter, RuleTester } from 'eslint';
import tseslint from 'typescript-eslint';

import { sortComponentStyleUrls } from './sort-component-style-urls.js';

const ruleTester = new RuleTester({
  languageOptions: {
    parser: tseslint.parser as unknown as Linter.Parser,
  },
});

ruleTester.run('sort-component-style-urls', sortComponentStyleUrls as any, {
  valid: [
    {
      code: `
          @Component({
            styleUrls: ['./a.component.scss', './b.component.scss', './c.component.scss']
          })
          class MyComponent {}
        `,
    },
    {
      code: `
          @Component({
            styleUrls: ['./a.component.scss']
          })
          class MyComponent {}
        `,
    },
    {
      code: `
          @Component({
            styleUrls: []
          })
          class MyComponent {}
        `,
    },
    {
      code: `
          @Component({
            template: '<div></div>',
          })
          class MyComponent {}
        `,
    },
    {
      code: `
          @Directive({
            styleUrls: ['./c.component.scss', './a.component.scss']
          })
          class MyDirective {}
        `,
    },
  ],
  invalid: [
    {
      code: `
          @Component({
            styleUrls: ['./c.component.scss', './a.component.scss', './b.component.scss']
          })
          class MyComponent {}
        `,
      errors: [{ messageId: 'unsorted' }],
      output: `
          @Component({
            styleUrls: ['./a.component.scss', './b.component.scss', './c.component.scss']
          })
          class MyComponent {}
        `,
    },
    {
      code: `
          @Component({
            styleUrls: ['./b.component.scss', './a.component.scss']
          })
          class MyComponent {}
        `,
      errors: [{ messageId: 'unsorted' }],
      output: `
          @Component({
            styleUrls: ['./a.component.scss', './b.component.scss']
          })
          class MyComponent {}
        `,
    },
    {
      code: `
          @Component({
            styleUrls: [
              './z.component.scss',
              './a.component.scss',
              './m.component.scss',
            ]
          })
          class MyComponent {}
        `,
      errors: [{ messageId: 'unsorted' }],
      output: `
          @Component({
            styleUrls: [
              './a.component.scss',
              './m.component.scss',
              './z.component.scss',
            ]
          })
          class MyComponent {}
        `,
    },
  ],
});
