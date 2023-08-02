import { Classroom } from "../../classrooms/all-classrooms/classroom.model";

export class Branch {
  id: number;
  class_room_id:string;
  name: string;
  class_room: Classroom;

    constructor(branch) {
      {
        this.id = branch.id;
        this.class_room_id = branch.class_room_id || '';
        this.name = branch.name || '';
        this.class_room = branch.class_room;
      }
    }
    public getRandomID(): string {
      const S4 = () => {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return S4() + S4();
    }
  }
