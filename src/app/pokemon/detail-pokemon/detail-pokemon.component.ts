import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styleUrls: ['/src/app/app.component.css','detail-pokemon.css']
})
export class DetailPokemonComponent implements OnInit {

  pokemonList: Pokemon[];
  pokemon: Pokemon | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService,
    private location: Location) { }


  ngOnInit(): void {
    const pokemonId: string | null = this.route.snapshot.paramMap.get('id');

    if (pokemonId) {
      this.pokemonService.getPokemonById(+pokemonId)
        .subscribe(pokemon => this.pokemon = pokemon);
    }
  }
  deletePokemon(pokemon: Pokemon) {
    this.pokemonService.deletePokemonById(pokemon.id).subscribe(() => this.goToPokemonList());
    alert(`vous avez suprimer ${(pokemon.name)}`)
  }
  goToPokemonList() {
    this.router.navigate(['/pokemons']);
  }
  goToPokemonEdit(pokemon: Pokemon) {
    this.router.navigate(['pokemon/edit', pokemon.id]);
  }
  goBack() {
    this.location.back();
  }
}
