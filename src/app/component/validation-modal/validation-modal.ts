import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-validation-modal',
  imports: [],
  templateUrl: './validation-modal.html',
  styleUrl: './validation-modal.css'
})
export class ValidationModal {
  @Input() message: string = 'Confirmation required';
  @Input() yesText: string = 'Yes';
  @Input() noText: string = 'No';
  @Output() yes = new EventEmitter<void>();
  @Output() no = new EventEmitter<void>();

  onYes() { this.yes.emit(); }
  onNo() { this.no.emit(); }
}
