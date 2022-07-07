import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren, ElementRef,
  QueryList,
  ViewChild,
} from '@angular/core';
import {ComboEntityComponent} from "../combo-entity/combo-entity.component";
import {ComboEntityDirective} from "../combo-entity.directive";
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from "@angular/forms";
import {ComboValue, DropdownService} from "./dropdown.service";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DropdownComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: DropdownComponent
    },
    DropdownService
  ]
})
export class DropdownComponent implements  AfterContentInit, ControlValueAccessor, Validator{
  @ContentChildren(ComboEntityDirective) children: QueryList<ComboEntityDirective> | undefined;
  @ViewChild('input') input: ElementRef | undefined;

  comboComponents: ComboEntityComponent[] | undefined = [];
  showOptions$: Observable<any> ;

  inputStr: any = '';

  initialValue: any;


  onChange = (value: ComboValue) => {};

  onTouched = () => {};

  touched = false;

  disabled = false;

  constructor(private dropdownService: DropdownService) {
    // cd.detach();
    this.showOptions$ =  dropdownService.showOptionsObs$;
    dropdownService.selectedItem.subscribe((comboValue: ComboValue) => {
      this.setSelectedItem(comboValue);
    })
  }

  ngAfterContentInit(): void {
    this.comboComponents = this.children?.filter(item => !!item.component).map(item => item.component);
    this.comboComponents?.forEach(item => {
      this.dropdownService.loadDataByType(item.getType());
    })
    if(this.initialValue) {
      let item = this.dropdownService.findItemByValue(this.initialValue, this.comboComponents);
      this.setSelectedItem({item: item, inputStr: this.initialValue})
    }
  }

  setSelectedItem(selectedItem: ComboValue) {
    this.markAsTouched();
    this.onChange(selectedItem);
    this.inputStr = selectedItem.inputStr;

    this.dropdownService.closeOptions();
  }
  onInputChange(event: Event) {
    this.dropdownService.openOptions();
    let inputStr = this.input?.nativeElement.value;
    this.dropdownService.setSearch({searchString: inputStr ?? '', key: (<InputEvent>event).data ?? '' });

    if (!this.disabled) {
      // this.onChange(event); //TODO
    }
  }


  closeOptions() {
    this.dropdownService.closeOptions();
  }

  openOptions() {
    this.dropdownService.openOptions();
  }


  clearInputStr() {
    this.inputStr = ''
  }




  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return null;
  }

  writeValue(value: any): void {
      this.initialValue = value;
  }


}
