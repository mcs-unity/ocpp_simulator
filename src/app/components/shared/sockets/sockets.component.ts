import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ISocket } from 'src/app/model/ISocket.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sockets',
  templateUrl: './sockets.component.html',
  styleUrls: ['./sockets.component.scss'],
})
export class SocketsComponent {
  toolTipDelay = environment.toolTipDelay;
  sockets: ISocket[] = [];
  customOptions: OwlOptions = {
    dots: false,
    nav: true,
    navText: ['<', '>'],
    navSpeed: 700,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 3,
      },
    },
  };
  constructor() {
    this.addSocket();
  }

  addSocket() {
    const socket: ISocket = {
      name: `Socket ${this.sockets.length}`,
      state: 'Available',
    };
    this.sockets.push(socket);
  }

  removeSocket(index: number) {
    if (index <= this.sockets.length) this.sockets.splice(index, 1);
  }
}
