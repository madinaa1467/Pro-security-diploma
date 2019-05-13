import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {ImagePickerProvider} from "../../providers";
import {ActionSheetController, Platform, ToastController} from "ionic-angular";
import {Camera, CameraOptions, MediaType, PictureSourceType} from "@ionic-native/camera";
import {Crop} from "@ionic-native/crop";
import {FilePath} from "@ionic-native/file-path";
import {File as NativeFile, FileEntry} from "@ionic-native/file";

@Component({
  selector: 'image-picker',
  templateUrl: 'image-picker.html'
})
export class ImagePickerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() placeholder: string = 'assets/src/unknown.png';
  @Input() fileId: string;

  fileInput: HTMLElement;

  chosenPicture: any;
  tmpFile: any;
  tmpFileId: string;
  correctPath: string;
  currentName: string;

  constructor(private imgProvider: ImagePickerProvider,
              private toastCtrl: ToastController,
              private actionSheetCtrl: ActionSheetController,
              private camera: Camera,
              private cropService: Crop,
              private platform: Platform,
              private filePath: FilePath,
              private file: NativeFile,) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const fileId: SimpleChange = changes.fileId;

    if (!fileId.firstChange && fileId.currentValue != fileId.previousValue) {
      this.imgProvider.getFileById(this.fileId).then(res => {
        this.chosenPicture = res;
      }).catch(error => {
        this.presentToast("Error while loading picture.");
        console.error(error);
      });
    }

  }

  ngOnInit(): void {
    this.fileInput = document.getElementById("fileInput") as HTMLElement;
  }

  ngOnDestroy(): void {
    this.clearFile();
  }

  private clearFile() {
    this.tmpFile = null;
    this.tmpFileId = null;
  }


  changePhoto() {

    const actionSheet = this.actionSheetCtrl.create({
      enableBackdropDismiss: true,
      title: 'Select Image source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Remove',
          handler: () => {
            this.removeFile();

          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    actionSheet.present();
  }

  private takePicture(sourceType: PictureSourceType) {
    if (!this.imgProvider.isApp) {
      this.fileInput.click();
      return;
    }

    var options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
    if (sourceType != PictureSourceType.CAMERA) options.mediaType = MediaType.PICTURE;

    this.camera.getPicture(options).then(imagePath => {
      this.cropService.crop(imagePath, {quality: 75}).then(newImg => {
        console.log("imagePath:", imagePath);
        this.chosenPicture = newImg;

        if (this.platform.is('android') && sourceType === PictureSourceType.PHOTOLIBRARY) {
          this.filePath.resolveNativePath(imagePath).then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.removeOldFile(correctPath, currentName);
          });
        } else {
          let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
          this.removeOldFile(correctPath, currentName);
        }
      });
    });
  }

  private removeOldFile (path: string, name: string) {
    this.file.removeFile(path, name).catch(err => console.error(err));
  }

  photoChanged(files: any) {
    this.tmpFile = files[0];
    this.tmpFileId = null;
    const reader = new FileReader();
    reader.onloadend = () => {
      this.chosenPicture = reader.result;
    };
    reader.readAsDataURL(this.tmpFile);
  }

  presentToast(message: string) {
    const toast = this.toastCtrl.create({
      message: message,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }

  getValue() {
    return new Promise((resolve, reject) => {
      if (this.tmpFileId) {
        resolve(this.tmpFileId);
        return;
      }

      if (!this.imgProvider.isApp) {
        this.upload().then(fileId => {
          resolve(fileId);
        }, err => {
          this.presentToast('Error while uploading file');
          reject(err);
        });

        return;
      }

      this.file.resolveLocalFilesystemUrl(this.chosenPicture).then(entry => {
        (<FileEntry> entry).file(file => {
          this.tmpFile = this.file;
          this.upload().then(fileId => {
            resolve(fileId);
          }, err => {
            this.presentToast('Error while uploading file');
            reject(err);
          });
        });
      });
    });
  }

  private removeFile() {
    this.chosenPicture = null;
    this.clearFile();

    if (this.imgProvider.isApp) {

    }
  }

  private upload (): Promise<string> {
    return this.imgProvider.upload(this.tmpFile).toPromise()
      .then(fileId => {
        this.tmpFile = null;
        this.tmpFileId = fileId;
        return fileId;
      });
  }
}
