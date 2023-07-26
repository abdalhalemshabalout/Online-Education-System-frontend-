import { NgModule } from '@angular/core';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { SharedModule } from '../shared.module';
import { DialogformComponent } from './announcementCard/dialogform.component';
import { ExamformComponent } from './examCard/examform.component';
import { HomeworkformComponent } from './homeworkCard/homeworkform.component';
import { ExamfinishformComponent } from './examFinishCard/exam-finished.component';
import { generalquestionformComponent } from './generalQuestionCard/generalquestionform.component';
import { questionformComponent } from './questionCard/questionform.component';


@NgModule({
  declarations:[ 
    FileUploadComponent,
    BreadcrumbComponent,
    DialogformComponent,
    ExamformComponent,
    ExamfinishformComponent,
    generalquestionformComponent,
    questionformComponent,
    HomeworkformComponent
  ],

  imports: [SharedModule],
  exports: [FileUploadComponent, BreadcrumbComponent],
})
export class ComponentsModule {}
