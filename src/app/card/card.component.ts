import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  Type
} from '@angular/core';
import {Card} from "../model/Card";
import {CARD_DATA} from "../data/MockData";
import {ComboEntityComponent} from "../combo-entity/combo-entity.component";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent extends ComboEntityComponent implements OnInit, OnChanges, AfterViewInit, AfterViewChecked{
  @Input('cards') cards: Card[]  = [];
  @Output('onSelectItem') onSelectItem= new EventEmitter<any>();


  constructor(private hostElement: ElementRef) {
    super(hostElement);
  }

  ngAfterViewChecked(): void {
  }

  ngAfterViewInit(): void {
    this.cards =[...this.cards]
  }



  ngOnInit(): void {
    // console.log('this.cards1 ', this.cards)
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  getFilterByValues(): string[] {
    return ["cardNumber"];
  }

  getInputName(): string {
    return "cards";
  }

  getSelectValue(): string {
    return "cardNumber";
  }

  getType(): Type<any> {
    return CardComponent;
  }

  getDatas(): any[] {
    return CARD_DATA;
  }

  getValidationRegex(): string {
    return "";
  }

  getTitle(): string {
    return "Card";
  }

  onClickItem(item: any) {
    this.onSelectItem.next(item);
  }

  getOnSelectItemOutputName(): string {
    return 'onSelectItem';
  }
}
