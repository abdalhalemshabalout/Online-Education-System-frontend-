export class Course {
  id: number;
  facultyId: string;
  departmentId: string;
  classId: number;
  lessonName: string;
  lessonCode: string;
  lessonTime:string;
  akts: string;
  kredi: string;
  detaily: string;
  constructor(course) {
    {
      this.id = course.id || this.getRandomID();
      this.facultyId = course.facultyId || '';
      this.departmentId = course.departmentId || '';
      this.classId = course.className || '';
      this.lessonTime = course.lessonTime || '';
      this.lessonName = course.lessonName || '';
      this.lessonCode = course.lessonCode || '';
      this.akts = course.akts || '';
      this.kredi = course.kredi || '';
      this.detaily = course.detaily || '';

    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
