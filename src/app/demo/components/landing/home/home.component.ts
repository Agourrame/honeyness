import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { product } from 'src/app/demo/model/product';
import { ProductService } from 'src/app/demo/services/product.service';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    TagModule,
    ButtonModule,
    RouterModule,
    SplitButtonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  products:product[]=[];
  responsiveOptions: any[]=[];
  items: MenuItem[]=[];
  constructor(private proservice:ProductService,private router:Router){

  }

  sendId(ID:string) {
    this.router.navigate(['/landing/buy'], { queryParams: { id: ID } });
  }

  ngOnInit(): void {
    this.proservice.getProduct().subscribe((ele)=>{
      console.log(ele)
      this.products = ele as product[];
  })

  this.items = [
       {
        label: 'Franch',
        command: () => {}
       },
       {
        label: 'Arabic',
        command: () => {}
       },
       {
        label: 'English',
        command: () => {}
       }
  ]

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

}
