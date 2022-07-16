import {Directive, ElementRef, HostListener, Renderer2} from "@angular/core";

@Directive({
  selector: '[appmouse]'
})
export class MouseoverDirective{
  constructor(private element:ElementRef,private renderer:Renderer2) {
  }
  @HostListener('mouseenter') onmouseover(){
    this.renderer.setStyle(this.element.nativeElement,'padding','10px,15px')
    this.renderer.setStyle(this.element.nativeElement,'background-color','antiquewhite')
  }
  @HostListener('mouseleave') onmouseout(){
    this.renderer.setStyle(this.element.nativeElement,'padding','0px,0px')
    this.renderer.setStyle(this.element.nativeElement,'background-color','transparent')
  }

}
