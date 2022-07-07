import {Injectable, Type} from '@angular/core';
import {CARD_DATA, DEPOSIT_DATA, LOAN_DATA} from "../data/MockData";
import {CardComponent} from "../card/card.component";
import {LoanComponent} from "../loan/loan.component";
import {DepositComponent} from "../deposit/deposit.component";
import {BehaviorSubject, Observable} from "rxjs";
import {distinctUntilChanged, shareReplay} from "rxjs/operators";
import {ComboEntityComponent} from "../combo-entity/combo-entity.component";


export interface ComboValue {
  inputStr?: any;
  item?: any;
}
export interface Search {
  key: string | null;
  searchString: string;
}


@Injectable()
export class DropdownService {
  private _dataList: any[] = [];

  private _showOptions$ = new BehaviorSubject<boolean>(false);
  showOptionsObs$: Observable<boolean> = this._showOptions$.asObservable().pipe(
    distinctUntilChanged((x, y) => x == y),
    shareReplay(),
  );

  private _dataList$ = new BehaviorSubject<any[]>([]);
  private _dataListObs$: Observable<any[]> = this._dataList$.asObservable().pipe(
    shareReplay(),
  );

  private _initialValue$ = new BehaviorSubject<any>(null);
  private _initialValueObs$: Observable<any> = this._initialValue$.asObservable();

  private _selectedItem$ = new BehaviorSubject<ComboValue >({});
  private _selectedItemObs$: Observable<ComboValue >  = this._selectedItem$.asObservable();

  private _search$ = new BehaviorSubject<Search>({key: null, searchString: ''});
  private _searchObs$: Observable<Search> = this._search$.asObservable().pipe(
  );

  constructor() {
  }

  loadDataByType(type: Type<any>) {
    switch (type) {
      case CardComponent:
        let cardData = CARD_DATA.map((value: any) => {
          value.__type = type.name;
          return value;
        });
        this._dataList.push(...cardData)
        break;
      case LoanComponent:
        let loanData = LOAN_DATA.map((value: any) => {
          value.__type = type.name;
          return value;
        });
        this._dataList.push(...loanData)
        break;
      case DepositComponent:
        let depositData = DEPOSIT_DATA.map((value: any) => {
          value.__type = type.name;
          return value;
        });
        this._dataList.push(...depositData)
        break;
    }
    this._dataList$.next(this._dataList)
  }


  setInitialValue(value: any) {
    this._initialValue$ = value;
  }
  selectItem(item: ComboValue) {
    this._selectedItem$.next(item);
  }
  setSearch(search: Search) {
    this._search$.next(search);
  }

  closeOptions = () => this._showOptions$.next(false)
  openOptions = () => this._showOptions$.next(true);



  // get showOptions(): Observable<boolean> {
  //   return this.showOptionsObs$;
  // }
  get dataList() {
    return [...this._dataList];
  }
  get dataList$() {
    return this._dataListObs$;
  }
  get selectedItem(): Observable<any> {
    return this._selectedItemObs$;
  }
  get search(): Observable<Search> {
    return  this._searchObs$;
  }


  findItemByValue(value: any, comboComponents: ComboEntityComponent[] | undefined) {
    return this._dataList.find(item => {
      let combo = comboComponents?.find(combo => combo.getType().name == item.__type);
      if (combo) {
        if (item[combo.getSelectValue()] == value) return true;
      }
      return false
    })
  }
}
