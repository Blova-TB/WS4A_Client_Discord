import {Component, Input} from '@angular/core';
import {DecimalPipe, UpperCasePipe} from '@angular/common';

@Component({
  selector: 'app-message',
  imports: [
    UpperCasePipe,
    DecimalPipe
  ],
  templateUrl: './message.html',
  styleUrl: './message.css'
})
export class Message {
  @Input ({ required: true }) message: any;

  constructor() {}

  ngOnInit(): void {}

}
