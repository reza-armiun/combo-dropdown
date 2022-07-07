import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Type} from '@angular/core';
import {Loan} from "../model/Loan";
import { LOAN_DATA} from "../data/MockData";
import {ComboEntityComponent} from "../combo-entity/combo-entity.component";

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.scss']
})
export class LoanComponent extends ComboEntityComponent implements OnInit {
  @Input('loans') loans: Loan[] = [];
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

  getValidationRegex(): string {
    return "";
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


}
