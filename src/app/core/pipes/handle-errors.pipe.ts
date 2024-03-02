import { HttpErrorResponse } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'handleErrors',
  standalone: true,
})
export class HandleErrorsPipe implements PipeTransform {
  transform(value: HttpErrorResponse | null): string {
    const message = value?.error.error.message.split(':')[0].trim();

    if (!message) return '';

    switch (message) {
      case 'INVALID_EMAIL':
        return 'Помилковий email';
      case 'INVALID_PASSWORD':
        return 'Dude, твій пароль невірний';
      case 'EMAIL_NOT_FOUND':
        return 'Такого email не існує';
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        return 'Надто багато спроб. Спробуй повторити процес авторизації пізніше';
      default:
        return 'Щось пішло не так';
    }
  }
}
