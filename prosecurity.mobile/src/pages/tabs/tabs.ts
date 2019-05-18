import {Component} from '@angular/core';

import {Home} from '../home/home';
import {Profile} from '../profile/profile';

import {Camera} from '@ionic-native/camera';
import {Messages} from "../messages/messages";
import {App} from "ionic-angular";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  index:number = 1;

  tab1Root = 'Home';
  // tab2Root = Search;
  // tab3Root = null;
  tab4Root = 'Messages';
  tab5Root = 'Profile';

  constructor(private camera: Camera, public app: App) {

  }


  // openCamera() {
    // const options: CameraOptions = {
    //   quality: 100,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE
    // }
    //
    // this.camera.getPicture(options).then((imageData) => {
    //   // imageData is either a base64 encoded string or a file URI
    //   // If it's base64:
    //   let base64Image = 'data:image/jpeg;base64,' + imageData;
    // }, (err) => {
    //   // Handle error
    // });
  // }
}
