import {Component, Input, OnDestroy} from '@angular/core';
import {NbLayoutDirection, NbLayoutDirectionService} from '@nebular/theme';
import {MessagingService} from "../../../core/utils";

@Component({
  selector: 'app-layout-direction-switcher',
  template: `
    <app-switcher
      [firstValue]="directions.RTL"
      [secondValue]="directions.LTR"
      [firstValueLabel]="'OFF'"
      [secondValueLabel]="'ON'"
      [value]="currentDirection"
      (valueChange)="toggleDirection($event)"
      [vertical]="vertical"
    >
    </app-switcher>
  `,
})
export class LayoutDirectionSwitcherComponent implements OnDestroy {
  directions = NbLayoutDirection;
  currentDirection: NbLayoutDirection;
  alive = true;

  @Input() vertical: boolean = false;

  constructor(private directionService: NbLayoutDirectionService,
              private messagingService: MessagingService) {
    this.currentDirection = NbLayoutDirection.RTL;//this.directionService.getDirection();

    /*this.directionService.onDirectionChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(newDirection => this.currentDirection = newDirection);*/
  }

  toggleDirection(newDirection) {
    //this.directionService.setDirection(newDirection);
if (NbLayoutDirection.LTR === newDirection) {
      this.messagingService.subscribe("TRACKING")
    } else {
      this.messagingService.unsubscribe("TRACKING")
    }
    console.log('toggleDirection:', newDirection);
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
