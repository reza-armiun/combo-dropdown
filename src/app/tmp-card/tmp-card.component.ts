import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Card} from "../model/Card";

@Component({
  selector: 'app-tmp-card',
  templateUrl: './tmp-card.component.html',
  styleUrls: ['./tmp-card.component.css']
})
export class TmpCardComponent implements OnInit {
  @Input() card: Card | undefined;
  constructor(private cd: ChangeDetectorRef) {
    cd.detach();
  }

  ngOnInit(): void {
    console.log('TmpCardComponent ', this.card)
    this.cd.detectChanges();
  }

}
