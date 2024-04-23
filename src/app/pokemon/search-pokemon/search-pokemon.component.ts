import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subject, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';

import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styleUrls: ['./search-pokemon.component.css']
})
export class SearchPokemonComponent implements OnInit {

  searchTerms = new Subject<string>();
  pokemons$: Observable<Pokemon[]>;

  constructor(private pokemonService: PokemonService, private router: Router) {

  }

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      debounceTime(150),
      distinctUntilChanged(),
      switchMap((term) => this.pokemonService.searchPokemonList(term))
    );
  }
  search(term: string) {
    this.searchTerms.next(term);
  }

  goToDetailPokemon(pokemon: Pokemon) {
    const link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }
}
