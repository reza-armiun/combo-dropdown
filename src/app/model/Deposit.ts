

export class Deposit {
  private _id: number;
  private _iban: number;
  private _credit: number;
  private _firstName: string;
  private _lastName: string;

  constructor(id: number, ibn: number, credit: number, firstName: string, lastName: string) {
    this._id = id;
    this._iban = ibn;
    this._credit = credit;
    this._firstName = firstName;
    this._lastName = lastName;
  }




  set id(value: number) {
    this._id = value;
  }

  set iban(value: number) {
    this._iban = value;
  }

  set credit(value: number) {
    this._credit = value;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get id(): number {
    return this._id;
  }

  get iban(): number {
    return this._iban;
  }

  get credit(): number {
    return this._credit;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }



  getValue(): any {
    return this.iban;
  }
}
