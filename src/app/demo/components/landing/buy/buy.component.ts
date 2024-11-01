import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
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
import { order, product } from 'src/app/demo/model/product';
import { OrderService } from 'src/app/demo/services/order.service';
import { ProductService } from 'src/app/demo/services/product.service';
import { ToastModule } from 'primeng/toast';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
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
        InputGroupAddonModule,
        ReactiveFormsModule,
        ToastModule
    ],
    templateUrl: './buy.component.html',
    styleUrl: './buy.component.scss',
})
export class BuyComponent implements OnInit {
    receivedId: string = '';
    productSelected: product = {};
    orderForm: FormGroup;

    order: order = {};

    userEmail: string = 'hamza.agourrame.05@gmail.com';
    subject: string = 'New Order';
    message: any;

    constructor(
        private proservice: ProductService,
        private router: Router,
        private route: ActivatedRoute,
        private viewportScroller: ViewportScroller,
        private fb: FormBuilder,
        private orderserv:OrderService
    ) {
        this.orderForm = this.fb.group({
            name: ['', Validators.required],
            email: [''],
            address: ['', Validators.required],
            saveForNextPurchase: [false],
        });
    }

    sendEmail() {
      const emailParams = {
        user_email: this.userEmail,
        subject: this.subject,
        message: this.message
      };
  
      emailjs.send('service_3hso5ug', 'template_vx3kgzg', emailParams, 'JzD5PiGgk-ds2eADt')
        .then((response: EmailJSResponseStatus) => {
          console.log('Email sent successfully:', response);
          console.log('Email sent successfully!');
        }, (error) => {
          console.error('Error sending email:', error);
          console.log('Error sending email. Please try again.');
        });
    }


    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            this.receivedId = params['id'];
            console.log('Received ID:', this.receivedId);
            this.viewportScroller.scrollToPosition([0, 0]);
            if (this.receivedId) {
                this.proservice.getProduct().subscribe((ele) => {
                    ele.map((data) => {
                        if (data.id === this.receivedId) {
                            console.log(data);
                            this.productSelected = data;
                            
                        }
                    });
                });
            }
        });
    }

    onSubmit() {
        if (this.orderForm.valid) {
            //console.log(this.orderForm.value);
            this.order.address = this.orderForm.value.address + '';
            this.order.email = this.orderForm.value.email + '';
            this.order.customer = this.orderForm.value.name + '';
            this.order.date = new Date();
            this.order.order = this.quantities[0];
            this.order.product = this.productSelected;
            this.order.total = Number(
                this.quantities[0] * Number(this.productSelected.price)
            );
            this.order.valid = false;
            this.order.view = false;

            console.log(this.order);
            this.message = this.order;
            // Handle form submission
            this.orderserv.AddOrder(this.order);
            this.sendEmail();
        } else {
            console.log('Form is invalid');
        }
    }

    showorder(event: any) {
        console.log(event.value);
        console.log(this.quantities[0]);
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
        { name: 'France / Paris', code: 'PRS' },
    ];

    selectedCity: string = '';
}
