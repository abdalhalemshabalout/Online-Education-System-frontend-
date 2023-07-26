export class Dstudent {
    id: number;
    facultyId: string;
    departmentId: string;
    lessonId: number;
    studentId: string;
    constructor(dstudent) {
      {
        this.id = dstudent.id || this.getRandomID();
        this.facultyId = dstudent.facultyId || '';
        this.departmentId = dstudent.departmentId || '';
        this.lessonId = dstudent.lessonId || '';
        this.studentId = dstudent.studentId || '';
      }
    }
    public getRandomID(): string {
      const S4 = () => {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return S4() + S4();
    }
  }
  