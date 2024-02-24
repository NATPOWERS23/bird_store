import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from '../../shared/components/page-title/page-title.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ButtonSize } from '@shared/components/button/button';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-aboutus',
  standalone: true,
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss'],
  imports: [PageTitleComponent, ButtonComponent, RouterModule, MatCardModule],
})
export class AboutusComponent {
  public ButtonSize: typeof ButtonSize = ButtonSize;
}
