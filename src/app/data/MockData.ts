import {Deposit} from "../model/Deposit";
import {Card} from "../model/Card";
import {Loan} from "../model/Loan";

export const DEPOSIT_DATA = [
  new Deposit(1, 23131231534356,40000, 'first-name1', 'last-name1'),
  new Deposit(2, 41814849844844,20000, 'first-name2', 'last-name2'),
  new Deposit(3, 55518114949848,45000, 'first-name3', 'last-name3'),
];

export const CARD_DATA = [
  new Card(4, 147812418412, 'placeholder1', 123, new Date()),
  new Card(5, 448484894848, 'placeholder2', 124, new Date()),
  new Card(6, 231231231231, 'placeholder3', 125, new Date()),
];

export const LOAN_DATA = [
  new Loan(7, 2313124504214, 322323, 22, 'description1'),
  new Loan(8, 4458155544554, 444444, 24, 'description2'),
  new Loan(9, 4555222220000, 454548, 25, 'description3'),
];
