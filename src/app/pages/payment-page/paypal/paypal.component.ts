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

import { Observable, tap } from 'rxjs';

import { ButtonSize } from '@core/components/button/button';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
declare let paypal;

@Component({
    selector: 'app-paypal',
    templateUrl: './paypal.component.html',
    styleUrls: ['./paypal.component.scss'],
    imports: [NgIf],
    changeDetection: ChangeDetectionStrategy.OnPush
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    paypal
      .Buttons({
        createOrder: (
          data: unknown,
          actions: {
            order: {
              create: (arg0: {
                purchase_units: {
                  amount: { currency_code: string; value: number };
                }[];
              }) => unknown;
            };
          }
        ) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value,
                },
              },
            ],
          });
        },
        onApprove: async (
          data: unknown,
          actions: { order: { capture: () => unknown } }
        ) => {
          const order = await actions.order.capture();
          this.payFor = true;
          console.log(data, order);
        },
      })
      .render(this.paypalElement.nativeElement);
  }
}
