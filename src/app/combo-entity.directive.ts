import {Directive, ElementRef} from '@angular/core';
import {ComboEntityComponent} from "./combo-entity/combo-entity.component";

@Directive({
  selector: '[appComboEntity]',
})
export class ComboEntityDirective {
  public component: ComboEntityComponent;

  constructor(private hostElement: ElementRef) {
    this.component = hostElement.nativeElement.__component;
  }



}
