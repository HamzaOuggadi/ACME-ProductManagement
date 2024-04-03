import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Product, ProductResolved, ProductsResolved } from "./product";
import { Observable, catchError, map, of } from "rxjs";
import { ProductService } from "./product.service";

@Injectable({
    providedIn : 'root'
})
export class ProductsResolver implements Resolve<ProductsResolved> {

    constructor(private productService : ProductService) {

    }

    resolve(route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): ProductsResolved | Observable<ProductsResolved> | Promise<ProductsResolved> {
        
            return this.productService.getProducts().pipe(
                map(products => ({products : products})),
                catchError(error => {
                    const errorMessage = `Error retrieving products : ${error}`;
                    console.error(errorMessage);
                    return of({products : null, error : errorMessage});
                }));
    }


}