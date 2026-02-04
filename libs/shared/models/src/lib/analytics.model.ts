export interface StatCard {
  label: string;
  value: string;
  change: string;
  trend: 'positive' | 'negative';
}

export interface MonthlyData {
  month: string;
  percentage: number;
}
