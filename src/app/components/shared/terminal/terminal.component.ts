import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
})
export class TerminalComponent implements OnInit {
  toolTipDelay = environment.toolTipDelay;
  state = 'Pending';
  response = [];
  constructor() {}

  ngOnInit(): void {}
}
