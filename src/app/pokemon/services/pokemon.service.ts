import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PokemonListResponse } from '../models/pokemon-list-response.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = `${environment.apiUrl}/api/pokemon`;

  constructor(private http: HttpClient) {}

  getPokemons(limit: number, offset: number): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(
      `${this.apiUrl}?limit=${limit}&offset=${offset}`
    );
  }
}
