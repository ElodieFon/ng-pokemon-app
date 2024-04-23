import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-pokemon',
  templateUrl: './edit-pokemon.component.html',
  styleUrls : ['/src/app/app.component.css','edit-pokemon.component.css']
})
export class EditPokemonComponent implements OnInit{
  pokemon : Pokemon | undefined;

  constructor( private route : ActivatedRoute , private pokemonService : PokemonService , private location : Location){}

  ngOnInit(): void {
    const pokemonId: string | null = this.route.snapshot.paramMap.get('id');

    if (pokemonId) {
      this.pokemonService.getPokemonById(+pokemonId)
        .subscribe(pokemon => this.pokemon = pokemon);
    }
  }
goBack(){
  this.location.back();
}
}
