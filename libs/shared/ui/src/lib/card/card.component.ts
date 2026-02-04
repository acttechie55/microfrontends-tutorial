import { Component } from '@angular/core';

@Component({
  selector: 'lib-card',
  standalone: true,
  template: `<div class="card"><ng-content /></div>`,
  styles: [`
    .card {
      background: var(--color-bg-card);
      border-radius: var(--radius-lg);
      padding: var(--spacing-lg);
      box-shadow: var(--shadow-card);
    }
  `],
})
export class CardComponent {}
