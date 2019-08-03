import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'src/app/shared/message.service';
import { Message } from '../../schedule.model';

@Component({
  selector: 'app-display-message',
  templateUrl: './display-message.component.html',
  styleUrls: ['./display-message.component.css']
})
export class DisplayMessageComponent implements OnInit {

  @Input() messages: string[] = [];

  @Input() key: string;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.$messageSource.subscribe((message: Message) => {

      if (message && message.key === this.key) {
        this.messages = message.value;
      }
    });
  }

}
