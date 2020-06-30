import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
    AngularFireAuthGuard,
    redirectLoggedInTo,
    redirectUnauthorizedTo
} from '@angular/fire/auth-guard';

const redirectLoggedIn = () => redirectLoggedInTo(['']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
    {
        path: '',
        redirectTo: 'tabs',
        pathMatch: 'full'
    },
    {
        path: 'tabs',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    },
    {
        path: 'tabs',
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin },
        children: [
            {
                path: 'lists',
                loadChildren: () => import('./pages/lists/lists.module').then(m => m.ListsPageModule)
            },
            {
                path: 'categories',
                loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesPageModule)
            },
            {
                path: 'list/:id',
                loadChildren: () => import('./pages/list/list.module').then(m => m.ListPageModule)
            },
        ]
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
        data: { authGuardPipe: redirectLoggedIn },
    }
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
