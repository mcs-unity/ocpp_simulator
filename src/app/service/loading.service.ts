import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loading = new Subject<boolean>();
  $isLoading = this.loading.asObservable();

  public isLoading(): void {
    this.loading.next(true);
  }

  public stopLoading(): void {
    this.loading.next(false);
  }
}
