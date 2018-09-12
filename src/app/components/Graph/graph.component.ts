import {
  AfterViewInit,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  Input,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {GraphItemDirective} from './graph-item.directive';
import {animate, AnimationBuilder, AnimationFactory, AnimationPlayer, style} from '@angular/animations';

@Directive({
  selector: '.graph-item'
})
export class GraphItemElement {
}
@Component({
  selector: 'graph',
  exportAs: 'graph',
  template: `
    <section class="graph-wrapper" [ngStyle]="graphWrapperStyle">
      <ul class="graph-inner" #graph>
        <li *ngFor="let item of items;" class="graph-item">
          <ng-container [ngTemplateOutlet]="item.tpl"></ng-container>
        </li>
      </ul>
    </section>
    <div *ngIf="showControls" style="margin-top: 1em" class="btn-container">
      <button (click)="prev()" class="btn btn-default" id="btn-left">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path fill="#888" d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"/>
          <path fill="none" d="M0 0h24v24H0z"/>
        </svg>
      </button>
      <button (click)="next()" class="btn btn-default" id="btn-right" align="right">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path fill="#888" d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"/>
          <path fill="none" d="M0 0h24v24H0z"/>
        </svg>
      </button>
    </div>
  `,
  styles: [`
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      /*width: 6000px;*/
      height: 100%;
    }

    .graph-wrapper {
      overflow: hidden;
      height: 100%;
      margin-left: 5px;
    }

    .graph-inner {
      display: flex;
    }
    
    .graph-item {
      width: 100%;
    }

  `]
})
export class GraphComponent implements AfterViewInit {
  @ContentChildren(GraphItemDirective) items: QueryList<GraphItemDirective>;
  @ViewChildren(GraphItemElement, { read: ElementRef }) private itemsElements: QueryList<ElementRef>;
  @ViewChild('graph') private graph: ElementRef;
  @Input() timing = '2000ms cubic-bezier(0.2, 1, 0.2, 1)';
  @Input() showControls = true;
  @Input() slide = false;
  @Input() slideTime = 2;
  private player: AnimationPlayer;
  private itemWidth: number;
  private currentSlide = 0;
  graphWrapperStyle = {};

  next() {
    if ( this.currentSlide + 1 === this.items.length ) {
      return;
    }
    this.currentSlide = (this.currentSlide + 1) % this.items.length;
    const offset = this.currentSlide * this.itemWidth;
    const myAnimation: AnimationFactory = this.buildAnimation(offset);
    this.player = myAnimation.create(this.graph.nativeElement);
    this.player.play();
  }

  private buildAnimation( offset ) {
    return this.builder.build([
      animate(this.timing, style({ transform: `translateX(-${offset}px)` }))
    ]);
  }

  prev() {
    if ( this.currentSlide === 0 ) {
      return;
    }

    this.currentSlide = ((this.currentSlide - 1) + this.items.length) % this.items.length;
    const offset = this.currentSlide * this.itemWidth;

    const myAnimation: AnimationFactory = this.buildAnimation(offset);
    this.player = myAnimation.create(this.graph.nativeElement);
    this.player.play();
  }

  constructor( private builder: AnimationBuilder ) {
  }

  ngAfterViewInit() {
    // For some reason only here I need to add setTimeout, in my local env it's working without this.
    setTimeout(() => {console.dir(this.itemsElements);
      this.itemWidth = this.itemsElements.first.nativeElement.getBoundingClientRect().width;
      this.graphWrapperStyle = {
        width: `${this.itemWidth}px`
      };
    });
    if (this.slide) {
      setInterval(() => {
        if ( this.currentSlide + 1 === this.items.length ) {
          this.currentSlide = 0;
          const offset = 0;
          const myAnimation: AnimationFactory = this.buildAnimation(offset);
          this.player = myAnimation.create(this.graph.nativeElement);
          this.player.play();
        } else {
          this.next();
        }
      }, this.slideTime * 1000);
    }
  }
}
