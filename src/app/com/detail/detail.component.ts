import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {TodoDataService} from "../../services/todo-data.service";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit{
  @Input() ModeEdite: boolean | undefined = false ;
  @Input() selectedrecord?:any
   message:string=''
   message1:string='برنامه روزانه'
   FormtTask=this.fb.group({
    title:['', [Validators.required]],
    description:['', [Validators.required]],
    completed:[false]
  })

  constructor(private fb:FormBuilder,
              private todosrv:TodoDataService ) { }
ngOnInit() {
this.todosrv.GetMessage().subscribe(res=>{
  if(res)
  this.message=res
})
}

}
