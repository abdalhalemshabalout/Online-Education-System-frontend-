
export class Homework {
    id: number;
    lessonId: string;
    lessonName:string;
    name: string;
    document: number;
    description: string;
    startDate: string;
    endDate:string;

    constructor(homework) {
      {
        this.id = homework.id || this.getRandomID();
        this.lessonId = homework.lessonId || '';
        this.lessonName = homework.lessonName || '';
        this.name = homework.name || '';
        this.document = homework.document || '';
        this.description = homework.description || '';
        this.startDate = homework.startDate || '';
        this.endDate = homework.endDate || '';
      }
    }
    public getRandomID(): string {
      const S4 = () => {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return S4() + S4();
    }
}
