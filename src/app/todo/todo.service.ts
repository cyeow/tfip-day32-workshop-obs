import { Subject } from "rxjs";
import { Todo } from "../models";
import { Injectable } from "@angular/core";

@Injectable()
export class TodoService {
    updateTodo$ = new Subject<Todo>();
    editTodo$ = new Subject<Todo>();
}