import { Injectable, signal, computed } from '@angular/core';
import { Notification } from '@mfe-dashboard/shared/models';

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  notifications = signal<Notification[]>([
    {
      id: '1',
      title: 'System Update',
      message: 'The system will undergo maintenance tonight from 2-4 AM.',
      read: false,
      timestamp: new Date('2025-02-03T10:00:00'),
    },
    {
      id: '2',
      title: 'New User Registered',
      message: 'A new user has joined the Engineering department.',
      read: false,
      timestamp: new Date('2025-02-02T15:30:00'),
    },
    {
      id: '3',
      title: 'Report Ready',
      message: 'Your monthly analytics report is now available for download.',
      read: true,
      timestamp: new Date('2025-02-01T09:00:00'),
    },
    {
      id: '4',
      title: 'Security Alert',
      message: 'Unusual login activity detected on your account.',
      read: true,
      timestamp: new Date('2025-01-30T18:45:00'),
    },
  ]);

  unreadCount = computed(() =>
    this.notifications().filter(n => !n.read).length
  );

  markAsRead(id: string): void {
    this.notifications.update(list =>
      list.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }

  markAllAsRead(): void {
    this.notifications.update(list =>
      list.map(n => ({ ...n, read: true }))
    );
  }
}
