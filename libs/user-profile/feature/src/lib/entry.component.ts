import { Component } from '@angular/core';

@Component({
  selector: 'lib-user-profile-entry',
  standalone: true,
  template: `
    <div class="profile-container">
      <h2>User Profile</h2>
      <div class="profile-card">
        <div class="avatar">JD</div>
        <div class="profile-details">
          <div class="detail-row">
            <span class="label">Name</span>
            <span class="value">Jane Doe</span>
          </div>
          <div class="detail-row">
            <span class="label">Email</span>
            <span class="value">jane.doe&#64;example.com</span>
          </div>
          <div class="detail-row">
            <span class="label">Role</span>
            <span class="value">Administrator</span>
          </div>
          <div class="detail-row">
            <span class="label">Department</span>
            <span class="value">Engineering</span>
          </div>
          <div class="detail-row">
            <span class="label">Joined</span>
            <span class="value">March 2023</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .profile-container {
        padding: 24px;
      }
      h2 {
        margin: 0 0 24px 0;
        color: #1a1a2e;
      }
      .profile-card {
        background: white;
        border-radius: 12px;
        padding: 32px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        display: flex;
        gap: 32px;
        align-items: flex-start;
      }
      .avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: #6c63ff;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        font-weight: 600;
        flex-shrink: 0;
      }
      .profile-details {
        display: flex;
        flex-direction: column;
        gap: 16px;
        flex: 1;
      }
      .detail-row {
        display: flex;
        gap: 16px;
      }
      .label {
        font-weight: 600;
        color: #666;
        min-width: 120px;
      }
      .value {
        color: #1a1a2e;
      }
    `,
  ],
})
export class EntryComponent {}
