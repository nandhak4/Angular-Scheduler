import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-message',
  templateUrl: './display-message.component.html',
  styleUrls: ['./display-message.component.css']
})
export class DisplayMessageComponent implements OnInit {

  @Input() messages: string[];

  constructor() { }

  ngOnInit() {
  }

}
