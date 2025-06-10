import {Component, Input} from '@angular/core';
import {DecimalPipe, UpperCasePipe} from '@angular/common';

@Component({
  selector: 'app-message',
  imports: [
    UpperCasePipe,
    DecimalPipe
  ],
  templateUrl: './message-comp.component.html',
  styleUrl: './message-comp.component.css'
})
export class MessageComp {
  @Input ({ required: true }) message: any;

  constructor() {}

  ngOnInit(): void {}

}
