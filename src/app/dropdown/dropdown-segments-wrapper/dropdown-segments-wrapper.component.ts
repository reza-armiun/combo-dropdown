import { Component, Input, OnChanges, OnInit, SimpleChanges, Type} from '@angular/core';
import {ComboEntityComponent} from "../../combo-entity/combo-entity.component";
import {DropdownService, Search} from "../dropdown.service";
import {combineLatest, Observable, of} from "rxjs";
import {switchMap, tap,} from "rxjs/operators";


export interface FilteredResult {
    items: any[];
    search: Search;
}

@Component({
  selector: 'app-dropdown-segments-wrapper',
  templateUrl: './dropdown-segments-wrapper.component.html',
  styleUrls: ['./dropdown-segments-wrapper.component.css'],

})
export class DropdownSegmentsWrapperComponent implements OnInit, OnChanges {
  @Input('combos') comboComponents: ComboEntityComponent[] | undefined = [];

  dataList$: Observable<any[]> ;
  search$: Observable<Search>;
  filteredList$ : Observable<FilteredResult> | undefined;


  constructor(private dropdownService: DropdownService) {
    this.dataList$ = dropdownService.dataList$;
    this.search$ = dropdownService.search;

  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.comboComponents?.length) {
      this.filteredList$ = this.getList();
    }
  }

  getList(): Observable<FilteredResult> {
    if(!this.comboComponents?.length) return of({items: [], search: {searchString: '', key: ''}});
    return combineLatest([this.dataList$, this.search$])
      .pipe(
        switchMap(([items, search]) => {
          if(!search.searchString) {
            let result: FilteredResult = {items: items, search};
            return of(result);
          }
          let filterList = items.filter(item => {
            let comboComp = this.comboComponents?.find(combo => combo.getType().name == item.__type);
            // @ts-ignore
            if (comboComp) return item[comboComp.getSelectValue()]?.toString().includes(search.searchString);
          });
          let filteredResult: FilteredResult = {items: search.searchString.length > 0 ? filterList : items, search};
          return of(filteredResult);
        }),
        tap(({items, search}) => {
          if(items.length == 1) {
            let item = items[0];
            let comboComp = this.comboComponents?.find(combo => combo.getType().name == item.__type);
            if(comboComp && search.key ) {
              let selectedItem = {inputStr: item[comboComp.getSelectValue()], item: item};
              this.dropdownService.setSearch({searchString: selectedItem.inputStr, key: null});
              this.dropdownService.selectItem(selectedItem);
              this.dropdownService.closeOptions();
            }
          }
          else {
            if(items.length > 1 && !search.searchString )
              setTimeout(() => {
                this.dropdownService.clearSelection();
              },);
          }
        })
      );
  }


  getItemsByType(filteredList: any[], type: Type<any>) {
    if(!filteredList?.length) return [];
    return filteredList
      .filter(item => item.__type == type.name);
  }

}
