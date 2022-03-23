import { PokemonService } from './../services/pokemon.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  details: any;
  slideOpts = {
    autoplay: {
      delay: 1000,
      disableOnInteraction: false
    }

  };

  constructor(private route: ActivatedRoute, private pokeService: PokemonService) { }

  ngOnInit() {
    let index = this.route.snapshot.paramMap.get('index');

    this.pokeService.getPokeDetails(index).subscribe(details => {
    console.log("🚀 ~ file: details.page.ts ~ line 17 ~ DetailsPage ~ this.pokeService.getPokeDetails ~ details", details);
    this.details = details;
    })
  }

}
