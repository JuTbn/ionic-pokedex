import { PokemonService } from './../services/pokemon.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  offset = 0;
  pokemon = [];

  constructor(private pokeService: PokemonService) {}

  ngOnInit(){
    this.loadPokemon();
  }

  loadPokemon(){
    this.pokeService.getPokemon(this.offset)
    .subscribe(res => {
      console.log('result = ', res);
      this.pokemon = res;
      
    })
  }

}
