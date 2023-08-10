import { NgModule } from '@angular/core';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { SharedModule } from '../shared.module';
import { DialogformComponent } from './announcementCard/dialogform.component';

@NgModule({
  declarations:[ 
    FileUploadComponent,
    BreadcrumbComponent,
    DialogformComponent
  ],

  imports: [SharedModule],
  exports: [FileUploadComponent, BreadcrumbComponent],
})
export class ComponentsModule {}
