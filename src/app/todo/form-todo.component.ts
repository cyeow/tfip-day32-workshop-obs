import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges, inject } from '@angular/core';
import { Task, Todo } from '../models';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from './todo.service';
import { Subscription } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-form-todo',
  templateUrl: './form-todo.component.html',
  styleUrls: ['./form-todo.component.css']
})
export class FormTodoComponent implements OnInit, AfterViewInit, OnDestroy {

  // active variables
  currentTodo: Todo | null = null;

  // form
  form!: FormGroup;
  taskArray!: FormArray;

  // services
  fb = inject(FormBuilder);
  todoSvc = inject(TodoService);

  // subscriptions
  editTodo$!: Subscription

  ngOnInit(): void {
    this.form = this.createForm(this.currentTodo);
  }

  ngAfterViewInit(): void {
    this.editTodo$ = this.todoSvc.editTodo$.subscribe(
      todo => this.editTodo(todo)
    )
  }

  ngOnDestroy(): void {
    this.editTodo$.unsubscribe();
  }

  createForm(t: Todo | null): FormGroup {
    this.taskArray = this.createTasks(!!t ? t.tasks : []);

    return this.fb.group({
      id: this.fb.control<string>(!!t ? t.id : uuid()),
      title: this.fb.control<string>(!!t ? t.title : '', [Validators.required]),
      description: this.fb.control<string>(!!t ? t.description : ''),
      tasks: this.taskArray
    })
  }

  createTask(t: Task | null): FormGroup {
    return this.fb.group({
      name: this.fb.control<string>(!!t ? t.name : '', [Validators.required]),
      priority: this.fb.control<number>(!!t ? t.priority : 1, [Validators.min(1), Validators.max(3)]),
      dueDate: this.fb.control<string>(!!t ? t.dueDate : Date.now().toString()),
      completed: this.fb.control<boolean>(!!t ? t.completed : false)
    });
  }

  createTasks(tasks: Task[]) {
    return this.fb.array(
      tasks.map(t => this.createTask(t))
    );
  }

  addTodo(): void {
    const todo = this.form.value as Todo;
    console.log(this.form.value)
    this.todoSvc.updateTodo$.next(todo);
    this.form = this.createForm(null);
    console.log(this.form.value)
  }

  editTodo(t: Todo): void {
    this.currentTodo = t;
    this.form = this.createForm(t);
  }

  addTask(): void {
    this.taskArray.push(this.createTask(null));
  }

  removeTask(i: number): void {
    this.taskArray.removeAt(i);
  }

  invalid(): boolean {
    return !this.form.valid;
  }
}
