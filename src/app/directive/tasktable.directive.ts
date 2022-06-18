import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appTasktable]'
})
export class TasktableDirective {

  constructor(private el: ElementRef) { }
  ngOnInit(){
    if(this.el && this.el.nativeElement){
      if(this.el.nativeElement.tBodies && this.el.nativeElement.tBodies.length > 0){
        if(this.el.nativeElement.tFoot &&
          this.el.nativeElement.tFoot.rows &&
          this.el.nativeElement.tFoot.rows.length > 0){
          this.el.nativeElement.tFoot.
            rows[0].childNodes[1].innerHTML =
            this.el.nativeElement.tBodies[0].
            childElementCount.toString();
        }else{
          this.el.nativeElement.createTFoot();
          this.el.nativeElement.tFoot.insertRow();
          this.el.nativeElement.tFoot.rows[0].
            style.backgroundColor = "lightGray";
          this.el.nativeElement.tFoot.rows[0].
          insertCell(0).innerHTML = "Total Rows";
          this.el.nativeElement.tFoot.rows[0].
            cells[0].style.padding = "5px";
          this.el.nativeElement.tFoot.rows[0].
          insertCell(1).colSpan = 2;
          this.el.nativeElement.tFoot.rows[0].
            cells[1].style.padding = "5px";
          this.el.nativeElement.tFoot.rows[0].
            cells[1].innerHTML = this.el.nativeElement.
            tBodies[0].childElementCount.toString();
        }
      }
    }
  }

}
