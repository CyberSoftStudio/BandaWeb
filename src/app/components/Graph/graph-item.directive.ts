import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[graphItem]'
})
export class GraphItemDirective {

  constructor( public tpl: TemplateRef<any> ) {
  }

}
