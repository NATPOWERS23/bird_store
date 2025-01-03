import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { LoaderService } from '@core/services/loader.service';

@Component({
    selector: 'app-spinner',
    imports: [NgIf],
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  public loader = inject(LoaderService);
}
