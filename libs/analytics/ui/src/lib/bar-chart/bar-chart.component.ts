import { Component, input } from '@angular/core';
import { MonthlyData } from '@mfe-dashboard/shared/models';

@Component({
  selector: 'lib-bar-chart',
  standalone: true,
  template: `
    <div class="bar-chart">
      @for (item of data(); track item.month) {
        <div class="bar" [style.height.%]="item.percentage">
          <span>{{ item.month }}</span>
        </div>
      }
    </div>
  `,
  styles: [`
    .bar-chart {
      display: flex;
      align-items: flex-end;
      gap: var(--spacing-md);
      height: 200px;
      padding-top: var(--spacing-base);
    }
    .bar {
      flex: 1;
      background: var(--color-primary-gradient);
      border-radius: var(--radius-sm) var(--radius-sm) 0 0;
      position: relative;
      min-width: 40px;
      transition: height var(--transition-default);
    }
    .bar span {
      position: absolute;
      bottom: -24px;
      left: 50%;
      transform: translateX(-50%);
      font-size: var(--font-size-xs);
      color: var(--color-text-secondary);
    }
  `],
})
export class BarChartComponent {
  data = input.required<MonthlyData[]>();
}
