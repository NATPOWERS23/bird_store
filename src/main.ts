import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { bootstrapApplication } from '@angular/platform-browser';
import { InjectionToken, importProvidersFrom } from '@angular/core';
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
import { metaReducerCartLocalStorage } from './app/state/cart/cart-metareducer';
import { authInterceptor } from '@core/interceptors/auth.interceptor';
import { LoadingInterceptor } from '@core/interceptors/loading.interceptor';
import * as LoginEffects from './app/state/admin/login/login.effects';
import * as ProductsEffects from './app/state/products/products.effects';
import {
  authFeatureKey,
  authReducer,
} from './app/state/admin/login/login.reducer';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { USE_EMULATOR } from '@angular/fire/compat/auth';

export const ENV = new InjectionToken('environment');

const ROOT_REDUCERS = {
  cartEntries: cartReducer,
  productsEntries: productsReducer,
  [authFeatureKey]: authReducer,
};

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([authInterceptor, LoadingInterceptor])),
    importProvidersFrom(BrowserAnimationsModule),
    provideAnimations(),
    provideNoopAnimations(),
    { provide: ENV, useValue: environment },
    provideStore(ROOT_REDUCERS, {
      metaReducers: [metaReducerCartLocalStorage],
    }),
    provideEffects([LoginEffects, ProductsEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true,
    }),
    { provide: FIREBASE_OPTIONS, useValue: environment.fbConfig },
    provideFirebaseApp(() => initializeApp(environment.fbConfig)),
    provideFunctions(() => getFunctions()),
    provideStorage(() => getStorage()),
    provideDatabase(() => getDatabase()),
    { provide: USE_EMULATOR, useValue: ['localhost', 5001] },
  ],
}).catch(error => console.log(error));
