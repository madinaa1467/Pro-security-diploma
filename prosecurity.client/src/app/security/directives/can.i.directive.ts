import {Directive, Input, OnDestroy, TemplateRef, ViewContainerRef} from '@angular/core';
import {takeWhile} from 'rxjs/operators';
import {CanIChecker} from "../services/can.i.checker";


@Directive({selector: '[canI]'})
export class CanIDirective implements OnDestroy {

  private alive = true;
  private hasView = false;

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              private canIChecker: CanIChecker) {
  }

  @Input() set canI(permission: string[]) {

    this.canIChecker.canI(permission)
      .pipe(
        takeWhile(() => this.alive),
      )
      .subscribe((can: boolean) => {
        if (can && !this.hasView) {
          this.viewContainer.createEmbeddedView(this.templateRef);
          this.hasView = true;
        } else if (!can && this.hasView) {
          this.viewContainer.clear();
          this.hasView = false;
        }
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
