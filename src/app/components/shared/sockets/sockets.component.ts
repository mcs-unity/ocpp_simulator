import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sockets',
  templateUrl: './sockets.component.html',
  styleUrls: ['./sockets.component.scss'],
})
export class SocketsComponent implements OnInit {
  toolTipDelay = environment.toolTipDelay;
  constructor() {}

  ngOnInit(): void {}
}
