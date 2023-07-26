import { formatDate } from '@angular/common';
export class Teachers {
  id: number;
  img: string;
  name: string;
  surname: string;
  fatherName: string;
  motherName: string;
  identityNumber: string;
  countryId: string;
  placeOfBirth: string;
  birthDate: string;
  gender: string;
  email: string;
  departmentGraduated:string;
  startDate: string;
  telephone: string;
  department: string;
  password:string;
  c_password:string;
  address: string;
  facultyId: string;
  departmentId: string;
  constructor(teachers) {
    {
      this.id = teachers.id || this.getRandomID();
      this.img = teachers.img || '';
      this.name = teachers.name || '';
      this.surname = teachers.surname || '';
      this.fatherName = teachers.fatherName || '';
      this.motherName = teachers.motherName || '';
      this.identityNumber = teachers.identityNumber || '';
      this.countryId = teachers.countryId || '';
      this.gender = teachers.gender || '';
      this.email = teachers.email || '';
      this.departmentGraduated = teachers.departmentGraduated || '';
      this.startDate = teachers.startDate, formatDate(new Date(), 'yyyy-MM-dd', 'en') || '' ;
      this.telephone = teachers.telephone || '';
      this.address = teachers.address || '';
      this.facultyId = teachers.facultyId || '';
      this.departmentId = teachers.departmentId || '';
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
