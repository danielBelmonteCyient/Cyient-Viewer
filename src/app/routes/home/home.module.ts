import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import {CommonModule} from '@angular/common';
const routes: Routes = [
    { path: '', component: HomeComponent },
];

@NgModule({
    imports: [
        // BrowserAnimationsModule,
        // MangolModule,
        CommonModule,
        RouterModule.forChild(routes)
    ],
    declarations: [HomeComponent],
    exports: [
        RouterModule
    ]
})
export class HomeModule { }