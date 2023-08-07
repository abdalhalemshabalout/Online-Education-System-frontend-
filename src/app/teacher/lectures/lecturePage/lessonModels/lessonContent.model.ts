import { DOCUMENT } from '@angular/common';
export class LessonContent {
  id: number;
  lesson_id: string;
  lessonName: string;
  title: string;
  text: string;
  document: Document;
  created_at: Date;
  updated_at: Date;
  constructor(lessonContent) {
    {
      this.id = lessonContent.id;
      this.lesson_id = lessonContent.lesson_id;
      this.lessonName = lessonContent.lessonName || "";
      this.title = lessonContent.title || "";
      this.text = lessonContent.text || "";
      this.document = lessonContent.document || new Document();
      this.created_at = lessonContent.created_at || new Date();
      this.updated_at = lessonContent.updated_at || new Date();
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
