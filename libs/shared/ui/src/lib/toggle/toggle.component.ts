import { Component, model } from '@angular/core';

@Component({
  selector: 'lib-toggle',
  standalone: true,
  template: `
    <label class="toggle">
      <input type="checkbox" [checked]="checked()" (change)="onToggle()" />
      <span class="slider"></span>
    </label>
  `,
  styles: [`
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
      background: var(--color-bg-toggle-off);
      border-radius: var(--radius-toggle);
      transition: var(--transition-default);
    }
    .slider::before {
      content: '';
      position: absolute;
      height: 20px;
      width: 20px;
      left: 3px;
      bottom: 3px;
      background: var(--color-bg-card);
      border-radius: var(--radius-full);
      transition: var(--transition-default);
    }
    input:checked + .slider {
      background: var(--color-primary);
    }
    input:checked + .slider::before {
      transform: translateX(22px);
    }
  `],
})
export class ToggleComponent {
  checked = model<boolean>(false);

  onToggle(): void {
    this.checked.update(v => !v);
  }
}
