import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['/src/app/app.component.css','pokemon-form.component.css']
})
export class PokemonFormComponent implements OnInit {

  @Input() pokemon: Pokemon;

  types: string[];
  isAddForm: boolean;
  isEditForm: boolean;

  constructor(
    private pokemonService: PokemonService,
    private location: Location,
    private router: Router) {

  }
  ngOnInit(): void {
    this.types = this.pokemonService.getPokemonTypeList();
    this.isAddForm = this.router.url.includes('add');
    this.isEditForm = this.router.url.includes('edit');

  }

  hasType(type: string): boolean {
    return this.pokemon.types.includes(type);
  }
  selectType($event: Event, type: string) {
    const isChecked: boolean = ($event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.pokemon.types.push(type);
    } else {
      const index = this.pokemon.types.lastIndexOf(type);
      this.pokemon.types.splice(index, 1);
    }
  }
  isTypesValid(type: string): boolean {
    if (
      this.pokemon.types.length == 1 && this.hasType(type)
      || this.pokemon.types.length > 2 && !this.hasType(type)) {
      return false
    }
    return true
  }
  onSubmit() {
    if (this.isAddForm) {
      this.pokemonService.addPokemon(this.pokemon)
        .subscribe((pokemon : Pokemon) => this.router.navigate(['/pokemon', pokemon.id]));
      alert('pokemon ajouté avec succés');
    } 
    if (this.isEditForm) {
      this.pokemonService.updatePokemon(this.pokemon)
        .subscribe(() => this.router.navigate(['/pokemon', this.pokemon.id]));
        alert('pokemon modifier avec succés');
    }


  }
  goBack() {
    this.location.back();
  }
}
