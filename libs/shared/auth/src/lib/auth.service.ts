import { Injectable, signal } from '@angular/core';
import { User } from '@mfe-dashboard/shared/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser = signal<User>({
    id: '1',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    role: 'Administrator',
    department: 'Engineering',
    joinedDate: 'March 2023',
  });
}
