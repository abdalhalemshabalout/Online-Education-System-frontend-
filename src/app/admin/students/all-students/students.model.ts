import { formatDate } from '@angular/common';
export class Students {
  id: number;
  facultyId:string;
  departmentId: string;
  classId: string;
  countryId: string;
  img: string;
  name: string;
  surname: string;
  telephone: string;
  email: string;
  identityNumber: string;
  fatherName: string;
  motherName: string;
  gender: string;
  placeOfBirth: string;
  birthDate: string;
  address: string;
  startDate: string;
  password: string;
  c_password: string;
  constructor(students) {
    {
      this.id = students.id || '';
      this.facultyId = students.facultyId || '';
      this.departmentId = students.departmentId || '';
      this.classId = students.classId || '';
      this.img = students.img || '';
      this.name = students.name || '';
      this.surname = students.surname || '';
      this.telephone = students.telephone || '';
      this.email = students.email || '';
      this.identityNumber = students.identityNumber || '';
      this.countryId = students.countryId || '';
      this.fatherName = students.fatherName || '';
      this.motherName = students.motherName || '';
      this.gender = students.gender || '';
      this.placeOfBirth = students.placeOfBirth || '';
      this.address = students.address || '';
      this.startDate = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.birthDate= formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.password = students.password || '';
      this.c_password = students.c_password || '';
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
