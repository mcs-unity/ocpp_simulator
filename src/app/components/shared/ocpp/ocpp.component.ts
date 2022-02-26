import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ocpp',
  templateUrl: './ocpp.component.html',
  styleUrls: ['./ocpp.component.scss'],
})
export class OcppComponent implements OnInit {
  toolTipDelay = environment.toolTipDelay;
  constructor() {}

  ngOnInit(): void {}
}
