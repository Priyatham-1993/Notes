import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {
  @Input('note') note
  @Output() getemittedNote = new EventEmitter();
  @Output() deleteSelectedNote = new EventEmitter();
  constructor() { }


  ngOnInit() {
  }

  getRecord(record) {
    this.getemittedNote.emit(record);
  }

  deleteNote(note) {
    this.deleteSelectedNote.emit(note);
  }

}
