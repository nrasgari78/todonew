import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Task} from "../../services/todo-data.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() list:any
  @Output() public eventEmitterModeEdite=new EventEmitter<any>()
  @Output() public eventEmitterEdite=new EventEmitter<any>()
  @Output() public eventEmitter=new EventEmitter<any>()

  id?: number;
  constructor() { }

  ngOnInit(): void {
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
}
