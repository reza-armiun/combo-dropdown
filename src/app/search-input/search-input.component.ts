import {Component, forwardRef, OnInit, Type} from '@angular/core';
import {SearchService} from "./search.service";

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css'],
  providers: [
    {
      provide: SearchService,
      multi: false,
      useClass: SearchService
    }
  ]
})
export class SearchInputComponent implements OnInit {

  constructor(private searchService: SearchService) {
  }

  ngOnInit(): void {
  }

}
