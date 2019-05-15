import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {ImageEntry, ImagePickerProvider} from "../../providers";
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

  fileInput: HTMLElement;

  holdChosenPicture: any;
  holdImgFile: any;
  holdImgFileId: string;

  @Input() placeholder: string = 'assets/src/unknown.png';
  @Input() fileId: string;
  chosenPicture: any;

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
      this.holdImgFileId = fileId.currentValue;

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
    this.holdImgFile = null;
    this.holdImgFileId = null;
    this.holdChosenPicture = null;
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
        this.holdImgFileId = null;
        this.holdChosenPicture = newImg;

        this.resolveNativePathWithName(imagePath, sourceType).then((imgEntry: ImageEntry) => {
          return this.removeOldFile(imgEntry.path, imgEntry.name);
        }).catch(err => console.log("err:", err));
      });
    });
  }

  private removeFile() {
    this.chosenPicture = null;
    this.clearFile();

    this.removeCachedFileFromDevice().catch(err => console.error(err));
  }

  private removeCachedFileFromDevice() {
    return new Promise<any>((resolve, reject) => {

      if (this.imgProvider.isApp && !!this.fileId) {
        let fileName = this.imgProvider.fileNameByFileId(this.fileId)
        this.removeOldFile(this.file.dataDirectory, fileName)
          .then(res => {

            /*this.file.listDir(this.file.dataDirectory, "").then(list => {
              console.log("list:", list)
              for (let file of list) {
                if (file.isFile) {
                  this.removeOldFile(this.file.dataDirectory, file.name).then()
                }
              }
              resolve(res);
            });*/

            resolve(res);

          }, err => reject(err));
        return;
      }

      resolve();
    });
  }

  private removeOldFile (path: string, name: string) {
    return this.file.removeFile(path, name).catch(err => console.error(err));
  }

  photoChanged(files: any) {
    this.holdImgFile = files[0];
    this.holdImgFileId = null;
    const reader = new FileReader();
    reader.onloadend = () => {
      this.holdChosenPicture = reader.result;
    };
    reader.readAsDataURL(this.holdImgFile);
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
      /*if (!this.holdChosenPicture) {
        resolve(this.holdImgFileId);
        return;
      }*/

      if (this.holdImgFileId || !this.holdChosenPicture) {
        resolve(this.holdImgFileId);
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

      this.file.resolveLocalFilesystemUrl(this.holdChosenPicture).then(entry => {
        (<FileEntry> entry).file(file => {
          this.holdImgFile = file;
          this.upload().then(fileId => {
            return this.resolveNativePathWithName(this.holdChosenPicture).then((imgEntry: ImageEntry) => {
              let fileName = this.imgProvider.fileNameByFileId(fileId);
              return this.imgProvider.copyFileToLocalDir(imgEntry.path, imgEntry.name, fileName).then(img => {
                this.holdChosenPicture = img;
                resolve(fileId);
              });
            })
          }, err => {
            this.presentToast('Error while uploading file');
            reject(err);
          });
        });
      });
    });
  }

  private upload (): Promise<string> {
    return this.imgProvider.upload(this.holdImgFile).toPromise()
      .then(fileId => {
        this.holdImgFile = null;

        this.holdImgFileId = fileId;

        return this.removeCachedFileFromDevice().then(res => {
          return fileId;
        });
      });
  }

  private resolveNativePathWithName(imagePath: string, sourceType?: PictureSourceType): Promise<ImageEntry> {
    return new Promise<ImageEntry>((resolve, reject) => {
      if (this.platform.is('android') && (sourceType === PictureSourceType.PHOTOLIBRARY || !sourceType)) {
        this.filePath.resolveNativePath(imagePath).then(filePath => {
          let path = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let name = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));

          resolve({path: path, name: name});
        }).catch(err => reject(err));
      } else {
        let path = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        let name = imagePath.substr(imagePath.lastIndexOf('/') + 1);

        resolve({path: path, name: name});
      }
    });
  }
}
