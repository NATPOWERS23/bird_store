import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonSize } from '@core/components/button/button';
import { ButtonComponent } from '@core/components/button/button.component';

@Component({
    selector: 'app-product',
    templateUrl: './product-info.component.html',
    styleUrls: ['./product-info.component.scss'],
    imports: [ButtonComponent, RouterLink],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductInfoComponent {
  public ButtonSize: typeof ButtonSize = ButtonSize;
}
