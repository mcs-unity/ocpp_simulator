import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/service/loading.service';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
})
export class SplashScreenComponent implements OnInit {
  constructor(private loading: LoadingService) {}

  ngOnInit(): void {
    this.loading.isLoading();
  }
}
