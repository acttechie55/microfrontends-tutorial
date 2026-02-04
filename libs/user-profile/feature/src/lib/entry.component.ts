import { Component, inject, computed } from '@angular/core';
import { AuthService } from '@mfe-dashboard/shared/auth';
import { CardComponent, PageHeaderComponent } from '@mfe-dashboard/shared/ui';

@Component({
  selector: 'lib-user-profile-entry',
  standalone: true,
  imports: [CardComponent, PageHeaderComponent],
  template: `
    <div class="profile-container">
      <lib-page-header title="User Profile" />
      <lib-card>
        <div class="profile-layout">
          <div class="avatar">{{ initials() }}</div>
          <div class="profile-details">
            <div class="detail-row">
              <span class="label">Name</span>
              <span class="value">{{ user().name }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Email</span>
              <span class="value">{{ user().email }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Role</span>
              <span class="value">{{ user().role }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Department</span>
              <span class="value">{{ user().department }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Joined</span>
              <span class="value">{{ user().joinedDate }}</span>
            </div>
          </div>
        </div>
      </lib-card>
    </div>
  `,
  styles: [`
    .profile-container {
      padding: var(--spacing-lg);
    }
    .profile-layout {
      display: flex;
      gap: var(--spacing-xl);
      align-items: flex-start;
    }
    .avatar {
      width: 80px;
      height: 80px;
      border-radius: var(--radius-full);
      background: var(--color-primary);
      color: var(--color-text-on-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--font-size-stat);
      font-weight: 600;
      flex-shrink: 0;
    }
    .profile-details {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-base);
      flex: 1;
    }
    .detail-row {
      display: flex;
      gap: var(--spacing-base);
    }
    .label {
      font-weight: 600;
      color: var(--color-text-secondary);
      min-width: 120px;
    }
    .value {
      color: var(--color-text-primary);
    }
  `],
})
export class EntryComponent {
  private auth = inject(AuthService);

  protected user = this.auth.currentUser;
  protected initials = computed(() => {
    const name = this.user().name;
    return name
      .split(' ')
      .map(part => part[0])
      .join('');
  });
}
