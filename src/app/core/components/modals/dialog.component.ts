import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '@core/material/material.module';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  imports: [MaterialModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      cancelText: string;
      confirmText: string;
      message: string;
      title: string;
    },
    private mdDialogRef: MatDialogRef<DialogComponent>
  ) {}

  public cancel(): void {
    this.close(false);
  }
  public close(value: boolean | string): void {
    this.mdDialogRef.close(value);
  }
  public confirm(): void {
    this.close(true);
  }
  @HostListener('keydown.esc')
  public onEsc(): void {
    this.close(false);
  }
}
