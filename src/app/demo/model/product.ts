export interface product{
    id?:string;
    label?:string;
    discreption?:string;
    price?:number;
    category?:string;
    date?:Date;
    status?:string;
    img?:string;
}


export interface order{
    id?:string;
    product?:product[];
    email?:string;
    customer?:string;
    adress?:string;
    order?:number;
    total?:number;
    date?:Date;
    view?:boolean;
    valid?:boolean;
}