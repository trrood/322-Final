import { Injectable } from '@angular/core';
import {AngularFirestoreCollection} from "angularfire2/firestore";
import {AngularFirestore} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";

export interface Contact {
  id?: string;
  image: string;
  firstName: string;
  lastName: string;
  number: string;
  email: string;
  favorite:boolean;

}

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  contactsListRef:AngularFirestoreCollection<Contact>;
  contactList: Observable<Contact[]>;
  constructor(private afs:AngularFirestore) {
    this.contactsListRef = this.afs.collection(`Contacts`);
    // this.contactList = this.contactsListRef.valueChanges();
    this.contactList = this.contactsListRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Contact;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    });



    console.log(this.contactList);
  }

  // sortNames() {
  //   AngularFirestore.database.list('Contacts', {
  //     query: {
  //       orderByChild: 'firstName',
  //       equalTo: true
  //     }
  //   });

    // this.contactsListRef.sort((n1,n2) => {
    //   if (n1 > n2) {
    //     return 1;
    //   }
    //
    //   if (n1 < n2) {
    //     return -1;
    //   }
    //
    //   return 0;
    // });
  // }

  deleteContact(id) {
    this.contactsListRef.doc(id).delete();
  }

  updateContact(id, newFirstName, newLastName, newNumber, newEmail, newImage) {
    this.contactsListRef.doc(id).update({"firstName": newFirstName});
    this.contactsListRef.doc(id).update({"lastName": newLastName});
    this.contactsListRef.doc(id).update({"number": newNumber});
    this.contactsListRef.doc(id).update({"email": newEmail});
    this.contactsListRef.doc(id).update({"image": newImage});

    
  }
  
  updateFavorite(id, favorite) {
    this.contactsListRef.doc(id).update({"favorite": favorite});
  }

  addNewContact(newContact):void {
    if(newContact) {
      this.contactsListRef.add(newContact);
    }
  }

}
