import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChargersComponent } from './chargers/chargers.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'chargers' },
  { path: 'chargers', component: ChargersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
