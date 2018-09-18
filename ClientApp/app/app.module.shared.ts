import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
// import { HomeComponent } from './components/home/home.component';
// import { FetchDataComponent } from './components/fetchdata/fetchdata.component';


import { AppCommonModule } from './common/common.module';
import { SearchComponent } from './components/search/search.component';
// import { FetchDataDonaComponent } from './components/fetchdatadona/fetchdatadona.component';
import { GalleryComponent } from './components/gallery/gallery.component';


@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        SearchComponent,
        // FetchDataComponent,
        // HomeComponent,
        // FetchDataDonaComponent,
        GalleryComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'search', pathMatch: 'full' },
            // { path: 'home', component: HomeComponent },
            { path: 'search', component: SearchComponent },
            // { path: 'fetch-data', component: FetchDataComponent },
            // { path: 'fetch-data-dona', component: FetchDataDonaComponent },
            { path: 'gallery', component: GalleryComponent },
            { path: '**', redirectTo: 'home' }
        ]),
        AppCommonModule
    ]
})
export class AppModuleShared {

}
