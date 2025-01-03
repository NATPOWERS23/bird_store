import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'page-title',
  standalone: true,
  imports: [TitleCasePipe],
  template: `<h2 class="text-secondary text-center">
    {{ title | titlecase }}
  </h2>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTitleComponent {
  @Input() title: string | undefined = '';
}
