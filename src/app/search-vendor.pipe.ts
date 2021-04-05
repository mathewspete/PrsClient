import { Pipe, PipeTransform } from '@angular/core';
import { Vendor } from "./vendor/vendor.class";

@Pipe({
  name: 'searchVendor'
})
export class SearchVendorPipe implements PipeTransform {

  transform(vendors: Vendor[], searchCriteria: string): Vendor[] {
    let selectedVendors: Vendor[] = [];
    if(searchCriteria.length == 0) {
      return vendors;
    }
    for (let vendor of vendors) {
      if (
        vendor.id.toString().includes(searchCriteria)
        || vendor.code.toLowerCase().includes(searchCriteria.toLowerCase())
        || vendor.name.toLowerCase().includes(searchCriteria.toLowerCase())
        || vendor.city.toLowerCase().includes(searchCriteria.toLowerCase())
        || vendor.state.toLowerCase().includes(searchCriteria.toLowerCase())
        || vendor.zip.toLowerCase().includes(searchCriteria.toLowerCase())
        || (vendor.email != null && vendor.email.toLowerCase().includes(searchCriteria.toLowerCase()))
        || (vendor.phone != null && vendor.phone.toLowerCase().includes(searchCriteria.toLowerCase()))
      ) {
        selectedVendors.push(vendor);
      }

    }

    return selectedVendors;
  }

}
