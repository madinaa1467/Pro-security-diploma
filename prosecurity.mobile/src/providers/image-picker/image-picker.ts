import {Injectable} from '@angular/core';
import {normalizeURL, Platform} from "ionic-angular";
import {File as NativeFile} from "@ionic-native/file";
import {FileProvider} from "../";
import {FilePath} from "@ionic-native/file-path";

export interface ImageEntry {
  path: string;
  name: string;
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

      let fileName = this.fileNameByFileId(fileId);

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

  fileNameByFileId(fileId: string) {
    return fileId + ".jpg";
  }

}
