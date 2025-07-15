import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput} from '@angular/material/input';

type TodoItem = { id: number; description: string };

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatProgressSpinner, MatFormField, MatButton, MatInput],
  templateUrl: './todo-list.html',
  styleUrls: ['./todo-list.scss']
})
export class TodoList implements OnInit {
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);
  error = signal('');

  private apiUrl = `${environment.apiBaseUrl}/api/Item`;

  todos = signal<TodoItem[]>([]);
  loading = signal(false);
  form = this.fb.group({
    description: ['', Validators.required]
  });

  selectedTodoId = signal<number | null>(null);
  pendingDeleteId = signal<number | null>(null);

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.loading.set(true);
    this.error.set('');
    this.http.get<TodoItem[]>(this.apiUrl).subscribe({
      next: data => this.todos.set(data),
      error: () => {
        this.error.set('Failed to load todos');
        this.loading.set(false);
      },
      complete: () => this.loading.set(false)
    });
  }

  submit() {
    const description = this.form.value.description?.trim();
    if (!description) return;

    this.loading.set(true);
    this.error.set('');

    const id = this.selectedTodoId();
    const request = id
      ? this.http.put<TodoItem>(`${this.apiUrl}/${id}`, { description })
      : this.http.post<TodoItem>(this.apiUrl, { description });

    request.subscribe({
      next: () => {
        this.form.reset();
        this.selectedTodoId.set(null);
        this.loadTodos();
      },
      error: () => {
        this.error.set('Save failed');
        this.loading.set(false);
      }
    });
  }

  edit(todo: TodoItem) {
    this.form.setValue({ description: todo.description });
    this.selectedTodoId.set(todo.id);
  }

  delete(id: number) {
    this.pendingDeleteId.set(id);
  }

  confirmDelete(id: number) {
    this.loading.set(true);
    this.error.set('');

    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.loadTodos();
        this.pendingDeleteId.set(null);
      },
      error: () => {
        this.error.set('Delete failed');
        this.loading.set(false);
      }
    });
  }

  cancelDelete() {
    this.pendingDeleteId.set(null);
  }

  cancelEdit() {
    this.form.reset();
    this.selectedTodoId.set(null);
  }

  get isEditing() {
    return this.selectedTodoId() !== null;
  }
}
