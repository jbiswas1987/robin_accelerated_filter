import { Directive, ViewContainerRef } from '@angular/core';
import { ModalService } from './modal.service';

@Directive({
  selector: '[modalHolder]'
})
export class ModalHolderDirective {

  constructor(viewContainerRef: ViewContainerRef, modalService: ModalService) {
    modalService.registerViewContainer(viewContainerRef);
  }

}