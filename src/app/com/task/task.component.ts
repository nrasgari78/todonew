import {
  AfterContentChecked, AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnInit, Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import {TodoDataService} from "../../services/todo-data.service";
import {Task} from "../../services/todo-data.service";
import {FormBuilder, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {DetailComponent} from "../detail/detail.component";
import {TableComponent} from "../../shared/table/table.component";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit,DoCheck,OnChanges{
  @ViewChild(DetailComponent)DetailComponent: DetailComponent | undefined
  message:any='برنامه روزانه در حال ویرایش'
  taskList:Task[]=[]
  selected?:any
  ModeEdite: boolean | undefined
  id?: number;
  loading: boolean=true;
  constructor(private todosrv:TodoDataService) { }


ngOnChanges(changes: SimpleChanges) {
    console.log('changes',changes)
}

  ngOnInit(): void {
    this.GetTasks()
  }

  ngDoCheck() {
    if(this.ModeEdite===true && this.selected!=null)
      this.todosrv.SendMessage(this.message)
    if(this.id!=null && !this.ModeEdite)
    this.todosrv.deleteTaskById(this.id).subscribe(res=>{
     if(res) {
        Swal.fire({icon: 'success', text: 'با موفقیت حذف شد'})
        this.GetTasks()
        this.id = undefined
      }
    })
}

  GetTasks() {
    this.todosrv.getAllTasks().subscribe(res=>{
    if(res)
      this.loading = false
      this.taskList=res
    },error => {
      this.loading=true
    })
  }
  submit() : any{
    if(this.DetailComponent?.FormtTask.get(['title'])?.errors?.['required'])
      Swal.fire({icon: 'error', text: 'عنوان خالی است'})
    else
    if(this.DetailComponent?.FormtTask.get(['description'])?.errors?.['required'])
      Swal.fire({icon: 'error', text: 'توضیحات خالی است'})
    else {

      if(this.ModeEdite===true && this.selected!=null){

        const data={
          'title':this.DetailComponent?.FormtTask.get(['title'])?.value,
          'description' :this.DetailComponent?.FormtTask.get(['description'])?.value,
          'completed':this.DetailComponent?.FormtTask.get(['completed'])?.value?true:false
        }
        this.todosrv.updateTaskById(this.selected.id,data).subscribe(res=>{
          if(res){
            this.loading=false
            this.ModeEdite=false
            this.DetailComponent?.FormtTask.reset()
            Swal.fire({icon: 'success', text: 'با موفقیت ویرایش شد'})
          }
        },error => {
          this.loading=true
        })
      }
      else {
        const data={
          'title':this.DetailComponent?.FormtTask.get(['title'])?.value,
          'description' :this.DetailComponent?.FormtTask.get(['description'])?.value,
          'completed' :false
        }
        this.todosrv.addTask(data).subscribe(res=>{
          if(res){
            this.loading=false
            Swal.fire({icon: 'success', text: 'با موفقیت ثبت شد'})
            this.DetailComponent?.FormtTask.reset()
          }
        },error => {
          this.loading=true
        })
      }
    }

  }

  Deny() :any{
    this.DetailComponent?.FormtTask.reset()
    this.ModeEdite=false
    document.getElementById('title')?.focus()
  }
}
