import { inject } from '@angular/core';
import { Action, ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { LocalstoreService } from '@core/services/localstore.service';
import { CartState } from './cart-state.interface';

export const metaReducerCartLocalStorage = <S, A extends Action = Action>(
  reducer: ActionReducer<S, A>
): ActionReducer<S, A> => {
  const localStorage = inject(LocalstoreService);

  return (state: S | undefined, action: A): S => {
    const nextState = reducer(state, action);

    if (action.type === INIT || action.type === UPDATE) {
      const savedState: CartState | null =
        localStorage.getSavedState('cartEntries');
      return savedState ? { ...nextState, cartEntries: savedState } : nextState;
    }
    // save the next state to the application storage with Cart actions.
    if (action.type.includes('[Cart]')) {
      localStorage.setSavedState((nextState as { cartEntries: CartState}).cartEntries, 'cartEntries');
    }
    return nextState;
  };
};
