import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { NavsearchComponent } from './header/navsearch/navsearch.component';
import { UserblockComponent } from './sidebar/userblock/userblock.component';
import { UserblockService } from './sidebar/userblock/userblock.service';
import { FooterComponent } from './footer/footer.component';
import { OffsidebarComponent } from './offsidebar/offsidebar.component';
import { SharedModule } from '../shared/shared.module';
import { ButtonsComponent } from '../routes/elements/buttons/buttons.component';
import { ModalComponent } from './modal/modal.component';



@NgModule({
    imports: [
        SharedModule,
    ],
    providers: [
        UserblockService,
        ButtonsComponent,
    ],
    declarations: [
        LayoutComponent,
        SidebarComponent,
        UserblockComponent,
        HeaderComponent,
        NavsearchComponent,
        FooterComponent,
        OffsidebarComponent,
        ModalComponent
    ],
    exports: [
        LayoutComponent,
        SidebarComponent,
        UserblockComponent,
        HeaderComponent,
        NavsearchComponent,
        FooterComponent,
        OffsidebarComponent,
        ModalComponent
    ]
})
export class LayoutModule { }
