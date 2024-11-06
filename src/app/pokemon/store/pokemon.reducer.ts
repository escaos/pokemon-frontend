import { createReducer, on } from '@ngrx/store';
import {
  loadPokemons,
  loadPokemonsSuccess,
  loadPokemonsFailure,
} from './pokemon.actions';
import { Pokemon } from '../models/pokemon.model';

export interface PokemonState {
  pokemons: Pokemon[];
  loading: boolean;
  error: any;
}

export const initialState: PokemonState = {
  pokemons: [],
  loading: false,
  error: null,
};

export const pokemonReducer = createReducer(
  initialState,
  on(loadPokemons, (state) => ({ ...state, loading: true })),
  on(loadPokemonsSuccess, (state, { pokemons }) => ({
    ...state,
    loading: false,
    pokemons: [...state.pokemons, ...pokemons],
  })),
  on(loadPokemonsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
