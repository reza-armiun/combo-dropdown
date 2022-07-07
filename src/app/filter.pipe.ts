import {Pipe, PipeTransform, Type} from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], select: string, itemValue: string): any {
    if(itemValue && select) {
      return items
        .filter(it => it[select].toString().includes(itemValue));
    }
    return items;
  }

}
