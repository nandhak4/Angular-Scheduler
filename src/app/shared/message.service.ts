import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message } from './schedule.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  private messageSource = new BehaviorSubject<Message>(null);
  public $messageSource = this.messageSource.asObservable();

  public showErrorMessage = (message: Message): void => this.messageSource.next(message);

  public clearErrorMessage = (key: string): void => this.messageSource.next({ key, value: [] });

  public clearAllErrorMessages = (): void => this.clearErrorMessage('ALL');
}

