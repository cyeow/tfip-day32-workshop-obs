import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormTodoComponent } from './todo/form-todo.component';
import { ListTodoComponent } from './todo/list-todo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoService } from './todo/todo.service';
import { MaterialModule } from './material.module';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    FormTodoComponent,
    ListTodoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatNativeDateModule
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
