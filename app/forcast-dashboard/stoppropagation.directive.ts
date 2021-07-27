import { Directive, ElementRef, AfterViewInit,HostListener } from '@angular/core';
import { fromEvent } from 'rxjs';

@Directive({
  selector: '[stopPropagation]',
})
export class StopPropagationDirective  {
  @HostListener("click", ["$event"])
  onclick(event: MouseEvent) {
    event.stopPropagation();
    
    console.log("clicked", event.target);
  }
}