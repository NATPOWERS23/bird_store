import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  ButtonSize,
  ButtonType,
  IconType,
} from '@core/shared/components/button/button';
import { MaterialModule } from '@core/material/material.module';
import { NgIf, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonComponent } from '@core/shared/components/button/button.component';
import { FilterService } from '@core/services/filter.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  imports: [
    MaterialModule,
    NgStyle,
    FormsModule,
    RouterLink,
    ButtonComponent,
    RouterOutlet,
    NgIf,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
  public ButtonSize: typeof ButtonSize = ButtonSize;
  public ButtonType: typeof ButtonType = ButtonType;
  public IconType: typeof IconType = IconType;
  public checked = IconType.DEFAULT;
  public filterService = inject(FilterService);
}
