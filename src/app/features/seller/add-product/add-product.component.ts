import { Component, OnInit, ElementRef } from '@angular/core';
import { BrandService } from '@belisada/core/services/brand/brand.service';
import { BrandList } from '@belisada/core/models';
import { AddProductRequest } from '@belisada/core/models/product/product.model';
import swal from 'sweetalert2';
import { CategoryList } from '@belisada/core/models/category/category.model';
import { CategoryService } from '@belisada/core/services/category/category.service';
import { CategoryTypeEnum } from '@belisada/core/enum/category-type.enum';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  addProductRequest: AddProductRequest = new AddProductRequest();

  productPictures: string[] = [];

  brandList: BrandList = new BrandList();
  currentPgBrand: number;
  limitBrand: Number = 100;
  brandName: string;
  onBrandFocus: Boolean = false;

  categoryList: CategoryList = new CategoryList();
  currentPgCategory: number;
  limitCategory: Number = 20;
  categoryName: string;
  onCategoryFocus: Boolean = false;

  constructor(
    private brandService: BrandService,
    private categoryService: CategoryService,
    private el: ElementRef
  ) {
    this.brandList.data = [];
    this.categoryList.data = [];
  }

  ngOnInit() {
    this.currentPgBrand = 1;
    this.currentPgCategory = 1;

    this.getBrandInit();
    this.getCategoryInit();
  }

  /**
   * Image product start
   */
  getSelectedFiles(event: any) {
    const files = [].slice.call(event.target.files);
    this.readThis(files);
  }

  readThis(files: any[]): void {
    files.forEach(file => {
      const myReader: FileReader = new FileReader();
      myReader.onloadend = (e) => {
        if (this.productPictures.length < 5) {
          this.productPictures.push(myReader.result);
        } else {
          swal(
            'Belisada.co.id',
            'Kamu hanya bisa menambahkan maksimal 5 gambar',
            'info'
          );
        }
      };
      myReader.readAsDataURL(file);
    });
  }

  removeImage(index: number) {
    if (index > -1) {
      this.productPictures.splice(index, 1);
    }
  }
  // --- Image product end

  /**
   * Product Brand Search
   */
  getBrandInit() {
    const queryParams = {
      page: this.currentPgBrand,
      itemperpage: this.limitBrand,
      name: this.brandName === undefined ? '' : this.brandName
    };
    this.brandService.getListBrand(queryParams).subscribe(response => {
      this.brandList = response;
    });
  }

  onBrandBlur() {
    setTimeout(() => { this.onBrandFocus = false; }, 200);
  }

  searchBrand() {
    const qsBrand = this.brandName;
    const queryParams = {
      page: this.currentPgBrand = 1,
      itemperpage: this.limitBrand,
      name: qsBrand === undefined ? '' : qsBrand
    };
    this.brandService.getListBrand(queryParams).subscribe(response => {
      this.brandList = response;
    });
  }

  selectBrand(brand) {
    this.brandName = brand.name;
    this.addProductRequest.brandId = brand.brandId;
  }

  onBrandScrollDown () {
    const scr = this.el.nativeElement.querySelector('#drick-scroll-container--brand');
    console.log('scr.scrollHeight: ', scr.scrollHeight);
    console.log('scr.clientHeight: ', scr.clientHeight);
    console.log('scr.scrollTop: ', scr.scrollTop);
    if (scr.scrollHeight - scr.clientHeight === scr.scrollTop) {
      const queryParams = {
        page: this.currentPgBrand += 1,
        itemperpage: this.limitBrand,
        name: this.brandName === undefined ? '' : this.brandName
      };
      this.brandService.getListBrand(queryParams).subscribe(response => {
        this.brandList.data = this.brandList.data.concat(response.data);
      });
    }
  }
  // --- Product brand end

  /**
   * Product Category Search
   */
  getCategoryInit() {
    const queryParams = {
      page: this.currentPgCategory,
      itemperpage: this.limitCategory,
      name: this.categoryName === undefined ? '' : this.categoryName,
      type: CategoryTypeEnum.C3
    };
    this.categoryService.getListCategory(queryParams).subscribe(response => {
      console.log('response: ', response);
      this.categoryList = response;
    });
  }

  onCategoryBlur() {
    setTimeout(() => { this.onCategoryFocus = false; }, 200);
  }

  searchCategory() {
    const qsCategory = this.categoryName;
    const queryParams = {
      page: this.currentPgCategory = 1,
      itemperpage: this.limitCategory,
      name: this.categoryName === undefined ? '' : this.categoryName,
      type: CategoryTypeEnum.C3
    };
    this.categoryService.getListCategory(queryParams).subscribe(response => {
      this.categoryList = response;
    });
  }

  selectCategory(category) {
    this.categoryName = category.name;
    this.addProductRequest.categoryThreeId = category.categoryId;
  }

  onCategoryScrollDown () {
    const scr = this.el.nativeElement.querySelector('#drick-scroll-container--category');
    console.log('scr.scrollHeight: ', scr.scrollHeight);
    console.log('scr.clientHeight: ', scr.clientHeight);
    console.log('scr.scrollTop: ', scr.scrollTop);
    if (scr.scrollHeight - scr.clientHeight === scr.scrollTop) {
      const queryParams = {
        page: this.currentPgCategory += 1,
        itemperpage: this.limitCategory,
        name: this.categoryName === undefined ? '' : this.categoryName,
        type: CategoryTypeEnum.C3
      };
      this.categoryService.getListCategory(queryParams).subscribe(response => {
        this.categoryList.data = this.categoryList.data.concat(response.data);
      });
    }
  }
  // --- Product category end

  /**
   * Specifications
   */
}
