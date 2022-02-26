import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
})
export class TerminalComponent implements OnInit {
  state = 'Pending';
  response = [
    {
      id: '0001',
      type: 'donut',
      name: 'Cake',
      image: { url: 'images/0001.jpg', width: 200, height: 200 },
      thumbnail: { url: 'images/thumbnails/0001.jpg', width: 32, height: 32 },
    },
    {
      id: '0001',
      type: 'donut',
      name: 'Cake',
      image: { url: 'images/0001.jpg', width: 200, height: 200 },
      thumbnail: { url: 'images/thumbnails/0001.jpg', width: 32, height: 32 },
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
