import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'searchFilter'})
export class SearchFilterPipe implements PipeTransform {
    transform(value: any, search: string): any {
      if (value === null) {
        value = [];
      }
      const solution = value.filter(v => {
        if (search === undefined) {
          return value;
        } else {
          const cari = v.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
          if (cari === true) {
            return v;
          }
        }
    });

    return solution;
  }
}
