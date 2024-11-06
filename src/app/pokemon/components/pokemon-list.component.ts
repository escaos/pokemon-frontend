import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadPokemons } from '../store/pokemon.actions';
import { selectAllPokemons, selectLoading } from '../store/pokemon.selectors';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf, AsyncPipe, NgFor } from '@angular/common';
import { throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    ScrollingModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemons$: Observable<Pokemon[]> | undefined;
  loading$: Observable<boolean> | undefined;
  limit = 20;
  offset = 0;

  @ViewChild(CdkVirtualScrollViewport)
  viewport!: CdkVirtualScrollViewport;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.pokemons$ = this.store.select(selectAllPokemons);
    this.loading$ = this.store.select(selectLoading);

    this.loadMorePokemons();

    this.viewport.scrolledIndexChange
      .pipe(throttleTime(200))
      .subscribe((index) => {
        const end = this.viewport.getDataLength();
        if (index + 10 >= end) {
          this.offset += this.limit;
          this.loadMorePokemons();
        }
      });
  }

  loadMorePokemons(): void {
    this.store.dispatch(
      loadPokemons({ limit: this.limit, offset: this.offset })
    );
  }
}
