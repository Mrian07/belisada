import { Pipe, PipeTransform } from '@angular/core';
import { BrandsService } from '../servers/service/brands/brands.service';
import { Brands, Brands } from '../servers/model/brands';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  constructor(private brandsService: BrandsService) {}
  transform(items: Brands[]: Brands[] {
    this.brandsService.sort();
    return this.brandsService.item;
    // const filter = args[0].toLocaleLowerCase();
    // return filter ? value.filter(movie => movie.title.toLocaleLowerCase().indexOf(filter) !== -1) : value;
 }
}
