import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'page-title',
  standalone: true,
  template: `<h2 class="text-secondary text-center">{{ title }}</h2>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTitleComponent {
  @Input() title = '';
}
