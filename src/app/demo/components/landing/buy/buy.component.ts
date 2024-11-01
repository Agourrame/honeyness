import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { firstValueFrom } from 'rxjs';
import { product } from 'src/app/demo/model/product';
import { ProductService } from 'src/app/demo/services/product.service';

@Component({
  selector: 'app-buy',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    CheckboxModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    RippleModule,
    InputGroupModule,
    InputGroupAddonModule
  ],
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.scss'
})

export class BuyComponent implements OnInit{

  receivedId: string | null = null;
  productSelected:product={};

  constructor(private proservice:ProductService,private router:Router,private route: ActivatedRoute,private viewportScroller: ViewportScroller){

  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      
      this.receivedId = params['id'];
      console.log('Received ID:', this.receivedId);
      this.viewportScroller.scrollToPosition([0, 0]);
      if(this.receivedId){
        this.proservice.getProduct().subscribe((ele)=>{
          ele.map((data)=>{
            if(data.id===this.receivedId){
              console.log(data);
              this.productSelected=data;
            }
          })
        })
      }
      
    });
  
  }


  quantities: number[] = [1, 1, 1];

    value: string = '';

    checked: boolean = true;

    checked2: boolean = true;

    cities = [
        { name: 'USA / New York', code: 'NY' },
        { name: 'Italy / Rome', code: 'RM' },
        { name: 'United Kingdoom / London', code: 'LDN' },
        { name: 'Turkey / Istanbul', code: 'IST' },
        { name: 'France / Paris', code: 'PRS' }
    ];

    selectedCity: string = '';
}
