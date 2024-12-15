import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPhonePrefix]'
})
export class PhonePrefixDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: KeyboardEvent) {
    const initialValue = this.el.nativeElement.value;
    if (!initialValue.startsWith('212')) {
      this.el.nativeElement.value = '212' + initialValue.replace(/[^0-9]/g, '').slice(0, 9);
    } else {
      this.el.nativeElement.value = initialValue.replace(/[^0-9]/g, '').slice(0, 12);
    }
    event.preventDefault();
  }
}
