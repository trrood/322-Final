import { Component } from '@angular/core';
import {NavController, IonicPage, AlertController, ToastController} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";
import {InfoPage} from "../info/info";


@IonicPage()
@Component({
  selector: 'page-fav',
  templateUrl: 'fav.html',
})
export class FavPage {

  contacts:any;

  constructor(public navCtrl: NavController, public dataService:DataProvider, public alertCtrl:AlertController, public toastCtrl:ToastController) {
    this.contacts = this.dataService.contactList;

  }
  
//   ionViewDidLoad() {
//     this.dataService.sortNames()
// }




  deleteContact(contact) {
    let confirm = this.alertCtrl.create({
      title: 'Delete ' + contact.firstName + ' ' + contact.lastName + '?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('delete canceled');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.dataService.deleteContact(contact.id);
            console.log('contact deleted');
            let toast = this.toastCtrl.create({
              message: 'Contact removed',
              duration: 3000
            });
            toast.present();
          }
        }
      ]
    });
    confirm.present();
  }

  editContact(contact) {
    let prompt = this.alertCtrl.create({
      title: 'Edit contact',
      inputs: [
        {
          name: 'firstName',
          value: contact.firstName
        },
        {
          name: 'lastName',
          value: contact.lastName
        },
        {
          name: 'number',
          value: contact.number
        },
        {
          name: 'email',
          value: contact.email
        },
        {
          name: 'image',
          value: contact.image
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('edit canceled');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.dataService.updateContact(contact.id, data.firstName, data.lastName, data.number, data.email, data.image);
          }
        }
      ]
    });
    prompt.present();
  }



  // newContact():void {
  //   let prompt = this.alertCtrl.create({
  //     title: 'New contact',
  //     inputs: [
  //       {
  //         name: 'firstName',
  //         placeholder: 'First Name'
  //       },
  //       {
  //         name: 'lastName',
  //         placeholder: 'Last Name'
  //       },
  //       {
  //         name: 'number',
  //         placeholder: 'Phone Number'
  //       },
  //       {
  //         name: 'email',
  //         placeholder: 'Email'
  //       },
  //       {
  //         name: 'image',
  //         placeholder: 'Photo URL'
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Save',
  //         handler: data => {
  //           data["favorite"] = false;
  //           this.dataService.addNewContact(data);
  //           console.log('Saved clicked');
  //           let toast = this.toastCtrl.create({
  //             message: 'Contact saved',
  //             duration: 3000
  //           });
  //           toast.present();
  //
  //         }
  //       }
  //     ]
  //   });
  //   prompt.present();
  //
  //
  // }

  viewContact(contact):void {
    this.navCtrl.push(InfoPage, contact);
  }

}
