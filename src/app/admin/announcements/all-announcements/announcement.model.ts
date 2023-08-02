export class Announcement {
    id: number;
    title: string;
    text: string;

    constructor(announcement) {
      {
        this.id = announcement.id;
        this.title = announcement.title || '';
        this.text = announcement.text || '';
      }
    }
    public getRandomID(): string {
      const S4 = () => {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return S4() + S4();
    }
  }
