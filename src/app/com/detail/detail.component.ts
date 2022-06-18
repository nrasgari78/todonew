import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {TodoDataService} from "../../services/todo-data.service";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  @Input() ModeEdite: boolean = false;
  @Input() id?: number ;

  FormtTask=this.fb.group({
    title:['', [Validators.required]],
    description:['', [Validators.required]],
    completed:[false]
  })

  loading: boolean=true;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    // document.getElementById('title')?.focus()

  }

}
