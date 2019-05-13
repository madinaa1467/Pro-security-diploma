import {Injectable} from '@angular/core';
import {normalizeURL, Platform} from "ionic-angular";
import {File as NativeFile} from "@ionic-native/file";
import {FileProvider} from "../";
import {PictureSourceType} from "@ionic-native/camera";
import {FilePath} from "@ionic-native/file-path";

export class LocalFileSystem {
  constructor(public path: string, public name: string) {
  }
}

@Injectable()
export class ImagePickerProvider {

  isApp: boolean = false;

  constructor(private platform: Platform,
              private fileProvider: FileProvider,
              private file: NativeFile,
              private filePath: FilePath,) {

    this.platform.ready().then(() => {
      if (this.platform.is('core') || this.platform.is('mobileweb')) {
        this.isApp = false;
      } else {
        this.isApp = true;
      }
    });
  }

  upload(file: any) {
    return this.fileProvider.upload(file);
  }

  getFileById(fileId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!fileId) {
        resolve(null);
        return
      }

      if (!this.isApp) {
        this.fileProvider.load(fileId).then(res => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(res);
        }).catch(error => reject(error));
        return;
      }

      let fileName = fileId + ".jpg";

      this.file.checkFile(this.file.dataDirectory, fileName).then(res => {
        console.log("load file from device");
        resolve(this.pathForImage(this.file.dataDirectory + fileName));
        return;
      }).catch(res => {
        this.fileProvider.load(fileId).then((fileFromServer) => {
          this.file.writeFile(this.file.dataDirectory, fileName, fileFromServer, {replace: true}).then(res => {
            console.log("load from remote save to device");
            resolve(this.pathForImage(this.file.dataDirectory + fileName));
          });
        });
      });
    });
  }


  resolveLocalFilesystemUrl(sourceType: PictureSourceType, imagePath: string, newImg: string): Promise<LocalFileSystem> {

    let correctPath, toDelete, currentName;

    if (this.platform.is('android') && sourceType === PictureSourceType.PHOTOLIBRARY) {
      return this.filePath.resolveNativePath(newImg)
        .then(filePath => {
          correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          toDelete = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
          currentName = newImg.substring(newImg.lastIndexOf('/') + 1, newImg.lastIndexOf('?'));
          //this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          return this.file.removeFile(correctPath, toDelete).then(res => {
            return new LocalFileSystem(correctPath, currentName);
          });
        });
    } else {
      correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      toDelete = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      currentName = newImg.substr(newImg.lastIndexOf('/') + 1, newImg.lastIndexOf('?'));
      //this.copyFileToLocalDir(correctPath, currentName, this.createFileName());

      return this.file.removeFile(correctPath, toDelete).then(res => {
        return new LocalFileSystem(correctPath, currentName);
      });
    }

    /*return this.file.resolveLocalFilesystemUrl(imagePath).then(entry => {
      let file: any;
      (<FileEntry> entry).file(fileEntry => file = fileEntry);
    });*/
  }

  copyFileToLocalDir(namePath, currentName, newFileName) {
    return this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
      console.log("namePath:", namePath, "currentName:", currentName, "this.file.dataDirectory", this.file.dataDirectory, "newFileName:", newFileName);

      return this.pathForImage(this.file.dataDirectory + newFileName)
    });
  }

  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = normalizeURL(img)
      return converted;
    }
  }
}
