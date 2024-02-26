import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, map } from 'rxjs';
import { PageTitleComponent } from '@shared/components/page-title/page-title.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { ButtonSize } from '@shared/components/button/button';
import { BUTTONS_SETTINGS, PAGE_SETTINGS } from './info-config';

@Component({
  selector: 'app-info',
  standalone: true,
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  imports: [
    PageTitleComponent,
    ButtonComponent,
    RouterModule,
    MatCardModule,
    AsyncPipe,
    NgIf,
    NgFor,
  ],
})
export class InfoComponent implements OnInit {
  public ButtonSize: typeof ButtonSize = ButtonSize;
  public pageName$: Observable<string> = inject(ActivatedRoute).params.pipe(
    map(params => params['id'])
  );
  public pageSettings = PAGE_SETTINGS;
  public buttonSettings = BUTTONS_SETTINGS;
  public page!: {
    pageId: string;
    title: string;
    subTitle: string;
    textContent: string;
  };

  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.pageName$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(pageName => {
        this.page = PAGE_SETTINGS[pageName as keyof typeof PAGE_SETTINGS];
        this.buttonSettings = BUTTONS_SETTINGS.filter(
          btn => btn.id !== pageName
        );
      });
  }
}
