export class Branch {
    id: number;
    class_room_id:number;
    name: string;
    constructor(branch) {
      {
        this.id = branch.id || this.getRandomID();
        this.class_room_id = branch.class_room_id || '';
        this.name = branch.name || '';
      }
    }
    public getRandomID(): string {
      const S4 = () => {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return S4() + S4();
    }
  }
  