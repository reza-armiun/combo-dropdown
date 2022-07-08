import { Component } from '@angular/core';
import {FormBuilder, FormControl} from "@angular/forms";
import {CARD_DATA} from "./data/MockData";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'acc-info-dropdown';

  form = this.fb.group({
    // combo: [{value: 147812418412, disabled: true}, []],
    combo: [{value: 147812418412, disabled: false}, []],
    combo2: ['', []]
  })

  constructor(private fb: FormBuilder) {}



}
