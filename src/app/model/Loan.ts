

export class Loan  {
   private _id: number;
   private _iban: number;
   private _price: number;
   private _monthes: number;
   private _description: string;


  constructor(id: number, ibn: number, price: number, monthes: number, description: string) {
    this._id = id;
    this._iban = ibn;
    this._price = price;
    this._monthes = monthes;
    this._description = description;
  }


  getValue() {
    return this.iban;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get iban(): number {
    return this._iban;
  }

  set iban(value: number) {
    this._iban = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

  get monthes(): number {
    return this._monthes;
  }

  set monthes(value: number) {
    this._monthes = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }
}
