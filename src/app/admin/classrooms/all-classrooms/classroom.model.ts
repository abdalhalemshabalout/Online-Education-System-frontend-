export class Classroom {
    id: number;
    name: string;
    constructor(classroom) {
      {
        this.id = classroom.id || this.getRandomID();
        this.name = classroom.name || '';
      }
    }
    public getRandomID(): string {
      const S4 = () => {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return S4() + S4();
    }
  }
  