import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SettingsService } from '@mfe-dashboard/settings/data-access';
import {
  CardComponent,
  PageHeaderComponent,
  ToggleComponent,
} from '@mfe-dashboard/shared/ui';

@Component({
  selector: 'lib-settings-entry',
  standalone: true,
  imports: [FormsModule, CardComponent, PageHeaderComponent, ToggleComponent],
  template: `
    <div class="settings-container">
      <lib-page-header title="Settings" />

      <lib-card>
        <h3>Appearance</h3>
        <div class="setting-row">
          <div class="setting-info">
            <span class="setting-name">Dark Mode</span>
            <span class="setting-desc">Use dark theme across the dashboard</span>
          </div>
          <lib-toggle [(checked)]="settings.darkMode" />
        </div>
      </lib-card>

      <lib-card>
        <h3>Notifications</h3>
        <div class="setting-row">
          <div class="setting-info">
            <span class="setting-name">Email Notifications</span>
            <span class="setting-desc">Receive email alerts for important events</span>
          </div>
          <lib-toggle [(checked)]="settings.emailNotifications" />
        </div>
        <div class="setting-row last">
          <div class="setting-info">
            <span class="setting-name">Push Notifications</span>
            <span class="setting-desc">Receive browser push notifications</span>
          </div>
          <lib-toggle [(checked)]="settings.pushNotifications" />
        </div>
      </lib-card>

      <lib-card>
        <h3>Preferences</h3>
        <div class="setting-row last">
          <div class="setting-info">
            <span class="setting-name">Language</span>
            <span class="setting-desc">Select your preferred language</span>
          </div>
          <select [ngModel]="settings.language()" (ngModelChange)="settings.setLanguage($event)">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>
      </lib-card>
    </div>
  `,
  styles: [`
    .settings-container {
      padding: var(--spacing-lg);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-base);
    }
    h3 {
      margin: 0 0 var(--spacing-base) 0;
      color: var(--color-text-primary);
      font-size: var(--font-size-heading-section);
    }
    .setting-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--spacing-md) 0;
      border-bottom: 1px solid var(--color-border-light);
    }
    .setting-row.last {
      border-bottom: none;
    }
    .setting-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .setting-name {
      font-weight: 600;
      color: var(--color-text-primary);
    }
    .setting-desc {
      font-size: var(--font-size-sm);
      color: var(--color-text-tertiary);
    }
    select {
      padding: var(--spacing-sm) var(--spacing-md);
      border: 1px solid var(--color-border-input);
      border-radius: var(--radius-md);
      font-size: var(--font-size-body);
      color: var(--color-text-primary);
      background: var(--color-bg-card);
      cursor: pointer;
    }
  `],
})
export class EntryComponent {
  protected settings = inject(SettingsService);
}
