import { PokemonService } from './../services/pokemon.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  offset = 0;
  pokemon = [];

  searching = false;
  inputFired = false;

  @ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;

  @ViewChild('headerwrapper', { read: ElementRef }) headerWrapper: ElementRef;
  @ViewChild('condenseheader', { read: ElementRef }) condenseheader: ElementRef;
  @ViewChild('overlay') overlay: ElementRef;

  

  constructor(
    private pokeService: PokemonService,
    private animationCtrl: AnimationController
    ) {}

  ngOnInit(){
    this.loadPokemon();
  }

  loadPokemon(loadMore = false, event?){
    if(loadMore){
      this.offset += 25;
    }
    this.pokeService.getPokemon(this.offset)
    .subscribe(res => {
      console.log('result = ', res);
      this.pokemon = [...this.pokemon, ...res];
      
      if(event){
        event.target.complete();
      }

      if(this.offset == 125){
        this.infinite.disabled = true;
      }
    });
  }

  onSearchChange(e){
    let value = e.detail.value;

    if (value == '') {
      this.offset = 0;
      this.loadPokemon();
      return;
    }

    this.pokeService.findPokemon(value).subscribe(res => {
      this.pokemon = [res];
    }, err => {
      this.pokemon = [];
    });
  }

  toggleSearch(){
    if (this.inputFired){
      return;
    }
    this.inputFired = true;
    const titleToolbar = this.condenseheader.nativeElement.children[0];

    // Fade out the status bar area
    const toolbarFade = this.animationCtrl.create('fade')
    .addElement(this.headerWrapper.nativeElement)
    .fromTo('opacity', 1, 0)
    .fromTo('height', '56px', '5px')
    .afterStyles({'z-index': -1});
    // toolbarFade.play();

    //Chain all animation
    const wrapper = this.animationCtrl.create('wrapper')
    .addAnimation([toolbarFade])
    .easing('ease-in')
    .duration(200);

    // Fade in/put the background overlay
    const overlayFade = this.animationCtrl.create('overlay')
    .addElement(this.overlay.nativeElement)
    .fromTo('opacity', 0, 1)
    .duration(200);

    if(this.searching){
      wrapper.direction('reverse').play();
      overlayFade.direction('reverse')
      .afterStyles({'z-index': 0})
      .play();
    }else{
      wrapper.play();
      overlayFade
      .beforeStyles({'z-index': 2})
      .play();
    }
    this.inputFired = false;
    this.searching = !this.searching;
  }
}
