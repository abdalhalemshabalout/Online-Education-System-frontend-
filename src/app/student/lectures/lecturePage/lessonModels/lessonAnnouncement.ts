import { DOCUMENT } from '@angular/common';
export class LessonAnnouncement {
  id: number;
  lesson_id: string;
  title: string;
  text: string;
  created_at: Date;
  updated_at: Date;
  constructor(lessonAnnouncement) {
    {
      this.id = lessonAnnouncement.id;
      this.lesson_id = lessonAnnouncement.lesson_id;
      this.title = lessonAnnouncement.title || "";
      this.text = lessonAnnouncement.text || "";
      this.created_at = lessonAnnouncement.created_at || new Date();
      this.updated_at = lessonAnnouncement.updated_at || new Date();
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
