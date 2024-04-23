import { Component,OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-pokemon',
  templateUrl: './add-pokemon.component.html',
  styleUrls: ['/src/app/app.component.css','./add-pokemon.component.css']
})
export class AddPokemonComponent implements OnInit{

  pokemon:Pokemon ;

  constructor(private route : ActivatedRoute , private pokemonService : PokemonService , private location : Location){}
  ngOnInit(){
      this.pokemon = new Pokemon();

   }
  goBack(){
    this.location.back();
  }
}
