import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingComponent } from './landing.component';
import { HomeComponent } from './home/home.component';
import { BuyComponent } from './buy/buy.component';

@NgModule({
    imports: [RouterModule.forChild([
        { 
            path: '',
            component: LandingComponent,
            children:[
                { path: '', redirectTo: 'home', pathMatch: 'full' },
                {path:'home', component:HomeComponent},
                {path:'buy', component:BuyComponent}
            ]
        }
    ])],
    exports: [RouterModule]
})
export class LandingRoutingModule { }
