import { Component } from '@angular/core';
import { ChatService } from './service/chatservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'src';
  message: any;

  constructor(private chatService: ChatService) {
    this.chatService.message.subscribe((resp) => {
      this.message = resp;
    });
  }

  sendMsg() {
    this.chatService.message.next({
      author: 'nasar Eddaoui',
      message: "hello it's me",
    });
  }
}
