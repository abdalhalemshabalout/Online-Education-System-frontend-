export class Lectures {
  id: number;
  class_room_id: string;
  ClassName: string;
  branch_id: string;
  BranchName: string;
  name: string;
  code: string;
  timer: number;
  detaily: string;
  created_at: Date;
  updated_at: Date;
  constructor(lectures) {
    {
      this.id = lectures.id;
      this.class_room_id = lectures.class_room_id || 0;
      this.ClassName = lectures.ClassName || "";
      this.branch_id = lectures.branch_id || 0;
      this.BranchName = lectures.BranchName || "";
      this.name = lectures.name || "";
      this.code = lectures.code || "";
      this.timer = lectures.timer || 0;
      this.detaily = lectures.detaily || "";
      this.created_at = lectures.created_at || new Date();
      this.updated_at = lectures.updated_at || new Date();
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
