import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Subscription } from 'rxjs';

import { ProductService } from '../../services/product.service';
import { product } from '../../model/product';
@Component({
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
    providers: [ProductService]
})
export class LandingComponent implements OnDestroy,OnInit {

    products: product[]=[];

    responsiveOptions: any[]=[];

    subscription: Subscription;

    darkMode: boolean = false;


    constructor(public router: Router, private layoutService: LayoutService,private proservice:ProductService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(config => {
            this.darkMode = config.colorScheme === 'dark' || config.colorScheme === 'dim' ? true : false;
        });
    }
    ngOnInit(): void {

        this.proservice.getProduct().subscribe((ele)=>{
            console.log(ele)
            this.products = ele as product[];
        })

       

        this.responsiveOptions = [
            {
                breakpoint: '1199px',
                numVisible: 1,
                numScroll: 1
            },
            {
                breakpoint: '991px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 1,
                numScroll: 1
            }
        ];
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
