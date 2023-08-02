export class Staff {
    id: number;
    name: string;
    surname: string;
    phone_number: string;
    email: string;
    password: string;
    c_password:string;
    address: string;
    constructor(staff) {
      {
        this.id = staff.id;
        this.name = staff.name || '';
        this.surname = staff.surname || '';
        this.phone_number = staff.phone_number || '';
        this.email = staff.email || '';
        this.password = staff.password || '';
        this.c_password = staff.c_password || '';
        this.address = staff.address || '';

      }
    }
    public getRandomID(): string {
      const S4 = () => {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return S4() + S4();
    }
  }
  