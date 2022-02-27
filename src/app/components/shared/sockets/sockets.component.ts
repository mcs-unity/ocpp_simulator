import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ISocket } from 'src/app/model/ISocket.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sockets',
  templateUrl: './sockets.component.html',
  styleUrls: ['./sockets.component.scss'],
})
export class SocketsComponent implements OnInit {
  toolTipDelay = environment.toolTipDelay;
  sockets: ISocket[] = [
    { name: 'Socket 1', state: 'Pending' },
    { name: 'Socket 2', state: 'Error' },
    { name: 'Socket 3', state: 'Connected' },
    { name: 'Socket 4', state: 'Connected' },
    { name: 'Socket 5', state: 'Connected' },
  ];
  customOptions: OwlOptions = {
    dots: false,
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
  constructor() {}

  ngOnInit(): void {}
}
