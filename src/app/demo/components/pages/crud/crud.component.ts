import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/demo/model/product';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/services/product.service';
import { UploadEvent } from 'primeng/fileupload';

@Component({
    templateUrl: './crud.component.html',
    styleUrl:'./crud.component.scss',
    providers: [MessageService, ConfirmationService]
})
export class CrudComponent implements OnInit {

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: product[] = [];

    product: product = {};

    selectedProducts: product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    base64Image: string | undefined;

    constructor(private messageService: MessageService, private confirmationService: ConfirmationService,private proserv:ProductService) { }

    ngOnInit() {
        //this.productService.getProducts().then(data => this.products = data);
        this.proserv.getProduct().subscribe((ele)=> {
            this.products = ele as product[];
        })

        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.statuses = [
            { label: 'Available', value: 'instock' },
            { label: 'Unavailable', value: 'lowstock' }
        ];
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: product) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: product) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.selectedProducts.map((ele)=>{
            this.proserv.DeleteProduct(ele.id+'');
        })
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        this.selectedProducts = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.proserv.DeleteProduct(this.product.id+"");
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.product = {};
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.product.label?.trim()) {
            if (this.product.id) {
                //Update
                this.proserv.UpdateProduct(this.product.id,this.product);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                //Create
                console.log(this.product);
                this.proserv.AddProduct(this.product)
                //this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            //this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    convertToBase64(event: any) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.base64Image = reader.result as string;
          console.log('Base64 Image:', this.base64Image);
          this.product.img=this.base64Image;
        };
        reader.onerror = (error) => {
          console.error('Error converting file to Base64:', error);
        };
      }
}
