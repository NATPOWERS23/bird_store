import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonSize } from '@core/components/button/button';
import { ButtonComponent } from '@core/components/button/button.component';

import { Observable, tap } from 'rxjs';

declare var paypal: any;

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss'],
  standalone: true,
  imports: [NgIf, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaypalComponent implements OnInit {
  @Input() countCart = new Observable<number>();
  @ViewChild('paypal', { static: true })
  paypalElement!: ElementRef;

  public payFor = false;

  public ButtonSize: typeof ButtonSize = ButtonSize;

  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.countCart
      .pipe(
        tap(res => console.log(res)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((price: number) => this.initiatePaypal(price));
  }

  private initiatePaypal(value: number): void {
    paypal
      .Buttons({
        createOrder: (
          data: any,
          actions: {
            order: {
              create: (arg0: {
                purchase_units: {
                  amount: { currence_code: string; value: number };
                }[];
              }) => any;
            };
          }
        ) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currence_code: 'USD',
                  value,
                },
              },
            ],
          });
        },
        onApprove: async (
          data: any,
          actions: { order: { capture: () => any } }
        ) => {
          const order = await actions.order.capture();
          this.payFor = true;
          console.log(order);
        },
      })
      .render(this.paypalElement.nativeElement);
  }
}
