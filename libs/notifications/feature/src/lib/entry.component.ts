import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NotificationsService } from '@mfe-dashboard/notifications/data-access';
import { CardComponent, PageHeaderComponent } from '@mfe-dashboard/shared/ui';

@Component({
  selector: 'lib-notifications-entry',
  standalone: true,
  imports: [DatePipe, CardComponent, PageHeaderComponent],
  template: `
    <div class="notifications-container">
      <div class="header-row">
        <lib-page-header title="Notifications" />
        @if (notificationsService.unreadCount() > 0) {
          <button class="mark-all-btn" (click)="notificationsService.markAllAsRead()">
            Mark all as read
          </button>
        }
      </div>

      <div class="notification-list">
        @for (notification of notificationsService.notifications(); track notification.id) {
          <lib-card>
            <div
              class="notification-item"
              role="button"
              tabindex="0"
              [class.unread]="!notification.read"
              (click)="notificationsService.markAsRead(notification.id)"
              (keydown.enter)="notificationsService.markAsRead(notification.id)"
            >
              <div class="notification-dot" [class.visible]="!notification.read"></div>
              <div class="notification-content">
                <span class="notification-title">{{ notification.title }}</span>
                <span class="notification-message">{{ notification.message }}</span>
                <span class="notification-time">{{ notification.timestamp | date:'medium' }}</span>
              </div>
            </div>
          </lib-card>
        }
      </div>
    </div>
  `,
  styles: [`
    .notifications-container {
      padding: var(--spacing-lg);
    }
    .header-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .mark-all-btn {
      background: var(--color-primary);
      color: var(--color-text-on-primary);
      border: none;
      border-radius: var(--radius-md);
      padding: var(--spacing-sm) var(--spacing-base);
      font-size: var(--font-size-sm);
      font-weight: 600;
      cursor: pointer;
      transition: opacity var(--transition-fast);
    }
    .mark-all-btn:hover {
      opacity: 0.9;
    }
    .notification-list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-sm);
    }
    .notification-item {
      display: flex;
      gap: var(--spacing-md);
      align-items: flex-start;
      cursor: pointer;
    }
    .notification-dot {
      width: 8px;
      height: 8px;
      border-radius: var(--radius-full);
      background: var(--color-primary);
      margin-top: 6px;
      flex-shrink: 0;
      opacity: 0;
    }
    .notification-dot.visible {
      opacity: 1;
    }
    .notification-content {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
    }
    .notification-title {
      font-weight: 600;
      color: var(--color-text-primary);
    }
    .notification-message {
      font-size: var(--font-size-body);
      color: var(--color-text-secondary);
    }
    .notification-time {
      font-size: var(--font-size-xs);
      color: var(--color-text-tertiary);
    }
    .unread .notification-title {
      color: var(--color-primary);
    }
  `],
})
export class EntryComponent {
  protected notificationsService = inject(NotificationsService);
}
