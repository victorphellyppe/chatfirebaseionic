import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

export interface User{
  uid:string;
  email:string;
}

export interface Message{
 createdAt: firebase.default.firestore.FieldValue;
 id:string;
 from:string;
 msg:string;
 fromName:string;
 myMsg:boolean;
}
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  currentUser: User = null;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) { 
    this.afAuth.onAuthStateChanged(user => {
      console.log('Changed: ', user);
      this.currentUser = user;
    });
  }
  async signUp({email, password}){
    const credenciais = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    console.log('result: ', credenciais);
    const uid = credenciais.user.uid;

    return this.afs.doc(
      `users/${uid}`
      ).set({
        uid,
        email: credenciais.user.email
      });
  }
  signIn({email, password}){
    return this.afAuth.signInWithEmailAndPassword(email, password)
  }
  signOut(){
    return this.afAuth.signOut();
    }

}
