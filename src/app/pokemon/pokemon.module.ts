import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './components/pokemon-list.component';
import { StoreModule } from '@ngrx/store';
import { pokemonReducer } from './store/pokemon.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PokemonEffects } from './store/pokemon.effects';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [PokemonListComponent],
  imports: [
    CommonModule,
    ScrollingModule,
    MatCardModule,
    MatProgressSpinnerModule,
    StoreModule.forFeature('pokemon', pokemonReducer),
    EffectsModule.forFeature([PokemonEffects]),
  ],
  exports: [PokemonListComponent],
})
export class PokemonModule {}
