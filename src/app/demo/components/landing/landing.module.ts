import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigModule } from 'src/app/layout/config/app.config.module';
import { AnimateEnterDirective } from './animateenter.directive'; 
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Carousel } from 'primeng/carousel';
import { MultiSelectModule } from 'primeng/multiselect';
import { Slider, SliderModule } from 'primeng/slider';
import { Card, CardModule } from 'primeng/card';
@NgModule({
    imports: [
        CommonModule,
        LandingRoutingModule,
        ButtonModule,
        RouterModule,
        StyleClassModule,
        AppConfigModule,
        CarouselModule,
        TagModule,
        ReactiveFormsModule,
        FormsModule,
        MultiSelectModule,
        SliderModule,
        CardModule
    ],
    declarations: [LandingComponent, AnimateEnterDirective]
})
export class LandingModule { }
