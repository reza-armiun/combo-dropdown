import {Injectable, Type} from '@angular/core';
import {CARD_DATA, DEPOSIT_DATA, LOAN_DATA} from "../data/MockData";
import {CardComponent} from "../card/card.component";
import {LoanComponent} from "../loan/loan.component";
import {DepositComponent} from "../deposit/deposit.component";
import {BehaviorSubject, Observable} from "rxjs";
import {distinctUntilChanged, shareReplay, tap} from "rxjs/operators";
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

  private _selectedItem$ = new BehaviorSubject<ComboValue >({});
  private _selectedItemObs$: Observable<ComboValue >  = this._selectedItem$.asObservable().pipe(
    shareReplay(),
  );

  private _search$ = new BehaviorSubject<Search>({key: null, searchString: ''});
  private _searchObs$: Observable<Search> = this._search$.asObservable().pipe(
    tap(search => {
      let isValid = this.validators.reduce((result, validator: RegExp) =>
        result || validator.test(search.searchString ?? ''), false);
      this.error$.next(!isValid);
    })
  );

  private error$  = new BehaviorSubject(false);
  errorObs$: Observable<boolean> =  this.error$.asObservable().pipe(
    distinctUntilChanged((previous, current) => previous == current),
    shareReplay()
  );

  private validators: any[] = [];

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

  setError(error: boolean) {
    this.error$.next(error);
  }
  setValidators(validators: any[]) {
    this.validators = validators;
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
  get error() {
    return this.error$.getValue();
  }
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
    return this._searchObs$;
  }


  findItemByValue(value: any, comboComponents: ComboEntityComponent[] | undefined) {
    return this._dataList.find(item => {
      let combo = comboComponents?.find(combo => combo.getType().name == item.__type);
      if (combo) {
        if (item[combo.getSelectValue()] == value) return true;
      }
      return false;
    })
  }

  clearSelection() {
    if(this._selectedItem$.getValue()?.item) {
      this._selectedItem$.next({item: null, inputStr: ''})
    }
  }
}
