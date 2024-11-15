export interface product{
    id?:string;
    label?:string;
    description?:string;
    price?:number;
    category?:string;
    date?:Date;
    status?:string;
    img?:string;
    quantity?:number;
}


export interface order{
    id?:string;
    product?:product;
    email?:string;
    phone?:string;
    customer?:string;
    address?:string;
    order?:number;
    total?:number;
    date?:Date;
    view?:boolean;
    valid?:boolean;
}