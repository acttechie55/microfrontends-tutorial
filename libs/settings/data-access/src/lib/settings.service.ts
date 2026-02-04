import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  darkMode = signal(false);
  emailNotifications = signal(true);
  pushNotifications = signal(false);
  language = signal('en');

  setLanguage(lang: string): void {
    this.language.set(lang);
  }
}
