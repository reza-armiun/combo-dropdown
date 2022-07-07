import { Type} from "@angular/core";


export abstract class ComboEntity {
  abstract getType(): Type<any>;
  abstract getInputName(): string;
  abstract getFilterByValues(): string[];
  abstract getSelectValue(): string;
  abstract getValidationRegex(): string;


}
