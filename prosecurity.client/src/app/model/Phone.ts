export class Phone {
  number: string;
  callCount


  constructor(number: string) {
    this.number = number;
    this.callCount = this.getRandomNum();
  }

  getRandomNum() {
    return Math.floor(Math.random() * 15) + 1;
  }
}