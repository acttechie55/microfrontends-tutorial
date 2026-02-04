import { Component } from '@angular/core';

@Component({
  selector: 'app-analytics-entry',
  standalone: true,
  template: `
    <div class="analytics-container">
      <h2>Analytics</h2>
      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-value">12,847</span>
          <span class="stat-label">Total Users</span>
          <span class="stat-change positive">+12.5%</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">$48,352</span>
          <span class="stat-label">Revenue</span>
          <span class="stat-change positive">+8.2%</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">1,024</span>
          <span class="stat-label">Active Sessions</span>
          <span class="stat-change negative">-3.1%</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">98.7%</span>
          <span class="stat-label">Uptime</span>
          <span class="stat-change positive">+0.3%</span>
        </div>
      </div>

      <div class="chart-placeholder">
        <h3>Monthly Overview</h3>
        <div class="bar-chart">
          <div class="bar" style="height: 40%"><span>Jan</span></div>
          <div class="bar" style="height: 55%"><span>Feb</span></div>
          <div class="bar" style="height: 45%"><span>Mar</span></div>
          <div class="bar" style="height: 70%"><span>Apr</span></div>
          <div class="bar" style="height: 65%"><span>May</span></div>
          <div class="bar" style="height: 80%"><span>Jun</span></div>
          <div class="bar" style="height: 90%"><span>Jul</span></div>
          <div class="bar" style="height: 75%"><span>Aug</span></div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .analytics-container {
        padding: 24px;
      }
      h2 {
        margin: 0 0 24px 0;
        color: #1a1a2e;
      }
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
        margin-bottom: 32px;
      }
      .stat-card {
        background: white;
        border-radius: 12px;
        padding: 24px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .stat-value {
        font-size: 28px;
        font-weight: 700;
        color: #1a1a2e;
      }
      .stat-label {
        font-size: 14px;
        color: #666;
      }
      .stat-change {
        font-size: 13px;
        font-weight: 600;
      }
      .stat-change.positive {
        color: #22c55e;
      }
      .stat-change.negative {
        color: #ef4444;
      }
      .chart-placeholder {
        background: white;
        border-radius: 12px;
        padding: 24px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      }
      .chart-placeholder h3 {
        margin: 0 0 24px 0;
        color: #1a1a2e;
      }
      .bar-chart {
        display: flex;
        align-items: flex-end;
        gap: 12px;
        height: 200px;
        padding-top: 16px;
      }
      .bar {
        flex: 1;
        background: linear-gradient(to top, #6c63ff, #a89cff);
        border-radius: 6px 6px 0 0;
        position: relative;
        min-width: 40px;
        transition: height 0.3s ease;
      }
      .bar span {
        position: absolute;
        bottom: -24px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 12px;
        color: #666;
      }
    `,
  ],
})
export class EntryComponent {}
