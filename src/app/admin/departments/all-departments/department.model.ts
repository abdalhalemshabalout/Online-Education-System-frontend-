export class Department {
  id: number;
  name: string;
  hod: string;
  facultyId: number;
  telephone: string;
  email: string;
  startDate: string;
  studentCapacity: string;
  acId: number;
  code: string;
  details: string;
  constructor(department) {
    {
      this.id = department.id || this.getRandomID();
      this.name = department.name || '';
      this.hod = department.hod || '';
      this.telephone = department.telephone || '';
      this.email = department.email || '';
      this.startDate = department.startDate || '';
      this.studentCapacity = department.studentCapacity || '';
      this.facultyId = department.facultyId;
      this.acId = department.acId || '';
      this.code = department.code || '';
      this.details = department.details || '';

    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
