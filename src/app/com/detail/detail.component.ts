import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit{
  @Input() ModeEdite: boolean | undefined = false ;
  @Input() selectedrecord?:any

  FormtTask=this.fb.group({
    title:['', [Validators.required]],
    description:['', [Validators.required]],
    completed:[false]
  })

  constructor(private fb:FormBuilder) { }
ngOnInit() {

}
}
