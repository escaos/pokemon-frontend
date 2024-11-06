import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { Pokemon } from '../../pokemon/models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class DexieService extends Dexie {
  pokemons!: Table<Pokemon, string>; // 'name' as primary key

  constructor() {
    super('AppDatabase');
    this.version(1).stores({
      pokemons: 'name, imageUrl', // 'name' is the primary key
    });
  }
}
