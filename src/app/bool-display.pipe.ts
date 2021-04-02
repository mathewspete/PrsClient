import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolYN'
})
export class BoolDisplayPipe implements PipeTransform {

  transform(value: boolean): string {
    return (value)?"Y":"N";
  }

}
