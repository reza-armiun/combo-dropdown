import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver, ComponentRef, EventEmitter,
  Input, OnChanges, OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ComboEntityComponent} from "../../combo-entity/combo-entity.component";
import {Subscription} from "rxjs";
import {DropdownService} from "../dropdown.service";
@Component({
  selector: 'app-dropdown-segment',
  templateUrl: './dropdown-segment.component.html',
  styleUrls: ['./dropdown-segment.component.css'],
})
export class DropdownSegmentComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef | undefined;
  @Input() comboComponent: ComboEntityComponent | undefined;
  @Input() dataList: any[] = [];


  sub: Subscription | undefined;
  component: ComponentRef<any> | undefined;

  constructor(private componentFactoryResolver: ComponentFactoryResolver
              , private dropdownService: DropdownService
              , private cd: ChangeDetectorRef) {
    cd.detach();
  }

  ngOnInit(): void {
    this.cd.detectChanges();
  }


  ngAfterViewInit(): void {
    if (!this.container || !this.comboComponent ) return;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.comboComponent?.getType());
    // @ts-ignore
    this.component = this.container.createComponent(componentFactory);
    // @ts-ignore
    let inputName = this.comboComponent.getInputName();
    this.component.instance[inputName] = this.dataList;
    let outputElement = this.component.instance[this.comboComponent.getOnSelectItemOutputName()] as EventEmitter<any>;
    this.sub = outputElement.asObservable()
      .subscribe(item => {
        if(this.comboComponent?.getSelectValue())
          this.dropdownService.selectItem({item: item, inputStr: item[this.comboComponent?.getSelectValue()]});
      });
    this.cd.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( !this.comboComponent || !this.component) return;
    let inputName = this.comboComponent.getInputName();
    this.component.instance[inputName] = this.dataList;
    this.cd.detectChanges();
  }


  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

}
