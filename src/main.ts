import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  BrowserAnimationsModule,
  provideAnimations,
  provideNoopAnimations,
} from '@angular/platform-browser/animations';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { cartReducer } from './app/state/cart/cart.reducer';
import { productsReducer } from './app/state/products/products.reducer';
import { ProductsEffects } from './app/state/products/products.effects';
import { metaReducerCartLocalStorage } from './app/state/cart/cart-metareducer';
import { authInterceptor } from '@core/interceptors/auth.interceptor';
import { LoadingInterceptor } from '@core/interceptors/loading.interceptor';

export const ENV = new InjectionToken('environment');

const ROOT_REDUCERS = {
  cartEntries: cartReducer,
  productsEntries: productsReducer,
};

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([authInterceptor, LoadingInterceptor])),
    importProvidersFrom(BrowserAnimationsModule),
    provideAnimations(),
    provideNoopAnimations(),
    provideEffects([ProductsEffects]),
    provideStoreDevtools({
      logOnly: environment.production,
    }),
    { provide: ENV, useValue: environment },
    provideStore(ROOT_REDUCERS, {
      metaReducers: [metaReducerCartLocalStorage],
    }),
  ],
}).catch(error => console.log(error));
