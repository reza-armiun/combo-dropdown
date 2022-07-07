import {Directive, ElementRef, EventEmitter, Type} from '@angular/core';




@Directive({
})
export  abstract class ComboEntityComponent  {
  abstract getTitle(): string;
  abstract getType(): Type<any>;
  abstract getDatas(): any[];
  abstract getInputName(): string;
  abstract getFilterByValues(): string[];
  abstract getSelectValue(): string;
  abstract onSelectItem: EventEmitter<any> ;
  abstract getValidationRegex(): string;
  abstract getOnSelectItemOutputName(): string;
  constructor( hostElement: ElementRef) {
    hostElement.nativeElement.__component = this;
  }
}
