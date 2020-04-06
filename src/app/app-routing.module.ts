import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Page404Component } from './components/page404/page404.component';
import { RamComponent } from './components/ram/ram.component';
import { ProcComponent } from './components/proc/proc.component';
import { CpuComponent } from './components/cpu/cpu.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'ram', component: RamComponent},
  {path: 'procesos', component: ProcComponent},
  {path: 'cpu', component: CpuComponent},

  {path: '**', component: Page404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
