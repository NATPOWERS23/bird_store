import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
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
