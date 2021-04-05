import { Pipe, PipeTransform } from '@angular/core';
import { Product } from "./product/product.class";

@Pipe({
  name: 'searchProduct'
})
export class SearchProductPipe implements PipeTransform {

  transform(products: Product[], searchCriteria: string): Product[] {
    let selectedProducts: Product[] = [];
    if(searchCriteria.length == 0) {
      return products;
    }
    for (let product of products) {
      if (
        product.id.toString().includes(searchCriteria)
        || product.partNbr.toLowerCase().includes(searchCriteria.toLowerCase())
        || product.name.toLowerCase().includes(searchCriteria.toLowerCase())
        || product.vendor.code.toLowerCase().includes(searchCriteria.toLowerCase())
        || product.vendor.name.toLowerCase().includes(searchCriteria.toLowerCase())
      ) {
        selectedProducts.push(product);
      }

    }

    return selectedProducts;
  }

}
