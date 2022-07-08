import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Type} from '@angular/core';
import {Loan} from "../model/Loan";
import { LOAN_DATA} from "../data/MockData";
import {ComboEntityComponent} from "../combo-entity/combo-entity.component";
import {Card} from "../model/Card";

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss'],
})
export class LoanComponent extends ComboEntityComponent implements OnInit {
  @Input('loans') loans: Loan[] = [];
  @Input('selectedItem') selectedItem: Card | undefined ;
  @Output('onSelectItem') onSelectItem  = new EventEmitter<any>();




  constructor(private hostElement: ElementRef) {
    super(hostElement);
  }

  ngOnInit(): void {}

  getFilterByValues(): string[] {
    return [];
  }

  getInputName(): string {
    return "loans";
  }

  getSelectValue(): string {
    return "iban";
  }

  getType(): Type<any> {
    return LoanComponent;
  }

  getValidationRegex(): RegExp {
    return /^$|^\d{13}$/;
  }

  getDatas(): any[] {
    return LOAN_DATA;
  }

  getTitle(): string {
    return "Loan";
  }
  onClickItem(item: any) {
    this.onSelectItem.next(item);
  }
  getOnSelectItemOutputName(): string {
    return 'onSelectItem';
  }
  isSelected(loan: any) {
    if(!this.selectedItem || !loan) return false;
    // @ts-ignore
    return this.selectedItem[this.getSelectValue()] == loan[this.getSelectValue()];
  }

}
