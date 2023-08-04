import { formatDate } from '@angular/common';
export class Students {
  id: number;
  surname: string;
  name: string;
  identity_number: string;
  birth_date: string;
  gender: string;
  email: string;
  class_room_id: string;
  branch_id: string;
  role_id: string;
  phone_number: string;
  address: string;
  password: string;
  c_password: string;
  is_active: number;
  constructor(student) {
    {
      this.id = student.id;
      this.class_room_id = student.class_room_id || '';
      this.branch_id = student.branch_id || '';
      this.name = student.name || '';
      this.surname = student.surname || '';
      this.phone_number = student.phone_number || '';
      this.email = student.email || '';
      this.password = student.password || '';
      this.c_password = student.c_password || '';
      this.identity_number = student.identity_number || '';
      this.gender = student.gender || '';
      this.birth_date = student.birth_date || '';
      this.address = student.address || '';
      this.is_active = student.is_active;
      this.role_id = student.role_id
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
