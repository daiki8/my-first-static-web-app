import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Chat {
  message: string;
  isUser: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  message = '';
  chats: Chat[] = [];

  constructor(private http: HttpClient) {}

  onSubmit(event: Event) {
    event.preventDefault();
    if (!this.message.trim()) {
      return;
    }
    const chat: Chat = { message: this.message, isUser: true };
    this.chats.push(chat);
    this.message = '';
    const body = { message: chat.message };
    this.http.post('/api/message', body).subscribe((resp: any) => {
      const chat: Chat = { message: resp.text, isUser: false };
      this.chats.push(chat);
    });
  }
}
