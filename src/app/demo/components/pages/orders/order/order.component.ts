import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { order } from 'src/app/demo/model/product';
import { OrderService } from 'src/app/demo/services/order.service';
import { ChipModule } from 'primeng/chip';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { QrCodeModule } from 'ng-qrcode';
@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    ChipModule,
    FormsModule,
    TagModule,
    QrCodeModule
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit{

  receivedID:string='';
  order:order={}

  ngOnInit(): void {
    this.route.queryParams.subscribe((par)=>{
      this.receivedID=par['id'];
      this.orderserv.getOrder().subscribe((ele)=> {
        ele.map((order)=>{
          if(order.id === this.receivedID){
            this.order=order;
          }
        })
      })
    })
  }

  constructor(private route: ActivatedRoute,private orderserv:OrderService){

  }


  confirmation(status:boolean){
     this.orderserv.UpdateConfermation(this.receivedID+'',status);
  }

}
