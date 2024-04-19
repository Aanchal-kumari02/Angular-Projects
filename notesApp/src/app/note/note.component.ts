import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NoteService } from '../services/note.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from '../interface/note';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  
  buttonText: string = 'Add';
  noteForm!: FormGroup;
  notesListing: Note[] = []
  noteObj:Note = {
    id: '',
    note_title: '',
    note_description: ''
  }

  constructor(
    private noteService: NoteService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getAllNotes();
    this.initialize();
  }

  // initialize
  initialize(note:Note | null = null) {
    if(note){
      this.noteForm = this.fb.group({
        note_title: [note.note_title,[Validators.required]],
        note_description: [note.note_description, [Validators.required]],
      })
    }else{
      this.noteForm = this.fb.group({
        note_title: ['',[Validators.required]],
        note_description: ['', [Validators.required]],
      })
    }
  }

  onSubmit() {
    if (this.buttonText === 'Add') {
      this.noteObj = this.noteForm.value;
      this.noteService.addNote(this.noteObj).then((note) => {
        if (note) {
          alert('Note added successfully!');
          this.noteForm.reset();
        }
      });
    } else if (this.buttonText === 'Update') {
      const updatedNote: Note = this.noteForm.value;
      this.noteService.updateNote(this.noteObj, updatedNote).then(() => {
        alert('Note updated successfully!');
        this.noteForm.reset();
        this.buttonText = 'Add';
      });
    }
  }

  //get all notes
  getAllNotes(){
    this.spinner.show();
    this.noteService.getAllNotes().subscribe((res:Note[])=>{
      console.log(res);
      this.spinner.hide();
      this.notesListing = res;
    })
  }

  // delete note
  deleteNote(note:Note){
    let status = confirm("Are you sure you want to delete ?");
    if(status == true){
      this.noteService.deleteNote(note)
    }
  }

  // edit note
  editNotes(note:Note){
    this.initialize(note);
    this.buttonText = 'Update';
    this.noteObj = note;
  }
}
