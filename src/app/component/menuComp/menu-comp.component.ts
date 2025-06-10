import {Component, Output, EventEmitter} from '@angular/core';
import {SubjectService} from '../../service/subjectService';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu-comp.component.html',
  styleUrl: './menu-comp.component.css'
})
export class MenuComp {
  subjects: any;
  channelSelectedId: number | undefined;
  @Output() channelSelected = new EventEmitter<any>();

  constructor(private subjectService: SubjectService) {
  }

  ngOnInit(): void {
    this.subjectService.getAllSubject().subscribe({
      next: (data) => this.subjects = data,
      error: (err) => console.error('Erreur lors du chargement des sujets', err)
    });
  }

  onChannelSelected(channel: any): void {
    this.channelSelectedId = parseInt(channel);
    this.channelSelected.emit(channel);
  }

  isSelectedChannel(channel: any): boolean {
    if (this.channelSelectedId === undefined) {
      return false;
    }
    return this.channelSelectedId === parseInt(channel);
  }
}
