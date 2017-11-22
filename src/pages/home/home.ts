import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Camera} from '@ionic-native/camera';
import {ImagePage} from '../image/image';


@Component({
  selector: 'page-home',
  providers: [Camera],
  templateUrl: 'home.html'
})
export class HomePage {
public base64Image:string;
  constructor(private camera: Camera, public navCtrl: NavController) {

  }

   takePicture(){
    this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 480,
        targetHeight: 640,
        allowEdit: true,
        correctOrientation:true,
        quality:100
    }).then((imageData) => {
    console.log(imageData);
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;

        this.navCtrl.push(ImagePage, {
    image: this.base64Image
});
    }, (err) => {
        console.log(err);
    });
  }

  galleryPicture(){
    this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        targetWidth: 480,
        targetHeight: 640,
        allowEdit: true,
        correctOrientation:true,
        quality:100
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;

             this.navCtrl.push(ImagePage, {
    image: this.base64Image
});

    }, (err) => {
        console.log(err);
    }); 
  }
}
