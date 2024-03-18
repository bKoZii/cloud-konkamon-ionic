import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'project',
    loadChildren: () =>
      import('./project/project.module').then((m) => m.ProjectPageModule),
  },
  {
    path: 'member',
    loadChildren: () =>
      import('./member/member.module').then((m) => m.MemberPageModule),
  },
  {
    path: 'member-detail/:id',
    loadChildren: () =>
      import('./member-detail/member-detail.module').then(
        (m) => m.MemberDetailPageModule
      ),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
