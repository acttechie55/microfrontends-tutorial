import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings-entry',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="settings-container">
      <h2>Settings</h2>

      <div class="settings-card">
        <h3>Appearance</h3>
        <div class="setting-row">
          <div class="setting-info">
            <span class="setting-name">Dark Mode</span>
            <span class="setting-desc"
              >Use dark theme across the dashboard</span
            >
          </div>
          <label class="toggle">
            <input type="checkbox" [(ngModel)]="darkMode" />
            <span class="slider"></span>
          </label>
        </div>
      </div>

      <div class="settings-card">
        <h3>Notifications</h3>
        <div class="setting-row">
          <div class="setting-info">
            <span class="setting-name">Email Notifications</span>
            <span class="setting-desc"
              >Receive email alerts for important events</span
            >
          </div>
          <label class="toggle">
            <input type="checkbox" [(ngModel)]="emailNotifications" />
            <span class="slider"></span>
          </label>
        </div>
        <div class="setting-row">
          <div class="setting-info">
            <span class="setting-name">Push Notifications</span>
            <span class="setting-desc">Receive browser push notifications</span>
          </div>
          <label class="toggle">
            <input type="checkbox" [(ngModel)]="pushNotifications" />
            <span class="slider"></span>
          </label>
        </div>
      </div>

      <div class="settings-card">
        <h3>Preferences</h3>
        <div class="setting-row">
          <div class="setting-info">
            <span class="setting-name">Language</span>
            <span class="setting-desc">Select your preferred language</span>
          </div>
          <select [(ngModel)]="language">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .settings-container {
        padding: 24px;
      }
      h2 {
        margin: 0 0 24px 0;
        color: #1a1a2e;
      }
      .settings-card {
        background: white;
        border-radius: 12px;
        padding: 24px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        margin-bottom: 16px;
      }
      .settings-card h3 {
        margin: 0 0 16px 0;
        color: #1a1a2e;
        font-size: 16px;
      }
      .setting-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 0;
        border-bottom: 1px solid #f0f0f0;
      }
      .setting-row:last-child {
        border-bottom: none;
      }
      .setting-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .setting-name {
        font-weight: 600;
        color: #1a1a2e;
      }
      .setting-desc {
        font-size: 13px;
        color: #888;
      }
      .toggle {
        position: relative;
        display: inline-block;
        width: 48px;
        height: 26px;
      }
      .toggle input {
        opacity: 0;
        width: 0;
        height: 0;
      }
      .slider {
        position: absolute;
        cursor: pointer;
        inset: 0;
        background: #ccc;
        border-radius: 26px;
        transition: 0.3s;
      }
      .slider::before {
        content: '';
        position: absolute;
        height: 20px;
        width: 20px;
        left: 3px;
        bottom: 3px;
        background: white;
        border-radius: 50%;
        transition: 0.3s;
      }
      .toggle input:checked + .slider {
        background: #6c63ff;
      }
      .toggle input:checked + .slider::before {
        transform: translateX(22px);
      }
      select {
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 14px;
        color: #1a1a2e;
        background: white;
        cursor: pointer;
      }
    `,
  ],
})
export class EntryComponent {
  darkMode = false;
  emailNotifications = true;
  pushNotifications = false;
  language = 'en';
}
