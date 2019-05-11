import {NgModule} from '@angular/core';
import {AccordionListComponent} from './accordion-list/accordion-list';
import {IonicModule} from "ionic-angular";
import {ImagePickerComponent} from './image-picker/image-picker';

export const components = [
  AccordionListComponent,
  ImagePickerComponent
];

@NgModule({
  declarations: [components,
  ],
	imports: [IonicModule],
	exports: [components]
})
export class ComponentsModule {}
