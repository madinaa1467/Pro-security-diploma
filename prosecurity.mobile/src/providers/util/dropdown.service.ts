import {Injectable} from "@angular/core";
import {PopoverController} from "ionic-angular";
import {PopoverOptions} from "ionic-angular/components/popover/popover-options";
import {NavOptions} from "ionic-angular/navigation/nav-util";
import {STATUS_POPOVER_PAGE} from "../../pages";
import {DictSimple} from "../../model/dict/dict-simple";

@Injectable()
export class DropdownService {
  constructor(private popoverCtrl: PopoverController) {
  }

  create(config: {
    data: { header?: string, selected: number, items: DictSimple[] },
    opts?: PopoverOptions,
    navOptions?: NavOptions
  }): Promise<any> {

    if (!config.opts) {
      config.opts = {
        cssClass: 'status-popover',
        showBackdrop: true,
        enableBackdropDismiss: true
      }
    }

    return new Promise(resolve => {
      const popover = this.popoverCtrl.create(STATUS_POPOVER_PAGE, config.data, config.opts);

      popover.onDidDismiss(selected => {
        resolve(selected);
      });

      return popover.present(config.navOptions);
    });
  }
}
