import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {
  loadPokemons,
  loadPokemonsSuccess,
  loadPokemonsFailure,
} from './pokemon.actions';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { PokemonDexieService } from '../services/pokemon.dexie';
import { Pokemon } from '../models/pokemon.model';
import { PokemonService } from '../services/pokemon.service';

@Injectable()
export class PokemonEffects {
  loadPokemons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPokemons),
      mergeMap(({ limit, offset }) =>
        from(this.dexieService.getPokemons(offset, limit)).pipe(
          switchMap((cachedPokemons: Pokemon[]) => {
            if (cachedPokemons.length === limit) {
              // Return cached Pokemons
              return of(loadPokemonsSuccess({ pokemons: cachedPokemons }));
            } else {
              // Fetch from API
              return this.pokemonService.getPokemons(limit, offset).pipe(
                map((response) => response.results),
                map((results) =>
                  results.map((result, index) => ({
                    name: result.name,
                    imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.extractIdFromUrl(
                      result.imageUrl
                    )}.png`,
                  }))
                ),
                switchMap((pokemons: Pokemon[]) =>
                  from(this.dexieService.addPokemons(pokemons)).pipe(
                    map(() => loadPokemonsSuccess({ pokemons })),
                    catchError((error) => of(loadPokemonsFailure({ error })))
                  )
                )
              );
            }
          }),
          catchError((error) => of(loadPokemonsFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private pokemonService: PokemonService,
    private dexieService: PokemonDexieService
  ) {}

  private extractIdFromUrl(url: string): number {
    const segments = url.split('/');
    return Number(segments[segments.length - 2]);
  }
}
