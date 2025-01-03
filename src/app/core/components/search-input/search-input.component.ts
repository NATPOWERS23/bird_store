import { ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { Component, Input, Output } from '@angular/core';
import { ButtonSize } from '@core/components/button/button';
import { MatInputModule } from '@angular/material/input';
import { NgStyle } from '@angular/common';
import { ButtonComponent } from '@core/components/button/button.component';

@Component({
    selector: 'app-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.scss'],
    imports: [MatInputModule, NgStyle, ButtonComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchInputComponent {
  @Input() public checked = false;
  @Output() public searchEvent = new EventEmitter<string>();

  public ButtonSize: typeof ButtonSize = ButtonSize;
}
