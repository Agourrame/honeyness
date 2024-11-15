import { Component, OnInit } from '@angular/core';
import { order, product } from 'src/app/demo/model/product';
import { FormsModule } from '@angular/forms';
import { Table, TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { OrderService } from 'src/app/demo/services/order.service';
import { TagModule } from 'primeng/tag';
import { Router, RouterModule } from '@angular/router';
@Component({
    selector: 'app-orders',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        FileUploadModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        CalendarModule,
        TagModule,
        RouterModule
    ],
    templateUrl: './orders.component.html',
    styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
    orders: order[] = [];
    selectedOrders: order[] = [];
    cols: any[] = [];

    constructor(private orderserv:OrderService,private router:Router){
      this.orderserv.getOrder().subscribe((ele)=>{
        this.orders = ele as order[];
      })
    }

    ngOnInit(): void {

        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' },
        ];
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    showOrder(data:product){
       this.router.navigate(['pages/orders/order'])
    }
}
