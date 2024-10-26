import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import {
    Firestore,
    addDoc,
    collection,
    collectionData,
    deleteDoc,
    doc,
    getFirestore,
    updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { product } from '../model/product';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    fire: any = Firestore;

    constructor(
        private afApp: FirebaseApp,
        private messageService: MessageService
    ) {
        this.fire = getFirestore(afApp);
    }

    getProduct(): Observable<product[]> {
        const pro = collection(this.fire, 'Product');
        return collectionData(pro, { idField: 'id' }) as Observable<product[]>;
    }

    AddProduct(pro: product) {
        const db = collection(this.fire, 'Product');
        addDoc(db, pro)
            .then(() => {
                this.messageService.add({
                    key: 'tc',
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Product added seccussfully',
                });
            })
            .catch(() => {
                this.messageService.add({
                    key: 'tc',
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Probleme while storing data !!',
                });
            });
    }

    UpdateProduct(id: string, pro: product) {
        const washingtonRef = doc(this.fire, 'Product', id);
        updateDoc(washingtonRef, {
            label: pro.label,
            discreption: pro.discreption,
            price: pro.price,
            category: pro.category,
            date: pro.date,
            status: pro.status,
            img:pro.img
        })
            .then(() => {
                this.messageService.add({
                    key: 'tc',
                    severity: 'success',
                    summary: 'Success',
                    detail: 'le produit a été update avec succès',
                });
            })
            .catch((err) => {
                this.messageService.add({
                    key: 'tc',
                    severity: 'error',
                    summary: 'Error',
                    detail: 'le produit ne pas updateé',
                });
            });
    }

    DeleteProduct(id: string) {
        deleteDoc(doc(this.fire, 'Product', `${id}`))
            .then(() => {
                this.messageService.add({
                    key: 'tc',
                    severity: 'info',
                    summary: 'Confirmed',
                    detail: 'Enregistrement supprimé',
                });
            })
            .catch((err) => {
                this.messageService.add({
                    key: 'tc',
                    severity: 'error',
                    summary: 'Error',
                    detail: 'le produit ne pas suppréme',
                });
            });
    }
}
