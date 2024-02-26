import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from './core/shared/components/spinner/spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: '<app-spinner></app-spinner><router-outlet></router-outlet>',
  imports: [RouterOutlet, SpinnerComponent],
})
export class AppComponent {
  title = 'BIRD';
}
