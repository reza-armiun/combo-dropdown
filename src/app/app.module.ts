import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoanComponent } from './loan/loan.component';
import { DepositComponent } from './deposit/deposit.component';
import { CardComponent } from './card/card.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { FilterPipe } from './filter.pipe';
import { ComboEntityDirective } from './combo-entity.directive';
import { SearchInputComponent } from './search-input/search-input.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DropdownSegmentComponent } from './dropdown/dropdown-segment/dropdown-segment.component';
import { DropdownSegmentsWrapperComponent } from './dropdown/dropdown-segments-wrapper/dropdown-segments-wrapper.component';
import { TmpCardComponent } from './tmp-card/tmp-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoanComponent,
    DepositComponent,
    CardComponent,
    DropdownComponent,
    FilterPipe,
    ComboEntityDirective,
    SearchInputComponent,
    DropdownSegmentComponent,
    DropdownSegmentsWrapperComponent,
    TmpCardComponent,
  ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
