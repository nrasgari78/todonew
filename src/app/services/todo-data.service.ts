import { Injectable } from '@angular/core';
import {BehaviorSubject, delay, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

   message= new BehaviorSubject<string>('')
   private todos: Task[] = [
    new Task('جلسه با آقای اسدی', 'جلسه با آقای اسدی راس ساعت 17', false,1),
    new Task('مطالعه درس ریاضی', 'مطالعه درس ریاضی تا فصل پنجم', false,2),
  ];


  // automatic incrementing of ids
  lastId: number = 2;

  SendMessage(m:string){
    this.message.next(m)
  }
  GetMessage():Observable<string>{
    return this.message.asObservable()
  }
  // Simulate POST /tasks
  addTask(todo: Task): Observable<Task[]> {
    if (!todo.id) {
      todo.id = ++this.lastId;
    }
    this.todos.push(todo);
    return of(this.todos).pipe(delay(500));
  }

  // Simulate DELETE /tasks/:id
  deleteTaskById(id: number): Observable<Task[]> {
    const task = this.getTask(id);
    this.todos = this.todos
      .filter(todo => todo.id !== id);
    return of(this.todos).pipe(delay(500));
  }

  // Simulate PUT /tasks/:id
  updateTaskById(id: number, values: Object = {}): Observable<Task> {
    let task = this.getTask(id)
    Object.assign(task, values);
    return of(task).pipe(delay(500));
  }

  // Simulate GET /tasks
  getAllTasks(): Observable<Task[]> {
    return of(this.todos).pipe(delay(500));
  }

  // Simulate GET /tasks/:id
  getTaskById(id: number): Observable<Task> {
    const task = this.getTask(id);
    return of(task).pipe(delay(500));
  }

  private getTask(id: number) {
    let task = this.todos
      .filter(todo => todo.id === id)
      .pop()
    if (!task) {
      throw new Error('Could not find such todo!');
    }
    return task
  }

}

export class Task {
  id?: number;
  constructor(
    public title: string,
    public description: string,
    public completed: boolean = false,
    id?: number
  ) {
    if (id) {
      this.id = id;
    }
  }
}
