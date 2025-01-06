import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from '@core/components/spinner/spinner.component';

@Component({
    selector: 'app-root',
    template: '<app-spinner></app-spinner><router-outlet></router-outlet>',
    imports: [RouterOutlet, SpinnerComponent]
})
export class AppComponent {
  title = 'BIRD';
}
