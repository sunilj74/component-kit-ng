import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DatatableComponent } from './datatable/datatable.component';
import { TreeComponent } from './tree/tree.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'datatable',
        component: DatatableComponent
      },
      {
        path: 'tree',
        component: TreeComponent
      },
      {
        path: '',
        redirectTo: 'datatable',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'builder',
    loadChildren: () => import('./component-builder/component-builder.module').then(m => m.ComponentBuilderModule)
  },
  {
    path: '**',
    redirectTo: '/home/datatable',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
