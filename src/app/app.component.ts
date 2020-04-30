import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Notes';
  public notesArray = [];
  public textValue = '';
  public isUpdate = false;
  public selectedRecord;
  public searchedval;

  constructor(public http: Http) {
  }

  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
    this.http.get('../assets/data/notes.json').toPromise()
      .then((data) => {
        localStorage.setItem('newNotes', JSON.stringify(data.json()));
      })
      .catch((error) => { console.log(error) });
    this.notesArray = JSON.parse(localStorage.getItem('newNotes'));
  }

  addnewNote() {
    this.textValue = '';
    let test = document.getElementById("test")
    test.focus();
  }

  saveNote() {
    if (this.textValue != '') {
      let tempObj = {
        id: this.notesArray && this.notesArray.length ? this.notesArray.length + 1 : 1,
        text: this.textValue,
        timeStamp: this.getTime()
      }
      this.notesArray = [...this.notesArray, ...[tempObj]];
      localStorage.setItem('newNotes', JSON.stringify(this.notesArray));
      this.textValue = '';
    } else {
      alert("Not an empty note Please!!")
    }
  }

  updateNote() {
    this.notesArray.forEach((element) => {
      if (element['id'] == this.selectedRecord['id']) {
        element['text'] = this.textValue
        element['timeStamp'] = this.getTime();
      }
    });
    localStorage.setItem('newNotes', JSON.stringify(this.notesArray));
    this.textValue = '';
    this.isUpdate = false;
  }

  getTime() {
    let date = new Date();
    let hours = date.getHours();
    let ampm = hours > 12 ? 'PM' : 'AM'
    hours = ampm == 'PM' ? hours - 12 : hours;
    let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    return hours + ':' + minutes + ' ' + ampm;
  }

  getemittedNote(event) {
    this.selectedRecord = event;
    this.textValue = event.text;
    this.isUpdate = true;
  }

  ngOnDestroy() {
    localStorage.clear();
  }

  deleteNote(event) {
    this.notesArray.splice(event, 1);
    localStorage.setItem('newNotes', JSON.stringify(this.notesArray));
    this.textValue = '';
  }

  getSearchedValue() {
    if (this.searchedval == '') {
      this.notesArray = JSON.parse(localStorage.getItem('newNotes'));
      return this.notesArray
    }
    this.notesArray = this.notesArray.filter(x => {
      x['text'].includes(this.searchedval);
    }
    );


  }

}
