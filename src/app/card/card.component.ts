import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter, Inject, InjectionToken,
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


export const INPUTS = new InjectionToken<any[]>('inputs', { providedIn: 'any',  factory: () => [] });

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent extends ComboEntityComponent implements OnInit, OnChanges, AfterViewInit{
  @Input('cards') cards: Card[] = [];
  @Input('selectedItem') selectedItem: Card | undefined ;
  @Output('onSelectItem') onSelectItem = new EventEmitter<any>();


  constructor(@Inject(INPUTS)  private inputs: any[],private hostElement: ElementRef) {
    super(hostElement);
    // console.log('inputs ',inputs)
  }

  ngAfterViewInit(): void {
    this.cards = [...this.cards];
  }

  ngOnInit(): void {
    this.cards = this.cards || this.inputs;
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

  getValidationRegex(): RegExp {
    return /^$|^\d{12}$/;
  }

  getTitle(): string {
    return "Card";
  }

  onClickItem(item: any) {
    this.onSelectItem.next(item);
  }

  // selectItem(value: any) {
  //   this.selectedCard = value;
  // }

  getOnSelectItemOutputName(): string {
    return 'onSelectItem';
  }

  isSelected(card: Card) {
    // @ts-ignore
    if(!this.selectedItem || !card) return false;
    // @ts-ignore
    return this.selectedItem[this.getSelectValue()] == card[this.getSelectValue()];
  }
}
