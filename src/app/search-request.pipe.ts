import { Pipe, PipeTransform } from '@angular/core';
import { Request } from "./request/request.class";

@Pipe({
  name: 'searchRequest'
})
export class SearchRequestPipe implements PipeTransform {

  transform(requests: Request[], searchCriteria: string): Request[] {
    let selectedRequests: Request[] = [];
    if(searchCriteria.length == 0) {
      return requests;
    }
    for (let request of requests) {
      if (
        request.id.toString().includes(searchCriteria)
        || request.deliveryMode.toLowerCase().includes(searchCriteria.toLowerCase())
        || request.description.toLowerCase().includes(searchCriteria.toLowerCase())
        || (request.rejectionReason != null && request.rejectionReason.toLowerCase().includes(searchCriteria.toLowerCase()))
        || (request.justification != null && request.justification.toLowerCase().includes(searchCriteria.toLowerCase()))
        || request.status.toLowerCase().includes(searchCriteria.toLowerCase())
        || request.user.firstname.toLowerCase().includes(searchCriteria.toLowerCase())
        || request.user.lastname.toLowerCase().includes(searchCriteria.toLowerCase())
        || request.user.username.toLowerCase().includes(searchCriteria.toLowerCase())
      ) {
        selectedRequests.push(request);
      }

    }

    return selectedRequests;
  }

}
