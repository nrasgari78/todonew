import {Component, Input, OnInit, ViewChild} from '@angular/core';
import Swal from "sweetalert2";
import {Task, TodoDataService} from "../../services/todo-data.service";
import {DetailComponent} from "../../com/detail/detail.component";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() list:any

  constructor() { }

  ngOnInit(): void {
  }

}
