import { Injectable } from '@angular/core';
import { DexieService } from '../../shared/services/dexie.service';
import { Pokemon } from '../models/pokemon.model';
import { Table } from 'dexie';

@Injectable({
  providedIn: 'root',
})
export class PokemonDexieService {
  private table: Table<Pokemon, string>; // Using 'name' as primary key

  constructor(private dexieService: DexieService) {
    this.table = this.dexieService.pokemons;
  }

  async addPokemons(pokemons: Pokemon[]): Promise<void> {
    // Using bulkPut to upsert pokemons based on primary key ('name')
    await this.table.bulkPut(pokemons);
  }

  async getAllPokemons(): Promise<Pokemon[]> {
    return this.table.toArray();
  }

  async getPokemonByName(name: string): Promise<Pokemon | undefined> {
    return this.table.get(name);
  }

  async getPokemons(offset: number, limit: number): Promise<Pokemon[]> {
    return this.table
      .orderBy('name') // Ordering by 'name' since it's the primary key
      .offset(offset)
      .limit(limit)
      .toArray();
  }
}
