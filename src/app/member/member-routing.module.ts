import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemberPage } from './member.page';

const routes: Routes = [
  {
    path: '',
    component: MemberPage,
  },
  {
    path: 'edit-page',
    loadChildren: () => import('./edit-page/edit-page.module').then( m => m.EditPagePageModule)
  },
  // {
  //   path: 'member-detail/:id',
  //   loadChildren: () =>
  //     import('../member-detail/member-detail.module').then(
  //       (m) => m.MemberDetailPageModule
  //     ),
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemberPageRoutingModule {}
