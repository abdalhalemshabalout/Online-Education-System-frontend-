import { formatDate } from '@angular/common';
export class Teachers {
  id: number;
  class_room_id: string;
  className: string;
  branch_id: string;
  branchName: string;
  name: string;
  surname: string;
  phone_number: string;
  email: string;
  password:string;
  c_password:string;
  identity_number: string;
  gender: string;
  birth_date: string;
  address: string;
  is_active: number;

  constructor(teachers) {
    {
      this.id = teachers.id || this.getRandomID();
      this.class_room_id = teachers.class_room_id || '';
      this.branch_id = teachers.branch_id || '';
      this.name = teachers.name || '';
      this.surname = teachers.surname || '';
      this.phone_number = teachers.phone_number || '';
      this.email = teachers.email || '';
      this.password = teachers.password || '';
      this.c_password = teachers.c_password || '';
      this.identity_number = teachers.identity_number || '';
      this.gender = teachers.gender || '';
      this.birth_date = teachers.birth_date || '';
      this.address = teachers.address || '';
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
