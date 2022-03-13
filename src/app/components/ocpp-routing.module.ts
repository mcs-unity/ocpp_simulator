import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { HistoryComponent } from './history/history.component';
import { MainComponent } from './main/main.component';
import { TestStationComponent } from './test-station/test-station.component';

const routes: Routes = [
  {
    path: 'ocpp',
    component: MainComponent,
    children: [
      { path: 'station', component: TestStationComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'settings', component: SettingsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OCPPRoutingModule {}
