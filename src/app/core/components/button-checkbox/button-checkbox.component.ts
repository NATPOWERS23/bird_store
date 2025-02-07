import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonSize } from '@core/components/button/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ButtonComponent } from '@core/components/button/button.component';

@Component({
  selector: 'app-button-checkbox',
  templateUrl: './button-checkbox.component.html',
  styleUrls: ['./button-checkbox.component.scss'],
  imports: [MatCheckboxModule, ButtonComponent, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ButtonCheckboxComponent,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonCheckboxComponent implements ControlValueAccessor {
  @Input() public iconName = '';
  @Input() public value = false;
  @Input() public buttonSize: ButtonSize = ButtonSize.SMALL;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (value: boolean) => {};
  onTouched = () => {};

  public touched = false;
  public disabled = false;

  public onAdd() {
    this.markAsTouched();
    if (!this.disabled) {
      this.value = !this.value;
      this.onChange(this.value);
    }
  }

  writeValue(value: boolean) {
    this.value = value;
  }

  registerOnChange(onChange: (value: boolean) => void) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
}
