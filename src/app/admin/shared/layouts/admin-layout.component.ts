import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AuthService } from '../../pages/login/auth.service';
import { AlertComponent } from '../components/alert/alert.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.scss'],
    imports: [AlertComponent, RouterLink, NgIf, RouterLinkActive, RouterOutlet],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminLayoutComponent {
  public auth = inject(AuthService);

  public logout(event: Event): void {
    event.preventDefault();
    this.auth.logout();
  }
}
