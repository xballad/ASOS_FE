import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-popup',
  templateUrl: './task-popup.component.html',
  styleUrls: ['./task-popup.component.css']
})
export class TaskPopupComponent implements OnInit {
  @Input() task: any;
  @Input() email: string | null = null;
  @Output() close = new EventEmitter<void>();

  taskDetails: any = null;
  commentForm: FormGroup;

  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder
  ) {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.task?.id) {
      this.fetchTaskDetails(this.task.id);
    }
  }

  fetchTaskDetails(taskId: number): void {
    this.taskService.getTaskById(taskId).subscribe({
      next: (data) => {
        this.taskDetails = data;
      },
      error: (err) => {
        console.error('Error fetching task details', err);
      }
    });
  }

  closePopup() {
    this.close.emit();
  }

  submitComment() {
    if (this.commentForm.valid && this.email) {
      const comment = {
        text: this.commentForm.get('comment')?.value,
        task_spec_id: this.taskDetails.task_spec.id,
        user_username: this.email
      };
      this.taskService.addComment(comment).subscribe({
        next: (response) => {
          this.commentForm.reset();
          this.fetchTaskDetails(this.task.id);
        },
        error: (err) => {
          console.error('Error adding comment', err);
        }
      });
    }
  }
}
