import {Type} from "@angular/core";


export class Card  {
  private _id: number;
  private _imageUrl: string;
  private _cardNumber: number;
  private _placeholder: string;
  private _cvv2: number;
  private _expireAt: Date;
  // public __type?: Type<any>;


  constructor(id: number, imageUrl: string, cardNumber: number, placeholder: string, cvv2: number, expireAt: Date) {
    this._id = id;
    this._imageUrl = imageUrl;
    this._cardNumber = cardNumber;
    this._placeholder = placeholder;
    this._cvv2 = cvv2;
    this._expireAt = expireAt;
  }


  get imageUrl(): string  {
    return this._imageUrl;
  }

  set imageUrl(value: string) {
    this._imageUrl = value;
  }

  getValue() {
    return this._cardNumber;
  }


  set id(value: number) {
    this._id = value;
  }

  set cardNumber(value: number) {
    this._cardNumber = value;
  }

  set placeholder(value: string) {
    this._placeholder = value;
  }

  set cvv2(value: number) {
    this._cvv2 = value;
  }

  set expireAt(value: Date) {
    this._expireAt = value;
  }

  get id(): number {
    return this._id;
  }

  get cardNumber(): number {
    return this._cardNumber;
  }

  get placeholder(): string {
    return this._placeholder;
  }

  get cvv2(): number {
    return this._cvv2;
  }

  get expireAt(): Date {
    return this._expireAt;
  }
}
