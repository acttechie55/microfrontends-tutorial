import { Injectable, signal } from '@angular/core';
import { StatCard, MonthlyData } from '@mfe-dashboard/shared/models';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  stats = signal<StatCard[]>([
    { label: 'Total Users', value: '12,847', change: '+12.5%', trend: 'positive' },
    { label: 'Revenue', value: '$48,352', change: '+8.2%', trend: 'positive' },
    { label: 'Active Sessions', value: '1,024', change: '-3.1%', trend: 'negative' },
    { label: 'Uptime', value: '98.7%', change: '+0.3%', trend: 'positive' },
  ]);

  monthlyData = signal<MonthlyData[]>([
    { month: 'Jan', percentage: 40 },
    { month: 'Feb', percentage: 55 },
    { month: 'Mar', percentage: 45 },
    { month: 'Apr', percentage: 70 },
    { month: 'May', percentage: 65 },
    { month: 'Jun', percentage: 80 },
    { month: 'Jul', percentage: 90 },
    { month: 'Aug', percentage: 75 },
  ]);
}
