import { Component, OnInit } from '@angular/core';
import {TodoDataService} from "../../services/todo-data.service";
import {Task} from "../../services/todo-data.service";
import {FormBuilder, Validators} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
taskList:Task[]=[]
  FormtTask=this.fb.group({
    title:['', [Validators.required]],
    description:['', [Validators.required]],
    completed:[false]
  })
  ModeEdite: boolean=false;
  id?: number;
  constructor(private todosrv:TodoDataService,
              private fb:FormBuilder) { }

  ngOnInit(): void {
    document.getElementById('title')?.focus()
    this.GetTasks()
  }
  GetTasks() {
    this.todosrv.getAllTasks().subscribe(res=>{
    if(res)
      this.taskList=res
    })
  }

  EditeTask(i:Task) {
    document.getElementById('title')?.focus()
    this.ModeEdite=true
    this.FormtTask.get(['title'])?.setValue(i['title'])
    this.FormtTask.get(['description'])?.setValue(i['description'])
    i['completed']?this.FormtTask.get(['completed'])?.setValue(true):this.FormtTask.get(['completed'])?.setValue(false)
    this.id=i['id']
  }

  Deny() {
    this.FormtTask.reset()
    this.ModeEdite=false
    document.getElementById('title')?.focus()
  }

  submit() {
    if(this.FormtTask.get(['title'])?.errors?.['required'])
     Swal.fire({icon: 'error', text: 'عنوان خالی است'})
    else
    if(this.FormtTask.get(['description'])?.errors?.['required'])
      Swal.fire({icon: 'error', text: 'توضیحات خالی است'})
    else {

      if(this.ModeEdite===true && this.id!=null){
        const data={
          'title':this.FormtTask.get(['title'])?.value,
          'description' :this.FormtTask.get(['description'])?.value,
          'completed':this.FormtTask.get(['completed'])?.value?true:false

        }
        this.todosrv.updateTaskById(this.id,data).subscribe(res=>{
          if(res){
            this.ModeEdite=false
            this.FormtTask.reset()
            Swal.fire({icon: 'success', text: 'با موفقیت ویرایش شد'})
          }
        },error => {
          console.log(error)
        })
      }
      else {
        const data={
          'title':this.FormtTask.get(['title'])?.value,
          'description' :this.FormtTask.get(['description'])?.value,
          'completed' :false
        }
        this.todosrv.addTask(data).subscribe(res=>{
          if(res){
            Swal.fire({icon: 'success', text: 'با موفقیت ثبت شد'})
            this.FormtTask.reset()
          }
        })
      }
    }
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
    if(id!=null)
    this.todosrv.deleteTaskById(id).subscribe(res=>{
      if(res)  Swal.fire({icon: 'success', text: 'با موفقیت حذف شد'})
      this.GetTasks()
    })
  }
  })
}
}
