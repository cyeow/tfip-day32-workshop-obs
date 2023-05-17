import { AfterViewInit, Component, OnDestroy, inject } from '@angular/core';
import { Todo } from '../models';
import { TodoService } from './todo.service';
import { Subscription } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.css']
})
export class ListTodoComponent implements AfterViewInit, OnDestroy {

  // variables
  todoList: Todo[] = [];

  // services
  todoSvc = inject(TodoService);

  // subscriptions
  updateTodo$!: Subscription;

  ngAfterViewInit(): void {
    this.updateTodo$ = this.todoSvc.updateTodo$.subscribe(
      todo => this.updateTodo(todo)
    );
  }

  ngOnDestroy(): void {
    this.updateTodo$.unsubscribe();
  }

  updateTodo(t: Todo): void {
    if (!!t.id) {
      // id is defined
      // find old id and update
      let index = this.todoList.findIndex(todo => todo.id === t.id);
      if (index != -1) {
        // id exists in the list, update
        this.todoList[index] = t;
      } else {
        // id does not exist in the list
        this.todoList.push(t);
      }
    } else {
      // id is undefined
      // add id and push 
      // code should not end up here because uuid is assigned upon form initialisation
      t.id = uuid();
      this.todoList.push(t);
    }
  }

  editTodo(i: number): void {
    this.todoSvc.editTodo$.next(this.todoList[i]);
  }

  removeTodo(i: number): void {
    this.todoList.splice(i, 1);
  }

  getOutstandingTasks(i: number): number {
    let count = 0;
    this.todoList[i].tasks.map(task => task.completed ? count++ : 0);
    return this.todoList[i].tasks.length - count;
  }
}
