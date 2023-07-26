export class Announcement {
    id: number;
    liderId: string;
    head: string;
    body: string;

    constructor(announcement) {
      {
        this.id = announcement.id || this.getRandomID();
        this.liderId = announcement.liderId || '';
        this.head = announcement.head || '';
        this.body = announcement.body || '';
      }
    }
    public getRandomID(): string {
      const S4 = () => {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return S4() + S4();
    }
  }
