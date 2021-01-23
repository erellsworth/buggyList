import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
        children: [
            {
                path: 'dashboard',
                loadChildren: () =>
                    import('../pages/dashboard/dashboard.module').then(m => m.DashboardPageModule)
            },
            {
                path: 'lists',
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import('../pages/lists/lists.module').then(m => m.ListsPageModule)
                    }
                ]
            },
            {
                path: 'lists/:id',
                loadChildren: () => import('../pages/list/list.module').then(m => m.ListPageModule)
            },
            {
                path: '',
                redirectTo: '/tabs/dashboard',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/dashboard',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabsPageRoutingModule { }
