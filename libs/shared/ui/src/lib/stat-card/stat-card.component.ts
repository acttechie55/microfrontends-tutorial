import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-stat-card',
  standalone: true,
  template: `
    <div class="stat-card">
      <span class="stat-value">{{ value() }}</span>
      <span class="stat-label">{{ label() }}</span>
      <span class="stat-change" [class]="trend()">{{ change() }}</span>
    </div>
  `,
  styles: [`
    .stat-card {
      background: var(--color-bg-card);
      border-radius: var(--radius-lg);
      padding: var(--spacing-lg);
      box-shadow: var(--shadow-card);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
    }
    .stat-value {
      font-size: var(--font-size-stat);
      font-weight: 700;
      color: var(--color-text-primary);
    }
    .stat-label {
      font-size: var(--font-size-body);
      color: var(--color-text-secondary);
    }
    .stat-change {
      font-size: var(--font-size-sm);
      font-weight: 600;
    }
    .positive {
      color: var(--color-success);
    }
    .negative {
      color: var(--color-danger);
    }
  `],
})
export class StatCardComponent {
  label = input.required<string>();
  value = input.required<string>();
  change = input.required<string>();
  trend = input.required<'positive' | 'negative'>();
}
