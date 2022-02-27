import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { TestStationComponent } from './test-station/test-station.component';

const routes: Routes = [
  {
    path: 'ocpp',
    component: MainComponent,
    children: [
      { path: 'station', component: TestStationComponent },
      { path: 'history', component: TestStationComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OCPPRoutingModule {}
