
import { AfterViewInit, Component, Directive, Input } from '@angular/core';
import { animate, AnimationBuilder, AnimationFactory, AnimationPlayer, style } from '@angular/animations';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html'
})

export class GraphComponent implements AfterViewInit {

  items: string[] = ['/assets/images/banda1.jpg', '/assets/images/banda2.jpg', '/assets/images/banda3.jpg', '/assets/images/banda4.jpg', '/assets/images/banda5.jpg']
  //timing = '7000ms cubic-bezier(0.2, 1, 0.2, 1)';
  //private player: AnimationPlayer;
  private itemWidth: number;
  private currentSlide = 0;
  private slidesToBeHidden;

  next() {
    if (this.currentSlide + 1 + this.slidesToBeHidden === this.items.length) {
      return;
    }
    this.currentSlide = (this.currentSlide + 1) % this.items.length;
    document.getElementById("app-graph-inner").style.marginLeft = (this.currentSlide * this.itemWidth * (-1)) + 'px';
    //const offset = this.currentSlide * this.itemWidth;
    //const myAnimation: AnimationFactory = this.buildAnimation(offset);
    //this.player = myAnimation.create(this.carousel);
    //this.player.play();
  }

  /*private buildAnimation(offset) {
    return this.builder.build([
      animate(this.timing, style({ transform: `translateX(-${offset}px)` }))
    ]);
  }*/

  prev() {
    if (this.currentSlide === 0) {
      return;
    }
    this.currentSlide = (this.currentSlide - 1) % this.items.length;
    document.getElementById("app-graph-inner").style.marginLeft = (this.currentSlide * this.itemWidth * (-1)) + 'px';
    
    //const offset = this.currentSlide * this.itemWidth;
    //const myAnimation: AnimationFactory = this.buildAnimation(offset);
    //this.player = myAnimation.create(this.carousel);
    //this.player.play();
  }

  constructor(private builder: AnimationBuilder) {}

  ngAfterViewInit() {
    setTimeout(() => {
      let screenWidth = document.getElementById('app-graph').clientWidth;

      if (screenWidth >= 1024) {
        this.itemWidth = screenWidth * (1/3.0);
        this.slidesToBeHidden = 2;
      } 
      else {
        this.itemWidth = screenWidth;
        this.slidesToBeHidden = 0; 
      }
    });
  }
}
