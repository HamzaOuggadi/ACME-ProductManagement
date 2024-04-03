import { NgModule } from '@angular/core';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ProductResolver } from './product-resolver.service';
import { ProductsResolver } from './products-resolver.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path : "products", component : ProductListComponent,
        resolve : {
          multiResolvedData : ProductsResolver
        }
      },
      {
        path : "products/:id", 
        component : ProductDetailComponent,
        resolve : {
          resolvedData : ProductResolver
        }
      },
      {
        path : "products/:id/edit", 
        component : ProductEditComponent,
        resolve : {
          resolvedData : ProductResolver
        }
      }
    ])
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent
  ]
})
export class ProductModule { }
