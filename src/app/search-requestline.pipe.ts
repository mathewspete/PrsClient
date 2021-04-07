import { Pipe, PipeTransform } from '@angular/core';
import { Requestline } from "./requestline/requestline.class";

@Pipe({
  name: 'searchRequestline'
})
export class SearchRequestlinePipe implements PipeTransform {

  transform(requestlines: Requestline[], searchCriteria: string): Requestline[] {
    let selectedRequestlines: Requestline[] = [];
    if(searchCriteria.length == 0) {
      return requestlines;
    }
    for (let requestline of requestlines) {
      if (
        requestline.id.toString().includes(searchCriteria)
        || requestline.requestId.toString().includes(searchCriteria)
        || requestline.product.price.toString().includes(searchCriteria)
        || (requestline.product.name != null && requestline.product.name.toLowerCase().includes(searchCriteria.toLowerCase()))
        || (requestline.product.partNbr != null && requestline.product.partNbr.toLowerCase().includes(searchCriteria.toLowerCase()))
        || (requestline.product.vendor.name != null && requestline.product.vendor.name.toLowerCase().includes(searchCriteria.toLowerCase()))
      ) {
        selectedRequestlines.push(requestline);
      }

    }

    return selectedRequestlines;
  }

}
