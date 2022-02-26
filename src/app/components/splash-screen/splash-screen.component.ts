import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/service/loading.service';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
})
export class SplashScreenComponent {
  constructor(private loading: LoadingService, router: Router) {
    this.loading.isLoading();

    setTimeout(() => {
      router.navigateByUrl('/main');
    }, 3000);
  }
}
