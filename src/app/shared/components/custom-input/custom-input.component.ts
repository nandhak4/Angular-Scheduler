import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css']
})
export class CustomInputComponent implements OnInit {


  // tslint:disable-next-line: no-input-rename
  @Input('appInputLabelName') labelName: string;

  // tslint:disable-next-line: no-input-rename
  @Input('appDatePlaceholder') dateFormat: string;

  // tslint:disable-next-line: no-input-rename
  @Input('appTimePlaceholder') timeFormat: string;


  public get placeHolder(): string {
    return this.dateFormat || this.timeFormat || '';
  }

  public get showSession(): boolean {
    return this.timeFormat !== null && this.timeFormat !== undefined;
  }


  customInputValue: string;

  updateOnBlur = { standalone: true, updateOn: 'blur' };

  constructor() { }

  ngOnInit() {

  }

}
