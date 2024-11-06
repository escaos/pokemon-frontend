import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { pokemonReducer } from './app/pokemon/store/pokemon.reducer';
import { PokemonEffects } from './app/pokemon/store/pokemon.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(),
    provideStore({ pokemon: pokemonReducer }),
    provideEffects([PokemonEffects]),
    provideStoreDevtools(),
  ],
}).catch((err) => console.error(err));
