import { Component, Input, Output, EventEmitter } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-validation-with-text-input-modal',
  imports: [
    FormsModule
  ],
  templateUrl: './validation-with-text-input-modal.component.html',
  styleUrl: './validation-with-text-input-modal.component.css'
})
export class ValidationWithTextInputModal {
  @Input() message: string = 'Confirmation required';
  @Input() yesText: string = 'Yes';
  @Input() noText: string = 'No';
  @Input() defaultTextInputValue: string = '';
  @Input() placeholder: string = 'Enter text here';
  @Output() yes = new EventEmitter<string>();
  @Output() no = new EventEmitter<string>();

  textInputValue: string = '';

  ngOnInit() {
    this.textInputValue = this.defaultTextInputValue;
  }

  onYes() { this.yes.emit(this.textInputValue); }
  onNo() { this.no.emit(); }
}
