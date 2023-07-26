export class Lectures {
  lessonId: number;
  academicianId: number;
  lessonName: string;
  className: string;
  detaily: string;
  lessonTime: string;
  status: string;
  lessonCode: string;
  constructor(lectures) {
    {
      this.lessonId = lectures.lessonId || this.getRandomID();
      this.academicianId = lectures.academicianId || '';
      this.lessonName = lectures.lessonName || '';
      this.className = lectures.className || '';
      this.detaily = lectures.detaily || '';
      this.lessonTime = lectures.lessonTime || '';
      this.lessonCode = lectures.lessonCode || '';
    }
  }ke
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
