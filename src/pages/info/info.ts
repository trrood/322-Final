import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, ToastController} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";
import {HomePage} from "../home/home";

/**
 * Generated class for the InfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {
  
  contactInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl:AlertController, public dataService:DataProvider, public toastCtrl:ToastController) {
    this.contactInfo = this.navParams.data;

  }



  ionViewDidLoad() {

    var favMessage = "";
    if (this.contactInfo.favorite) {
      favMessage = 'Remove from favorites'
    }
    else {
      favMessage = 'Add to favorites'
    }

    document.getElementById("favButton").innerHTML = favMessage;

  }

  // editContact(contact) {
  //   let prompt = this.alertCtrl.create({
  //     title: 'Edit contact',
  //     inputs: [
  //       {
  //         name: 'firstName',
  //         value: contact.firstName
  //       },
  //       {
  //         name: 'lastName',
  //         value: contact.lastName
  //       },
  //       {
  //         name: 'number',
  //         value: contact.number
  //       },
  //       {
  //         name: 'email',
  //         value: contact.email
  //       },
  //       {
  //         name: 'image',
  //         value: contact.image
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //           console.log('edit canceled');
  //         }
  //       },
  //       {
  //         text: 'Save',
  //         handler: data => {
  //           var favMessage = "";
  //           if (contact.favorite) {
  //             contact.favorite = false;
  //             favMessage = 'Add to favorites'
  //           }
  //           else {
  //             contact.favorite = true;
  //             favMessage = 'Remove from favorites'
  //           }
  //           this.dataService.updateContact(contact.id, data.firstName, data.lastName, data.number, data.email, data.image);
  //           document.getElementById("favButton").innerHTML = favMessage;
  //           this.navCtrl.push(HomePage);
  //           let toast = this.toastCtrl.create({
  //             message: 'Contact updated',
  //             duration: 3000
  //           });
  //           toast.present();
  //         }
  //       }
  //     ]
  //   });
  //   prompt.present();
  // }

  addFavorite(contact) {
    var title = "";
    var buttonText = "";
    if (contact.favorite) {
      title = 'Remove ' + contact.firstName + ' ' + contact.lastName + ' from favorites?';
      buttonText = "Remove"
    }
    else {
      title = 'Add ' + contact.firstName + ' ' + contact.lastName + ' to favorites?';
      buttonText = "Add"
    }

    let confirm = this.alertCtrl.create({
      title: title,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Fav canceled');
          }
        },
        {
          text: buttonText,
          handler: () => {
            console.log('Agree clicked');
            var favMessage = "";
            if (contact.favorite) {
              contact.favorite = false;
              favMessage = 'Add to favorites'
            }
            else {
              contact.favorite = true;
              favMessage = 'Remove from favorites'
            }
            this.dataService.updateFavorite(contact.id, contact.favorite);

            document.getElementById("favButton").innerHTML = favMessage;
          }

        }
      ]
    });
    confirm.present();
  }

}
