import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Type} from '@angular/core';
import {Deposit} from "../model/Deposit";
import { DEPOSIT_DATA} from "../data/MockData";
import {ComboEntityComponent} from "../combo-entity/combo-entity.component";
import {Card} from "../model/Card";

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent extends ComboEntityComponent implements OnInit {
  @Input('deposits') deposits: Deposit[] = [];
  @Input('selectedItem') selectedItem: Deposit | undefined ;
  @Output('onSelectItem') onSelectItem  = new EventEmitter<any>();



  constructor(private hostElement: ElementRef) {
    super(hostElement);
  }

  ngOnInit(): void {}

  getFilterByValues(): string[] {
    return ['iban'];
  }

  getInputName(): string {
    return "deposits";
  }

  getSelectValue(): string {
    return "iban";
  }

  getType(): Type<any> {
    return DepositComponent;
  }

  getValidationRegex(): RegExp {
    return /^$|^\d{14}$/;
  }

  getDatas(): any[] {
    return DEPOSIT_DATA;
  }

  getTitle(): string {
    return "Deposit";
  }

  onClickItem(item: any) {
    this.onSelectItem.next(item);
  }

  getOnSelectItemOutputName(): string {
    return 'onSelectItem';
  }
  isSelected(deposit: any) {
    if(!this.selectedItem || !deposit) return false;
    // @ts-ignore
    return this.selectedItem[this.getSelectValue()] == deposit[this.getSelectValue()];
  }

}
