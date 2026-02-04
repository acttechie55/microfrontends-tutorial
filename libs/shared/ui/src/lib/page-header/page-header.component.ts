import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-page-header',
  standalone: true,
  template: `<h2>{{ title() }}</h2>`,
  styles: [`
    h2 {
      margin: 0 0 var(--spacing-lg) 0;
      color: var(--color-text-primary);
    }
  `],
})
export class PageHeaderComponent {
  title = input.required<string>();
}
