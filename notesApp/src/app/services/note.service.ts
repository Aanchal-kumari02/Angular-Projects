import { Injectable } from '@angular/core';
import { Firestore, addDoc, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Note } from '../interface/note';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(
    private firestore: Firestore
  ) { }

  // Add new note
  addNote(note:Note){
    note.id = doc(collection(this.firestore, 'id')).id;
    return addDoc(collection(this.firestore, 'Notes'), note);
  }

  // get all notes
  getAllNotes():Observable<Note[]>{
    let notesRef = collection(this.firestore, 'Notes');
    return collectionData(notesRef, {idField:'id'}) as Observable<Note[]>;
  }
  
  // delete a note from the firestore
  deleteNote(note:Note){
    let docRef = doc(this.firestore, `Notes/${note.id}`);
    return deleteDoc(docRef);
  }

  // update a note in the firestore
  updateNote(note:Note, notes:any){
    let docRef = doc(this.firestore, `Notes/${note.id}`);
    return updateDoc(docRef, notes);
  }
}
