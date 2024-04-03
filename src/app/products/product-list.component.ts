import { Component, OnInit } from '@angular/core';

import { Product, ProductResolved, ProductsResolved } from './product';
import { ProductService } from './product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filteredProducts: Product[] = [];
  products: Product[] = [];

  constructor(private productService: ProductService,
              private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.data.subscribe(data => {
      const resolvedData : ProductsResolved = data['multiResolvedData'];
      console.log(resolvedData);
      this.errorMessage = resolvedData.error!;
      this.products = resolvedData.products!;
      console.log(this.products);
      this.filteredProducts = this.performFilter(this.listFilter)
    });

    // this.activatedRoute.data.subscribe({
    //   next : data => {

    //   },
    //   error : err => this.errorMessage = err
    // });

    // this.productService.getProducts().subscribe({
    //   next: products => {
    //     this.products = products;
    //     this.filteredProducts = this.performFilter(this.listFilter);
    //   },
    //   error: err => this.errorMessage = err
    // });
    this.listFilter = this.activatedRoute.snapshot.queryParamMap.get('filterBy') || '';
    this.showImage = this.activatedRoute.snapshot.queryParamMap.get('showImage')  === 'true';
  }

  performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

}
