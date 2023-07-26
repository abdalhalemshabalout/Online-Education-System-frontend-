export class Dteacher {
    id: number;
    facultyId: string;
    departmentId: string;
    lessonId: number;
    academicianId: string;
    constructor(dteacher) {
      {
        this.id = dteacher.id || this.getRandomID();
        this.facultyId = dteacher.facultyId || '';
        this.departmentId = dteacher.departmentId || '';
        this.lessonId = dteacher.lessonId || '';
        this.academicianId = dteacher.academicianId || '';
      }
    }
    public getRandomID(): string {
      const S4 = () => {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return S4() + S4();
    }
  }
  