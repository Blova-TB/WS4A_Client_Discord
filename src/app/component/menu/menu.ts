import { Component,Output,EventEmitter } from '@angular/core';
import {SubjectService} from '../../service/subjectService';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  subjects: any;
  @Output() channelSelected = new EventEmitter<any>();

  constructor(private subjectService: SubjectService) {
  }

  ngOnInit(): void {
    this.subjectService.getAllSubject().subscribe({
      next: (data) => this.subjects = data,
      error: (err) => console.error('Erreur lors du chargement des sujets', err)
    });
  }

  selectChannel(channel: any): void {
    this.channelSelected.emit(channel);
  }
}
