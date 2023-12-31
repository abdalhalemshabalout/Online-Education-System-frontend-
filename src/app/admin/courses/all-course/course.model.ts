export class Course {
  id: number;
  class_room_id: string;
  className: string;
  branch_id: string;
  branchName: string;
  name: string;
  code: string;
  timer: number;
  detaily: string;

  constructor(course) {
    {
      this.id             = course.id;
      this.class_room_id  = course.class_room_id || '';
      this.branch_id      = course.branch_id || '';
      this.name           = course.name || '';
      this.code           = course.code || '';
      this.timer          = course.timer || '';
      this.detaily        = course.detaily || '';
    }
  }
}
