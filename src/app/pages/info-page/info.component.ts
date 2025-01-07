import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { NgFor } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, map } from 'rxjs';
import { BUTTONS_SETTINGS, PAGE_SETTINGS } from './info-config';
import { ButtonSize } from '@core/components/button/button';
import { ButtonComponent } from '@core/components/button/button.component';
import { PageTitleComponent } from '@core/components/page-title/page-title.component';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  imports: [
    PageTitleComponent,
    ButtonComponent,
    RouterModule,
    MatCardModule,
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
