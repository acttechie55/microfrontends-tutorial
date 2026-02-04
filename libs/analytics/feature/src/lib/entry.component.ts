import { Component, inject } from '@angular/core';
import { AnalyticsService } from '@mfe-dashboard/analytics/data-access';
import { BarChartComponent } from '@mfe-dashboard/analytics/ui';
import {
  CardComponent,
  PageHeaderComponent,
  StatCardComponent,
} from '@mfe-dashboard/shared/ui';

@Component({
  selector: 'lib-analytics-entry',
  standalone: true,
  imports: [
    CardComponent,
    PageHeaderComponent,
    StatCardComponent,
    BarChartComponent,
  ],
  template: `
    <div class="analytics-container">
      <lib-page-header title="Analytics" />
      <div class="stats-grid">
        @for (stat of analytics.stats(); track stat.label) {
          <lib-stat-card
            [label]="stat.label"
            [value]="stat.value"
            [change]="stat.change"
            [trend]="stat.trend"
          />
        }
      </div>

      <lib-card>
        <h3>Monthly Overview</h3>
        <lib-bar-chart [data]="analytics.monthlyData()" />
      </lib-card>
    </div>
  `,
  styles: [`
    .analytics-container {
      padding: var(--spacing-lg);
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--spacing-base);
      margin-bottom: var(--spacing-xl);
    }
    h3 {
      margin: 0 0 var(--spacing-lg) 0;
      color: var(--color-text-primary);
    }
  `],
})
export class EntryComponent {
  protected analytics = inject(AnalyticsService);
}
