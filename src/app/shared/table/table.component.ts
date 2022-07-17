import {Component, Input, OnInit, Output, EventEmitter, SimpleChanges, OnChanges, DoCheck} from '@angular/core';
import {Task} from "../../services/todo-data.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnChanges{
  @Input() list:any
  @Output() public eventEmitterModeEdite=new EventEmitter<any>()
  @Output() public eventEmitterEdite=new EventEmitter<any>()
  @Output() public eventEmitter=new EventEmitter<any>()
  FilterT:string=''
  FilterList?:Task[]
  id?: number;
  constructor() { }
  get filterText(){
    return this.FilterT
  }
  set filterText(value:string){
    this.FilterT=value
    this.FilterList= this.filterFunc(value)
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log('changes',changes)
    this.FilterList=this.list

  }

  EditeTask(i:Task) {
    this.eventEmitterModeEdite.emit(true)
    this.eventEmitterEdite.emit(i)
  }

  DeleteTask(i:Task) {
    Swal.fire({
      title:  '<h5 /> آیا از حذف عنوان <h5> ' + i.title +   '<h5/> از لیست کاری مطمئن هستید؟<h5>'   ,
      showCancelButton: true,
      confirmButtonText: 'بله',
      cancelButtonText: `خیر`,
      icon:'question'
    }).then((result) => {
      if (result.isConfirmed) {
        const id=i['id']
        this.eventEmitterModeEdite.emit(false)
        this.eventEmitter.emit(id)

      }
    })
  }
  filterFunc(filterTerm:string){
    if(this.list.length===0 || this.filterText===null)
      return this.list
    else{
      return this.list.filter((res:any)=>
      {
      return  res['title'].match(filterTerm)
      })
    }

  }
  trackByFn(index:number,item:any){
    return item.Id_Doctor
  }
}
